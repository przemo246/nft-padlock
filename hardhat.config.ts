import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { chainIds } from "./config/networks";

import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: chainIds.hardhat,
  },
    localhost: {
      url: "http://localhost:8545",
    },
  },
};

export default config;
