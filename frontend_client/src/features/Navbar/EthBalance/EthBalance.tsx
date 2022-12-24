import { useEtherBalance, useEthers, useTokenBalance } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { addresses } from "../../../contracts/addresses";

export const EthBalance = () => {
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const wethBalance = useTokenBalance(addresses.WETH, account);

  if (!etherBalance || !wethBalance) {
    return null;
  }
  return (
    <div className="flex flex-col text-sm">
      Balance:
      <div>
        <span className="font-bold">
          {Number(formatEther(etherBalance)).toFixed(6)}
        </span>{" "}
        <span className="ml-1">ETH</span>
      </div>
      <div>
        <span className="font-bold">
          {Number(formatEther(wethBalance)).toFixed(6)}
        </span>{" "}
        <span className="ml-1">WETH</span>
      </div>
    </div>
  );
};
