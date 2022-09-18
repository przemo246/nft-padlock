import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";

export const EthBalance = () => {
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);
  if (!etherBalance) {
    return null;
  }
  return (
    <div>
      Balance:{" "}
      <span className="font-bold">{formatEther(etherBalance)} ETH</span>
    </div>
  );
};
