import { Config, OptimismGoerli } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;

export const useDappConfig: Config = {
  readOnlyUrls: {
    [OptimismGoerli.chainId]: getDefaultProvider(
      ALCHEMY_API_KEY
        ? `https://opt-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
        : "https://goerli.optimism.io"
    )
  }
};
