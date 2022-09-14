import { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumber } from "ethers";

import {
    PadLock__factory,
    WETHMock__factory
} from "../typechain-types";

import fs from "fs";

async function main() {
    
    let [deployer, alice, bob] = await ethers.getSigners();

    let weth = "0x09bADef78f92F20fd5f7a402dbb1d25d4901aAb2";
    let minimalFee = parseEther("0.0001")
    let poolProvider = "0x74a328ED938160D702378Daeb7aB2504714B4E4b";
    let rewards = "0x0c501fb73808e1bd73cbddd0c99237bbc481bb58";

    let padlock = await new PadLock__factory(deployer).deploy(
        weth,
        minimalFee,
        poolProvider,
        rewards
    );

    let vaultFactory = await padlock.vaultFactory();
    let erc721 = await padlock.erc721();
    let erc1155 = await padlock.erc1155();

    let contracts = {
        padlock: padlock.address,
        vaultFactory: vaultFactory,
        ERC721NFT: erc721,
        ERC1155NFT: erc1155,
    };

    writeToFile(contracts);
}

function writeToFile(contracts: Object) {
    let prettyJson = JSON.stringify(contracts, null, 2);
    fs.writeFileSync(__dirname + "/contract_addresses.json", prettyJson, { encoding: null });
    console.log(prettyJson);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
