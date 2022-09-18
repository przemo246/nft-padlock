import { Optimism, OptimismGoerli, useEthers } from "@usedapp/core";
import formatAddress from "../../../utils/formatAddress";

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
    <button
      type="button"
      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
      onClick={deactivate}
    >
      Connected as {formatAddress(account)}
    </button>
  ) : (
    <button
      type="button"
      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
      onClick={() => activateBrowserWallet()}
    >
      Connect
    </button>
  );
};
