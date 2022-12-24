import { useChainMeta, useEthers } from "@usedapp/core";

export const NetworkIndicator = () => {
  const { chainId } = useEthers();

  const meta = useChainMeta(chainId || 1);
  return (
    <div className="text-sm">
      Network: <div className="font-bold">{meta.chainName}</div>
    </div>
  );
};
