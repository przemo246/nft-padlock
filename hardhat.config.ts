import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { chainIds } from "./config/networks";
import { NetworkUserConfig } from "hardhat/types";

import * as dotenv from "dotenv";

dotenv.config();

function createOptimismNetworkConfig(networkType: string, networkId:  number): NetworkUserConfig {
    const url: string = `https://opt-${networkType}.g.alchemyapi.com/v2/${process.env.ALCHEMY_KEY}`;
    let networkConfig: NetworkUserConfig = {
        chainId: networkId,
        url,
    };
    const pk: Array<string> = process.env.PRIVATE_KEY!!.split(", ") || [];
    if (pk.length != 0) {
        networkConfig.accounts = pk;
    }
    return networkConfig;
}

const config: HardhatUserConfig = {
    solidity: "0.8.10",
    defaultNetwork: "localhost",
    networks: {
        localhost: {
            url: "http://localhost:8545",
        },
        goerli: createOptimismNetworkConfig("goerli", 420),
    },
};

export default config;
