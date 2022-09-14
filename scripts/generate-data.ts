import { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import fs from "fs";

import {
    PadLock__factory,
    WETHMock__factory,
    ERC1155NFT__factory
} from "../typechain-types";

import { storeFiles } from "ipfs";

async function main() {
    
    let [deployer, alice, bob] = await ethers.getSigners();

    let weth = "0x09bADef78f92F20fd5f7a402dbb1d25d4901aAb2";
    let minimalFee = parseEther("0.0001")
    let contractAddresses = JSON.parse(fs.readFileSync(__dirname + "/contract_addresses.json").toString());

    let padlock = new PadLock__factory(deployer).attach(contractAddresses.padlock);

    let wethContract = new WETHMock__factory(deployer).attach(weth);
    
    await wethContract.connect(alice).deposit({ value: minimalFee });
    await wethContract.connect(bob).deposit({ value: minimalFee });

    await wethContract.connect(alice).approve(padlock.address, minimalFee);
    await wethContract.connect(bob).approve(padlock.address, minimalFee);

    let tx = await padlock.connect(alice).proposeRelationship(bob.address, minimalFee);
    const waitedTx = await tx.wait();

    let event = waitedTx?.events?.find(event => event.event === "RelationshipProposed");

    let relationshipId = event?.args?.relationshipId;
    
    await padlock.connect(bob).approveRelationship(relationshipId);

    await storeFiles()
    
    let erc1155 = new ERC1155NFT__factory(deployer).attach(await padlock.erc1155());
    await erc1155.connect(alice).setApprovalForAll(contractAddresses.padlock, true);
    await erc1155.connect(bob).setApprovalForAll(contractAddresses.padlock, true);

    tx = await padlock.connect(alice).proposeBreakUp();
    await tx.wait();

    tx = await padlock.connect(bob).approveBreakUp();
    await tx.wait();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});

