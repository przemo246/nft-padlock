import {
  useCall,
  useContractFunction,
  useEthers,
  useSendTransaction
} from "@usedapp/core";
import { utils } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { PadLock } from "../../../contracts/PadLock";
import { Weth, wethAddress } from "../../../contracts/Weth";

export const FundWeth = () => {
  const { account } = useEthers();

  const {
    state: approveState,
    send: sendApprove,
    resetState: resetApproveState
  } = useContractFunction(Weth, "approve", {
    transactionName: "Approve weth"
  });
  const { value: wethTotalSupply } =
    useCall({
      contract: Weth,
      method: "totalSupply",
      args: []
    }) ?? {};

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

  if (!account) {
    return null;
  }

  const fundWeth = async () => {
    await sendEth({ to: wethAddress, value: utils.parseEther("0.01") });
  };

  const approveWeth = async () => {
    sendApprove(PadLock.address, utils.parseEther("0.01"));
  };

  return (
    <div className="flex  flex-col">
      {wethBalance && (
        <div className="font-bold my-4">
          WETH balance: {formatUnits(wethBalance[0], "ether")} ETH
        </div>
      )}
      {wethTotalSupply && (
        <div className="font-bold my-4">
          WETH total supply: {formatUnits(wethTotalSupply[0], "ether")} ETH
        </div>
      )}
      {wethAllowance && (
        <div className="font-bold my-4">
          WETH allowance: {formatUnits(wethAllowance[0], "ether")} ETH
        </div>
      )}
      <button
        className="rounded-md bg-cyan-800 mt-4 py-2 text-white"
        onClick={fundWeth}
      >
        Fund WETH contract with 0.01 ETH
      </button>
      {sendEthState.status !== "None" && (
        <div className="my-4">
          Status: <span className="font-bold">{sendEthState.status}</span>
        </div>
      )}
      <button
        className="rounded-md bg-green-800 py-2 mt-2 text-white"
        onClick={approveWeth}
      >
        Approve 0.01 ETH
      </button>
      {approveState.status !== "None" && (
        <div className="my-4">
          Status: <span className="font-bold">{approveState.status}</span>
        </div>
      )}
      {(sendEthState.status !== "None" || approveState.status !== "None") && (
        <button
          className="self-start underline"
          onClick={() => {
            resetApproveState();
            resetSendEthState();
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
