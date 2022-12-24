import { Optimism, OptimismGoerli, useEthers } from "@usedapp/core";

import formatAddress from "../../../utils/formatAddress";
import { Button } from "../../../atoms/Button/Button";

export const WalletConnector = () => {
  const { activateBrowserWallet, account, chainId, deactivate } = useEthers();

  if (
    chainId !== Optimism.chainId &&
    chainId !== OptimismGoerli.chainId &&
    account
  ) {
    return (
      <div className="font-bold underline">
        Please use either Optimism Mainnet or Optimism Goerli testnet.
      </div>
    );
  }
  return account ? (
    <Button onClick={deactivate}>{formatAddress(account)}</Button>
  ) : (
    <Button onClick={activateBrowserWallet}>Connect</Button>
  );
};
