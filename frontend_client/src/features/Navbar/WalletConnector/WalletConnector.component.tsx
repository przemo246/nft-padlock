import { Optimism, OptimismGoerli, useEthers } from "@usedapp/core";
import formatAddress from "../../../utils/formatAddress";
import { ConnectButton } from "./components/Connect/ConnectButton";

export const WalletConnector = () => {
  const { activateBrowserWallet, account, chainId, deactivate } = useEthers();

  if (chainId !== Optimism.chainId && chainId !== OptimismGoerli.chainId) {
    return (
      <div className="font-bold underline">
        Please use either Optimism Mainnet or Optimism Goerli testnet.
      </div>
    );
  }
  return account ? (
    <ConnectButton onClick={deactivate}>{formatAddress(account)}</ConnectButton>
  ) : (
    <ConnectButton onClick={activateBrowserWallet}>Connect</ConnectButton>
  );
};
