import { expect } from "chai";
import { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumber } from "ethers";

import {
    PadLock__factory,
    PadLock,
    WETHMock,
    WETHMock__factory,
    PoolProviderMock,
    PoolProviderMock__factory,
    PoolStub__factory,
    PoolStub,
    VaultFactory__factory,
    RewardsControllerStub,
    RewardsControllerStub__factory,
    PoolDataProviderMock__factory,
    PoolDataProviderMock
} from "../typechain-types";

describe("Padlock", function () {
    let deployer: SignerWithAddress;
    let bob: SignerWithAddress;
    let alice: SignerWithAddress;
    let executor: SignerWithAddress;
    let wethMock: WETHMock;
    let poolProviderMock: PoolProviderMock;
    let poolstub: PoolStub;
    let poolDataProviderMock: PoolDataProviderMock;
    let padlock: PadLock;
    let rewardsStub: RewardsControllerStub;
    let minimalFee = parseEther("0.001");

    beforeEach(async () => {
        [deployer, bob, alice, executor] = await ethers.getSigners();

        wethMock = await new WETHMock__factory(deployer).deploy();
        poolProviderMock = await new PoolProviderMock__factory(deployer).deploy();
        poolstub = await new PoolStub__factory(deployer).deploy();
        poolDataProviderMock = await new PoolDataProviderMock__factory(deployer).deploy();
        rewardsStub = await new RewardsControllerStub__factory(deployer).deploy();

        await poolProviderMock.setPoolAddress(poolstub.address);

        padlock = await new PadLock__factory(deployer).deploy(
            executor.address,
            wethMock.address,
            minimalFee,
            poolProviderMock.address,
            poolDataProviderMock.address,
            rewardsStub.address,
        );

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

        let newVault = (await padlock.relationships(BigNumber.from(relationshipId))).vault;

        let vaultFactory = new VaultFactory__factory(deployer).attach(await padlock.vaultFactory());
        let vaultOrigin = await vaultFactory.vaultOriginAddress();

        expect(newVault != vaultOrigin);
        expect(await wethMock.balanceOf(newVault)).to.be.eq(ethers.utils.parseEther("2"));
    });

    async function proposeRelationship(fee: string) {
        const tx = await padlock.connect(bob).proposeRelationship(alice.address, parseEther(fee));
        const waitedTx = await tx.wait();

        const event = waitedTx?.events?.find(event => event.event === "RelationshipProposed");

        return event?.args?.relationshipId.toNumber();
    }
});
