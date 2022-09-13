import { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumber } from "ethers";

import {
    PadLock__factory
} from "../typechain-types";

async function main() {
    
    let [alice, bob, deployer] = await ethers.getSigners();

    let weth = "0x09bADef78f92F20fd5f7a402dbb1d25d4901aAb2";
    let minimalFee = parseEther("0.001")
    let poolProvider = "0x74a328ED938160D702378Daeb7aB2504714B4E4b";
    let rewards = "0x0c501fb73808e1bd73cbddd0c99237bbc481bb58";

    let padlock = await new PadLock__factory(deployer).deploy(
        weth,
        minimalFee,
        poolProvider,
        rewards
    );

    const tx = await padlock.connect(alice).proposeRelationship(alice.address, minimalFee);
    const waitedTx = await tx.wait();

    const event = waitedTx?.events?.find(event => event.event === "RelationshipProposed");

    let relationshipId = event?.args?.relationshipId;
    await padlock.connect(bob).approveRelationship(relationshipId);

    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
