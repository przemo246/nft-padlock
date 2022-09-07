import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import {
  PadLock__factory,
  PadLock,
  WETH,
  WETH__factory,
} from "../typechain-types";

describe("Padlock", function () {
  let deployer: SignerWithAddress;
  let bob: SignerWithAddress;
  let alice: SignerWithAddress;
  let executor: SignerWithAddress;
  let weth: WETH;
  let padlock: PadLock;

  beforeEach(async () => {
    [deployer, bob, alice, executor] = await ethers.getSigners();

    weth = await new WETH__factory(deployer).deploy();
    padlock = await new PadLock__factory(deployer).deploy(
      executor.address,
      weth.address
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

  it("Should allow to submitRelationship", async () => {
    expect(await submitRelationship())
      .to.emit(padlock, "RelationshipSubmitted")
      .withArgs(0, bob.address, alice.address);
  });

  it("Should allow to approveRelationship", async () => {
    const relationshipId = await submitRelationship();

    expect(await padlock.connect(alice).approveRelationship(relationshipId))
      .to.emit(padlock, "RelationshipApproved")
      .withArgs(relationshipId, bob.address, alice.address);

    expect(await weth.balanceOf(padlock.address)).to.be.eq(
      ethers.utils.parseEther("2")
    );
  });

  async function submitRelationship() {
    const tx = await padlock.connect(bob).submitRelationship(alice.address);
    const waitedTx = await tx.wait();

    const event = waitedTx?.events?.find(
      (event) => event.event === "RelationshipSubmitted"
    );
    
    return event?.args?.relationshipId.toNumber();
  }
});
