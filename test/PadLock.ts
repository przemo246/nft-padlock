import { expect } from "chai";
import { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import {
  PadLock__factory,
  PadLock,
  WETH,
  WETH__factory,
  PoolProviderMock,
  PoolProviderMock__factory,
  AaveManager__factory,
  AaveManager
} from "../typechain-types";

describe("Padlock", function () {
  let deployer: SignerWithAddress;
  let bob: SignerWithAddress;
  let alice: SignerWithAddress;
  let executor: SignerWithAddress;
  let weth: WETH;
  let aaveManager: AaveManager;
  let poolProvider: PoolProviderMock;
  let padlock: PadLock;
  let minimalFee = parseEther("0.001");

  beforeEach(async () => {
    [deployer, bob, alice, executor] = await ethers.getSigners();

    weth = await new WETH__factory(deployer).deploy();
    poolProvider = await new PoolProviderMock__factory(deployer).deploy();
    aaveManager = await new AaveManager__factory(deployer).deploy(poolProvider.address, weth.address);
    padlock = await new PadLock__factory(deployer).deploy(
      executor.address,
      weth.address,
      minimalFee,
      aaveManager.address
    );

    await weth.transfer(alice.address, ethers.utils.parseEther("1"));
    await weth.transfer(bob.address, ethers.utils.parseEther("1"));

    await weth
      .connect(alice)
      .approve(padlock.address, ethers.utils.parseEther("1"));
    await weth
      .connect(bob)
      .approve(padlock.address, ethers.utils.parseEther("1"));
  });

  it("Should allow to proposeRelationship", async () => {
    expect(await proposeRelationship())
      .to.emit(padlock, "RelationshipSubmitted")
      .withArgs(0, bob.address, alice.address);
  });

  it("Should allow to approveRelationship", async () => {
    const relationshipId = await proposeRelationship();

    expect(await padlock.connect(alice).approveRelationship(relationshipId))
      .to.emit(padlock, "RelationshipApproved")
      .withArgs(relationshipId, bob.address, alice.address);

    expect(await weth.balanceOf(padlock.address)).to.be.eq(
      ethers.utils.parseEther("2")
    );
  });

  async function proposeRelationship() {
    const tx = await padlock.connect(bob).proposeRelationship(alice.address, parseEther("0.01"));
    const waitedTx = await tx.wait();

    const event = waitedTx?.events?.find(
      (event) => event.event === "RelationshipProposed"
    );
    
    return event?.args?.relationshipId.toNumber();
  }
});
