import { expect } from "chai";
import { ethers } from "hardhat";
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
} from "../typechain-types";

describe("Padlock", function () {
    let deployer: SignerWithAddress;
    let bob: SignerWithAddress;
    let alice: SignerWithAddress;

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
        [deployer, bob, alice] = await ethers.getSigners();

        wethMock = await new WETHMock__factory(deployer).deploy();
        incentivesMock = await new IncentivesMock__factory(deployer).deploy();
        poolProviderMock = await new PoolProviderMock__factory(deployer).deploy();
        poolDataProviderMock = await new PoolDataProviderMock__factory(deployer).deploy();
        poolMock = await new PoolMock__factory(deployer).deploy(poolDataProviderMock.address);
        rewardsStub = await new RewardsControllerStub__factory(deployer).deploy();

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

        await wethMock.transfer(alice.address, initialBalance);
        await wethMock.transfer(bob.address, initialBalance);

        await wethMock.connect(alice).approve(padlock.address, initialBalance);
        await wethMock.connect(bob).approve(padlock.address, initialBalance);
    });

    it("Should allow to proposeRelationship", async () => {
        expect(await padlock.connect(bob).proposeRelationship(alice.address, initialDeposit))
        .to.emit(padlock, "RelationshipProposed");
    });

    it("Should allow to approveRelationship", async () => {
        const relationshipId = await proposeRelationship(initialDeposit);

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
        const relationshipId = await proposeRelationship(initialDeposit);
        await padlock.connect(alice).approveRelationship(relationshipId);

        await erc1155.connect(alice).setApprovalForAll(padlock.address, true);

        expect(await padlock.connect(alice).proposeBreakUp()).to.emit(padlock, "BreakupProposal");
    });

    it("Should allow to approveBreakUp", async () => {
        const relationshipId = await proposeRelationship(initialDeposit);
        await padlock.connect(alice).approveRelationship(relationshipId);

        await erc1155.connect(alice).setApprovalForAll(padlock.address, true);
        await erc1155.connect(bob).setApprovalForAll(padlock.address, true);

        await padlock.connect(alice).proposeBreakUp();
        expect(await padlock.connect(bob).approveBreakUp())
            .to.emit(padlock, "BreakupApproved")
            .withArgs(relationshipId, alice.address, bob.address);

        expect(await wethMock.balanceOf(alice.address)).to.be.eq(initialBalance);
        expect(await wethMock.balanceOf(bob.address)).to.be.eq(initialBalance);
    });

    it("Should allow to re-establish relationship", async () => {
        let relationshipId = await proposeRelationship(initialDeposit);
        await padlock.connect(alice).approveRelationship(relationshipId);

        await erc1155.connect(alice).setApprovalForAll(padlock.address, true);
        await erc1155.connect(bob).setApprovalForAll(padlock.address, true);

        await padlock.connect(alice).proposeBreakUp();
        await padlock.connect(bob).approveBreakUp();

        relationshipId = await proposeRelationship(initialDeposit);
        await padlock.connect(alice).approveRelationship(relationshipId);
    });

    it("Should return funds to lovers when approve break up", async () => {
        const relationshipId = await proposeRelationship(initialDeposit);
        await padlock.connect(alice).approveRelationship(relationshipId);

        await erc1155.connect(alice).setApprovalForAll(padlock.address, true);
        await erc1155.connect(bob).setApprovalForAll(padlock.address, true);

        await padlock.connect(alice).proposeBreakUp();
        expect(await padlock.connect(bob).approveBreakUp())
            .to.emit(padlock, "BreakupApproved")
            .withArgs(relationshipId, alice.address, bob.address);
    });

    it("Should split funds amoung other relations when slashedBreakup", async () => {
        const relationshipId = await proposeRelationship(initialDeposit);
        await padlock.connect(alice).approveRelationship(relationshipId);

        await erc1155.connect(alice).setApprovalForAll(padlock.address, true);
        await erc1155.connect(bob).setApprovalForAll(padlock.address, true);

        await padlock.connect(alice).proposeBreakUp();

        await padlock.connect(alice).slashBrakeUp();

        let expectedAliceBalance = initialBalance.sub(parseEther("0.2"));
        let expectedBobBalance = initialBalance.add(parseEther("0.2"));

        expect(await wethMock.balanceOf(alice.address)).to.be.eq(expectedAliceBalance);
        expect(await wethMock.balanceOf(bob.address)).to.be.eq(expectedBobBalance);
    });

    it("Should allow boosting vault funds with deposit", async () => {        
        const relationshipId = await proposeRelationship(initialDeposit);
        await padlock.connect(alice).approveRelationship(relationshipId);
        
        let amountToDeposit = parseEther("0.5")

        expect(await padlock.connect(bob).deposit(amountToDeposit)).to.emit(padlock, "Deposit").withArgs(relationshipId, bob.address, amountToDeposit);

        let vault = (await padlock.idToRelationship(relationshipId)).vault;
        let { currentATokenBalance } = await poolDataProviderMock.getUserReserveData(wethMock.address, vault);

        expect(currentATokenBalance).to.be.eq(initialDeposit.mul(2).add(amountToDeposit));
    });

    it("Should allow adding relationship event with addRelationshipEvent", async () => {
        const relationshipId = await proposeRelationship(initialDeposit);
        await padlock.connect(alice).approveRelationship(relationshipId);

        let someMemo = "Greetings from Majorka"
        let ipfsURI = "ipfs://link-to-photo-from-majorka"

        expect(await padlock.connect(alice).addRelationshipEvent(someMemo, ipfsURI)).to.emit(padlock, "RelationshipEvent").withArgs(someMemo, ipfsURI, alice.address, relationshipId);
    })

    async function proposeRelationship(fee: BigNumber) {
        const tx = await padlock.connect(bob).proposeRelationship(alice.address, fee);
        const waitedTx = await tx.wait();

        const event = waitedTx?.events?.find(event => event.event === "RelationshipProposed");

        return event?.args?.relationshipId;
    }
});
