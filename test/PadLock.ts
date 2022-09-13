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
    let executor: SignerWithAddress;

    let padlock: PadLock;
    let minimalFee = parseEther("0.001");
    let erc1155: ERC1155NFT;

    let wethMock: WETHMock;
    let poolProviderMock: PoolProviderMock;
    let poolMock: PoolMock;
    let poolDataProviderMock: PoolDataProviderMock;
    let rewardsStub: RewardsControllerStub;

    beforeEach(async () => {
        [deployer, bob, alice, executor] = await ethers.getSigners();

        wethMock = await new WETHMock__factory(deployer).deploy();
        poolProviderMock = await new PoolProviderMock__factory(deployer).deploy();
        poolDataProviderMock = await new PoolDataProviderMock__factory(deployer).deploy();
        poolMock = await new PoolMock__factory(deployer).deploy(poolDataProviderMock.address);
        rewardsStub = await new RewardsControllerStub__factory(deployer).deploy();

        await poolProviderMock.setPoolAddress(poolMock.address);
        await poolProviderMock.setPoolDataProvider(poolDataProviderMock.address);

        padlock = await new PadLock__factory(deployer).deploy(
            executor.address,
            wethMock.address,
            minimalFee,
            poolProviderMock.address,
            rewardsStub.address,
        );

        erc1155 = new ERC1155NFT__factory(deployer).attach(await padlock.erc1155());

        await wethMock.transfer(alice.address, ethers.utils.parseEther("1"));
        await wethMock.transfer(bob.address, ethers.utils.parseEther("1"));

        await wethMock.connect(alice).approve(padlock.address, ethers.utils.parseEther("1"));
        await wethMock.connect(bob).approve(padlock.address, ethers.utils.parseEther("1"));
    });

    it("Should allow to proposeRelationship", async () => {
        expect(await proposeRelationship("1"))
            .to.emit(padlock, "RelationshipSubmitted")
            .withArgs(0, bob.address, alice.address);
    });

    it("Should allow to approveRelationship", async () => {
        const relationshipId = await proposeRelationship("1");

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
        const relationshipId = await proposeRelationship("1");
        await padlock.connect(alice).approveRelationship(relationshipId);

        await erc1155.connect(alice).setApprovalForAll(padlock.address, true);

        expect(await padlock.connect(alice).proposeBreakUp()).to.emit(padlock, "BreakupProposal");
    });

    it("Should allow to approveBreakUp", async () => {
        const relationshipId = await proposeRelationship("1");
        await padlock.connect(alice).approveRelationship(relationshipId);

        await erc1155.connect(alice).setApprovalForAll(padlock.address, true);
        await erc1155.connect(bob).setApprovalForAll(padlock.address, true);

        await padlock.connect(alice).proposeBreakUp();
        expect(await padlock.connect(bob).approveBreakUp())
            .to.emit(padlock, "BreakUp")
            .withArgs(relationshipId, alice.address, bob.address);
        expect(await wethMock.balanceOf(alice.address)).to.be.eq(ethers.utils.parseEther("1"));
        expect(await wethMock.balanceOf(bob.address)).to.be.eq(ethers.utils.parseEther("1"));
    });

    it("Should deposit funds to vault", async () => {
        const relationshipId = await proposeRelationship("1");
        await padlock.connect(alice).approveRelationship(relationshipId);

        await erc1155.connect(alice).setApprovalForAll(padlock.address, true);
        await erc1155.connect(bob).setApprovalForAll(padlock.address, true);

        await padlock.connect(alice).proposeBreakUp();
        expect(await padlock.connect(bob).approveBreakUp())
            .to.emit(padlock, "BreakUp")
            .withArgs(relationshipId, alice.address, bob.address);
    });

    async function proposeRelationship(fee: string) {
        const tx = await padlock.connect(bob).proposeRelationship(alice.address, parseEther(fee));
        const waitedTx = await tx.wait();

        const event = waitedTx?.events?.find(event => event.event === "RelationshipProposed");

        return event?.args?.relationshipId;
    }
});
