import { OptimismGoerli, useEthers } from "@usedapp/core";

import formatAddress from "../../../utils/formatAddress";
import { Button } from "../../../atoms/Button/Button";

export const WalletConnector = () => {
  const { activateBrowserWallet, account, chainId, deactivate } = useEthers();

  if (chainId !== OptimismGoerli.chainId && account) {
    return (
      <div className="font-bold underline">
        Please switch to Optimism Goerli network
      </div>
    );
  }
  return account ? (
    <Button onClick={deactivate}>{formatAddress(account)}</Button>
  ) : (
    <Button onClick={activateBrowserWallet}>Connect</Button>
  );
};
