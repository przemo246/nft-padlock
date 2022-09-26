import {
  useCall,
  useContractFunction,
  useEtherBalance,
  useEthers,
  useSendTransaction
} from "@usedapp/core";
import { utils } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { PadLock } from "../../../../contracts/PadLock";
import { Weth, wethAddress } from "../../../../contracts/Weth";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const FundWeth = () => {
  const { account } = useEthers();

  const {
    state: approveState,
    send: sendApprove,
    resetState: resetApproveState
  } = useContractFunction(Weth, "approve", {
    transactionName: "Approve weth"
  });

  const { value: wethBalance } =
    useCall({
      contract: Weth,
      method: "balanceOf",
      args: [account || ""]
    }) ?? {};

  const { value: wethAllowance } =
    useCall({
      contract: Weth,
      method: "allowance",
      args: [account, PadLock.address]
    }) ?? {};

  const {
    sendTransaction: sendEth,
    state: sendEthState,
    resetState: resetSendEthState
  } = useSendTransaction({
    transactionName: "Send Ethereum to WETH contract"
  });
  const [swapAmount, setSwapAmount] = useState(0.0);
  const [approveAmount, setApproveAmount] = useState(0.0);

  const ethBalance = useEtherBalance(account);

  if (!account) {
    return null;
  }

  const fundWeth = async () => {
    sendEth({
      to: wethAddress,
      value: utils.parseEther(swapAmount.toString())
    });
    setSwapAmount(0);
  };

  const approveWeth = async () => {
    setApproveAmount(0);
    sendApprove(PadLock.address, utils.parseEther(approveAmount.toString()));
  };

  if (!wethBalance || ethBalance === undefined) {
    return null;
  }

  const ethBalanceFormatted = +formatUnits(ethBalance, "ether");
  const wethBalanceFormatted = +formatUnits(wethBalance[0], "ether");

  return (
    <div className="flex flex-col mr-4">
      <div className="text-xl flex justify-between">
        <div>Your ETH balance:</div>
        <div>{ethBalanceFormatted}</div>
      </div>
      <div className="text-xl flex justify-between">
        <div>Your WETH balance:</div>
        <div>{wethBalanceFormatted}</div>
      </div>
      <div className="text-xl flex justify-between">
        <div>Amount of WETH approved:</div>
        <div>{formatUnits(wethAllowance[0], "ether")}</div>
      </div>
      <span
        className="w-full my-4 bg-red-600"
        style={{ padding: "1px" }}
      ></span>
      <div className="flex flex-row items-center justify-between">
        <div className="block text-xl whitespace-nowrap">Swap WETH:</div>
        <div className="block ml-4 border-gray-600 py-1 text-xl focus:border-red-600 focus:ring-red-600">
          <input
            type="number"
            name="eth"
            placeholder="0.00"
            className="w-1/2"
            onChange={(e) => setSwapAmount(+e.target.value)}
            max={ethBalanceFormatted}
            min={0}
          />
        </div>
        <button
          className="rounded-md disabled:bg-red-300 disabled:text-gray-100 bg-red-600 ml-4 p-2 text-sm font-medium text-white"
          disabled={swapAmount <= 0}
          onClick={fundWeth}
        >
          SWAP
        </button>
      </div>
      {sendEthState.status !== "None" && (
        <div className="">
          Status: <span className="font-bold">{sendEthState.status}</span>
        </div>
      )}
      <div className="flex flex-row items-center justify-between mt-4">
        <div className="block text-xl whitespace-nowrap">Approve WETH:</div>
        <div className="block ml-4 border-gray-600 py-1 text-xl focus:border-red-600 focus:ring-red-600">
          <input
            type="number"
            name="eth"
            placeholder="0.00"
            className="w-1/2"
            onChange={(e) => setApproveAmount(+e.target.value)}
            max={ethBalanceFormatted}
            min={0}
          />
        </div>
        <button
          className="rounded-md disabled:bg-red-300 disabled:text-gray-100 bg-red-600 ml-4 p-2 text-sm font-medium text-white"
          disabled={approveAmount <= 0}
          onClick={approveWeth}
        >
          APPROVE
        </button>
      </div>
      {approveState.status !== "None" && (
        <div className="">
          Status: <span className="font-bold">{approveState.status}</span>
        </div>
      )}
    </div>
  );
};
