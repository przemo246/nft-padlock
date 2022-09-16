import { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import fs from "fs";
import { chain } from "../config/networks";
import hre from "hardhat";

import { PadLock__factory, WETHMock__factory, ERC1155NFT__factory } from "../typechain-types";

async function main() {
    let tx;
    let [deployer, alice, bob] = await ethers.getSigners();

    let minimalFee = parseEther("0.0001");

    let weth = chain[hre.network.name].weth;
    let contractAddresses = JSON.parse(fs.readFileSync(__dirname + "/contract_addresses.json").toString());

    let padlock = new PadLock__factory(deployer).attach(contractAddresses.padlock);

    let wethContract = new WETHMock__factory(deployer).attach(weth);

    await wethContract.connect(alice).deposit({ value: minimalFee });
    await wethContract.connect(bob).deposit({ value: minimalFee });

    await wethContract.connect(alice).approve(padlock.address, minimalFee);
    await wethContract.connect(bob).approve(padlock.address, minimalFee);

    console.log(await wethContract.balanceOf(alice.address));
    console.log(await wethContract.balanceOf(bob.address));

    console.log(await padlock.loverToRelationshipId(alice.address));
    console.log(await padlock.loverToRelationshipId(bob.address));

    tx = await padlock.connect(alice).proposeRelationship(bob.address, minimalFee, { gasLimit: 1_000_000 });
    const waitedTx = await tx.wait();

    // let event = waitedTx?.events?.find(event => event.event === "RelationshipProposed");

    // let relationshipId = event?.args?.relationshipId;
    // let relationshipId = "0x8b67b0bee4ba697b520fd1550756e58395eb2b51";

    // await padlock.connect(bob).approveRelationship(relationshipId);

    // let erc1155 = new ERC1155NFT__factory(deployer).attach(await padlock.erc1155());
    // await erc1155.connect(alice).setApprovalForAll(contractAddresses.padlock, true);
    // await erc1155.connect(bob).setApprovalForAll(contractAddresses.padlock, true);

    // tx = await padlock.connect(alice).proposeBreakUp();
    // await tx.wait();

    // tx = await padlock.connect(bob).approveBreakUp({ gasLimit: 1_000_000 });
    // await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
