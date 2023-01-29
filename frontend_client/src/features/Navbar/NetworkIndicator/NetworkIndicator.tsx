import { useChainMeta, useEthers } from "@usedapp/core";

export const NetworkIndicator = () => {
  const { chainId, account } = useEthers();

  const meta = useChainMeta(chainId || 1);

  if (!account) return null;

  return (
    <div className="text-sm">
      Network: <div className="font-bold">{meta.chainName}</div>
    </div>
  );
};
