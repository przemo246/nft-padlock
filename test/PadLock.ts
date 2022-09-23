import { expect } from "chai";
import { ethers, network } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumber } from "ethers";

import {
    PadLock__factory,
    PadLock,
    VaultFactory__factory,
    ERC1155NFT__factory,
    ERC1155NFT,
    WETHMock__factory,
    WETHMock,
    IncentivesMock__factory,
    IncentivesMock,
    PoolProviderMock__factory,
    PoolProviderMock,
    PoolMock__factory,
    PoolMock,
    RewardsControllerStub__factory,
    RewardsControllerStub,
    PoolDataProviderMock__factory,
    PoolDataProviderMock,
    ERC20__factory,
} from "../typechain-types";

describe("Padlock", function () {
    let deployer: SignerWithAddress;
    let bob: SignerWithAddress;
    let alice: SignerWithAddress;
    let jack: SignerWithAddress;
    let kate: SignerWithAddress;
    let josh: SignerWithAddress;
    let josy: SignerWithAddress;

    let padlock: PadLock;
    let minimalFee = parseEther("0.001");
    let erc1155: ERC1155NFT;

    let wethMock: WETHMock;
    let incentivesMock: IncentivesMock;
    let poolProviderMock: PoolProviderMock;
    let poolMock: PoolMock;
    let poolDataProviderMock: PoolDataProviderMock;
    let rewardsStub: RewardsControllerStub;
    let initialBalance: BigNumber;
    let initialDeposit = parseEther("1");

    beforeEach(async () => {
        [deployer, bob, alice, jack, kate, josh, josy] = await ethers.getSigners();

        wethMock = await new WETHMock__factory(deployer).deploy();
        incentivesMock = await new IncentivesMock__factory(deployer).deploy();
        poolProviderMock = await new PoolProviderMock__factory(deployer).deploy();
        poolDataProviderMock = await new PoolDataProviderMock__factory(deployer).deploy();
        poolMock = await new PoolMock__factory(deployer).deploy(poolDataProviderMock.address);
        rewardsStub = await new RewardsControllerStub__factory(deployer).deploy();
        let reserveToken = await new ERC20__factory(deployer).deploy("reserveToken", "RSVT");

        await poolDataProviderMock.setReserveTokensAddresses(reserveToken.address);
        await poolProviderMock.setPoolAddress(poolMock.address);
        await poolProviderMock.setPoolDataProvider(poolDataProviderMock.address);

        padlock = await new PadLock__factory(deployer).deploy(
            wethMock.address,
            incentivesMock.address,
            minimalFee,
            poolProviderMock.address,
            rewardsStub.address,
        );

        erc1155 = new ERC1155NFT__factory(deployer).attach(await padlock.erc1155());

        initialBalance = parseEther("10");

        await swapAndApproveFunds([alice, bob, jack, kate, josh, josy]);
    });

    it("Should allow to proposeRelationship", async () => {
        expect(await padlock.connect(bob).proposeRelationship(alice.address, initialDeposit))
        .to.emit(padlock, "RelationshipProposed");
    });

    it("Should allow to approveRelationship", async () => {
        let relationshipId = await proposeRelationship(bob, alice,initialDeposit);

        expect(await padlock.connect(alice).approveRelationship(relationshipId))
            .to.emit(padlock, "RelationshipApproved")
            .withArgs(relationshipId, bob.address, alice.address);

        let newVault = (await padlock.idToRelationship(relationshipId)).vault;

        let vaultFactory = new VaultFactory__factory(deployer).attach(await padlock.vaultFactory());
        let vaultOrigin = await vaultFactory.vaultOriginAddress();

        let { currentATokenBalance } = await poolDataProviderMock.getUserReserveData(wethMock.address, newVault);

        expect(newVault != vaultOrigin);
        expect(currentATokenBalance).to.be.eq(ethers.utils.parseEther("2"));
    });

    it("Should allow to proposeBreakUp", async () => {
        let relationshipId = await createRelationship(bob, alice,initialDeposit);

        await erc1155.connect(alice).setApprovalForAll(padlock.address, true);

        expect(await padlock.connect(alice).proposeBreakUp()).to.emit(padlock, "BreakupProposal");
    });

    it("Should allow to approveBreakUp", async () => {
        let relationshipId = await createRelationship(bob, alice,initialDeposit);

        await erc1155.connect(alice).setApprovalForAll(padlock.address, true);
        await erc1155.connect(bob).setApprovalForAll(padlock.address, true);

        await padlock.connect(alice).proposeBreakUp();
        expect(await padlock.connect(bob).approveBreakUp())
            .to.emit(padlock, "BreakupApproved")
            .withArgs(relationshipId, alice.address, bob.address);

        expect(await wethMock.balanceOf(alice.address)).to.be.eq(initialDeposit);
        expect(await wethMock.balanceOf(bob.address)).to.be.eq(initialDeposit);
    });

    it("Should allow to re-establish relationship", async () => {
        let relationshipId = await createRelationship(bob, alice,initialDeposit);

        await erc1155.connect(alice).setApprovalForAll(padlock.address, true);
        await erc1155.connect(bob).setApprovalForAll(padlock.address, true);

        await padlock.connect(alice).proposeBreakUp();
        await padlock.connect(bob).approveBreakUp();

        await swapAndApproveFunds([bob, alice])
        relationshipId = await proposeRelationship(bob, alice,initialDeposit);
        await padlock.connect(alice).approveRelationship(relationshipId);
    });

    it("Should return funds to lovers when approve break up", async () => {
        let relationshipId = await createRelationship(bob, alice,initialDeposit);

        await erc1155.connect(alice).setApprovalForAll(padlock.address, true);
        await erc1155.connect(bob).setApprovalForAll(padlock.address, true);

        await padlock.connect(alice).proposeBreakUp();
        expect(await padlock.connect(bob).approveBreakUp())
            .to.emit(padlock, "BreakupApproved")
            .withArgs(relationshipId, alice.address, bob.address);
    });

    it("Should split funds amoung other relations when slashedBreakup", async () => {
        let relationshipId1 = await createRelationship(bob, alice, initialDeposit);
        let relationshipId2 = await createRelationship(jack, kate, initialDeposit);
        let relationshipId3 = await createRelationship(josh, josy, initialDeposit);

        await erc1155.connect(alice).setApprovalForAll(padlock.address, true);
        await erc1155.connect(bob).setApprovalForAll(padlock.address, true);

        await padlock.connect(alice).proposeBreakUp();

        await padlock.connect(alice).slashBrakeUp();

        let balanceToSplit = initialDeposit.mul(2).mul(95).div(100);
        
        let expectedAliceBalance = balanceToSplit.mul(40).div(100);
        let expectedBobBalance = balanceToSplit.mul(60).div(100);
        
        expect(expectedAliceBalance).to.be.eq(await wethMock.balanceOf(alice.address));
        expect(expectedBobBalance).to.be.eq(await wethMock.balanceOf(bob.address));
    });

    it("Should allow boosting vault funds with deposit", async () => {        
        let relationshipId = await createRelationship(bob, alice, initialDeposit);

        await swapAndApproveFunds([bob]);
        
        let amountToDeposit = parseEther("0.5")

        expect(await padlock.connect(bob).deposit(amountToDeposit)).to.emit(padlock, "Deposit").withArgs(relationshipId, bob.address, amountToDeposit);

        let vault = (await padlock.idToRelationship(relationshipId)).vault;
        let { currentATokenBalance } = await poolDataProviderMock.getUserReserveData(wethMock.address, vault);

        expect(currentATokenBalance).to.be.eq(initialDeposit.mul(2).add(amountToDeposit));
    });

    it("Should allow adding relationship event with addRelationshipEvent", async () => {
        let relationshipId = await createRelationship(bob, alice,initialDeposit);

        let someMemo = "Greetings from Majorka"
        let ipfsURI = "ipfs://link-to-photo-from-majorka"
        

        expect(await padlock.connect(alice).addRelationshipEvent(someMemo, ipfsURI)).to.emit(padlock, "RelationshipEvent").withArgs(someMemo, ipfsURI, alice.address, relationshipId);
    })

    it("Should allow withdrawing funds as 1st lover", async () => {
        let relationshipId = await createRelationship(bob, alice,initialDeposit);
        
        await network.provider.send('evm_increaseTime', [3600 * 24 * 366]);
        await network.provider.send('evm_mine');

        let balanceBeforeWithdrawal = await wethMock.balanceOf(alice.address);
        let toWithdraw = parseEther("0.5");

        await padlock.connect(bob).proposeWithdraw(toWithdraw);
        await padlock.connect(alice).approveWithdraw();

        expect(balanceBeforeWithdrawal.add(toWithdraw.div(2))).to.be.equal(await wethMock.balanceOf(alice.address));
        expect(balanceBeforeWithdrawal.add(toWithdraw.div(2))).to.be.equal(await wethMock.balanceOf(bob.address));
        
    })

    it("Should allow withdrawing funds as 2nd lover", async () => {
        let relationshipId = await createRelationship(bob, alice, initialDeposit);
        
        await network.provider.send('evm_increaseTime', [3600 * 24 * 366]);
        await network.provider.send('evm_mine');

        let balanceBeforeWithdrawal = await wethMock.balanceOf(bob.address);
        let toWithdraw = parseEther("0.5");

        await padlock.connect(alice).proposeWithdraw(toWithdraw);
        await padlock.connect(bob).approveWithdraw();

        expect(balanceBeforeWithdrawal.add(toWithdraw.div(2))).to.be.equal(await wethMock.balanceOf(alice.address));
        expect(balanceBeforeWithdrawal.add(toWithdraw.div(2))).to.be.equal(await wethMock.balanceOf(bob.address));
        
    })

    async function proposeRelationship(propser: SignerWithAddress, propsedOne: SignerWithAddress,  fee: BigNumber) {
        const tx = await padlock.connect(propser).proposeRelationship(propsedOne.address, fee);
        const waitedTx = await tx.wait();

        const event = waitedTx?.events?.find(event => event.event === "RelationshipProposed");

        return event?.args?.relationshipId;
    }

    async function createRelationship(propser: SignerWithAddress, propsedOne: SignerWithAddress,  fee: BigNumber) {
        let relationshipId = await proposeRelationship(propser, propsedOne, fee);
        await padlock.connect(propsedOne).approveRelationship(relationshipId);
        return relationshipId;
    }

    async function swapAndApproveFunds(signersArray: SignerWithAddress[]) {
        for (let index = 0; index < signersArray.length; index++) {
            const signer = signersArray[index];
            await wethMock.transfer(signer.address, initialDeposit);
            await wethMock.connect(signer).approve(padlock.address, initialDeposit);            
        }
    }
});
