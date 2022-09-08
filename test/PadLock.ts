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
  PoolMock__factory,
  PoolMock,
} from "../typechain-types";

describe("Padlock", function () {
  let deployer: SignerWithAddress;
  let bob: SignerWithAddress;
  let alice: SignerWithAddress;
  let executor: SignerWithAddress;
  let weth: WETH;
  let poolProvider: PoolProviderMock;
  let poolMock: PoolMock;
  let padlock: PadLock;
  let minimalFee = parseEther("0.001");

  beforeEach(async () => {
    [deployer, bob, alice, executor] = await ethers.getSigners();

    weth = await new WETH__factory(deployer).deploy();
    poolProvider = await new PoolProviderMock__factory(deployer).deploy();
    poolMock = await new PoolMock__factory(deployer).deploy();
    await poolProvider.setPoolAddress(poolMock.address);

    padlock = await new PadLock__factory(deployer).deploy(
      executor.address,
      weth.address,
      minimalFee,
      poolProvider.address
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
    expect(await proposeRelationship("1"))
      .to.emit(padlock, "RelationshipSubmitted")
      .withArgs(0, bob.address, alice.address);
  });

  it("Should allow to approveRelationship", async () => {
    const relationshipId = await proposeRelationship("1");

    expect(await padlock.connect(alice).approveRelationship(relationshipId))
      .to.emit(padlock, "RelationshipApproved")
      .withArgs(relationshipId, bob.address, alice.address);

    expect(await weth.balanceOf(padlock.address)).to.be.eq(
      ethers.utils.parseEther("2")
    );
  });

  async function proposeRelationship(fee: string) {
    const tx = await padlock.connect(bob).proposeRelationship(alice.address, parseEther(fee));
    const waitedTx = await tx.wait();

    const event = waitedTx?.events?.find(
      (event) => event.event === "RelationshipProposed"
    );
    
    return event?.args?.relationshipId.toNumber();
  }
});
