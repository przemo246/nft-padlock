import { useNetwork, useChainMeta } from "@usedapp/core";

export const NetworkIndicator = () => {
  const { network } = useNetwork();
  const meta = useChainMeta(network.chainId || 1);
  return (
    <div>
      Network: <span className="font-bold">{meta.chainName}</span>
    </div>
  );
};
