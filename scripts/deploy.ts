import { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumber } from "ethers";
import { chain } from "../config/networks";
import hre from "hardhat";

import {
    PadLock__factory,
    WETHMock__factory
} from "../typechain-types";

import fs from "fs";

async function main() {
    
    let [deployer, alice, bob] = await ethers.getSigners();

    let varibales = chain[hre.network.name];
    
    let minimalFee = parseEther("0.0001");
    
    let weth = varibales.weth;
    let incentives = varibales.incentives;
    let poolProvider =varibales.poolProvider;
    let rewards = varibales.rewards;

    let padlock = await new PadLock__factory(deployer).deploy(
        weth,
        incentives,
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
