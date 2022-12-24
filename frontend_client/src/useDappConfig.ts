import { Config, Optimism, OptimismGoerli } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

export const useDappConfig: Config = {
  // readOnlyChainId: Optimism.chainId,
  readOnlyUrls: {
    // [Optimism.chainId]: getDefaultProvider("optimism"),
    [OptimismGoerli.chainId]: getDefaultProvider("https://goerli.optimism.io")
  }
};
