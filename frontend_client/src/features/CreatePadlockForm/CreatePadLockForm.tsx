import { useState, useEffect } from "react";

import { useContractFunction, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { toast } from "react-toastify";

import { addresses } from "../../contracts/addresses";
import { PadLock } from "../../contracts/PadLock";
import { Weth } from "../../contracts/Weth";
import { Snackbar } from "../../atoms/Snackbar/Snackbar";

export const CreatePadlockForm = () => {
  const [initialDeposit, setInitialDeposit] = useState(0);
  const [address, setAddress] = useState("");
  const { account } = useEthers();

  const {
    state: proposeRelationshipState,
    send: proposeRelationshipSend,
    resetState: proposeRelationshipResetState
  } = useContractFunction(PadLock, "proposeRelationship", {
    transactionName: "Propose relationship"
  });

  const {
    state: approveWethState,
    send: approveWethSend,
    resetState: approveWethResetState
  } = useContractFunction(Weth, "approve", {
    transactionName: "Approve WETH"
  });

  useEffect(() => {
    if (approveWethState.errorMessage) {
      toast.error(proposeRelationshipState.errorMessage);
      approveWethResetState();
    }

    if (approveWethState.status === "Success") {
      toast.success(`Your approval of ${initialDeposit} WETH was successful!`);
      approveWethResetState();
    }

    if (proposeRelationshipState.errorMessage) {
      toast.error(proposeRelationshipState.errorMessage);
      proposeRelationshipResetState();
    }

    if (proposeRelationshipState.status === "Success") {
      toast.success(
        `Relationship was successfuly proposed to address ${address}`
      );
      proposeRelationshipResetState();
      clearData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    proposeRelationshipState.errorMessage,
    approveWethState.errorMessage,
    proposeRelationshipState.status,
    approveWethState.status
  ]);

  const proposeRelationship = async () => {
    const approveWethSendTx = await approveWethSend(
      addresses.padlock,
      utils.parseEther(initialDeposit.toString())
    );

    if (approveWethSendTx) {
      await proposeRelationshipSend(
        address,
        utils.parseEther(initialDeposit.toString())
      );
    }
  };

  const clearData = () => {
    setInitialDeposit(0);
    setAddress("");
  };

  return (
    <div className="h-full flex justify-start items-center flex-col">
      <div className="flex flex-col max-w-md px-4 py-8 rounded-lg shadowpx-8">
        <div className="text-2xl mb-6">Propose a relationship</div>
        <form action="#" className="w-[300px]">
          <div className="flex flex-col mb-6">
            <label htmlFor="proposee-address" className="mb-2 pl-1 text-sm">
              Proposee address:
            </label>
            <input
              type="text"
              id="proposee-address"
              className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="text-red-600 text-sm mt-2 pl-1">
              {(address && !isAddress(address)) || account === address
                ? "Please put valid address"
                : ""}
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <label className="mb-2 pl-1 text-sm" htmlFor="initial-deposit">
              Initial deposit:
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="initial-deposit"
                className="rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent mr-2"
                placeholder="Value"
                step="0.01"
                min="0"
                max={32}
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(+e.target.value)}
              />
              <span className="ml-2">WETH</span>
            </div>
          </div>

          <div className="flex w-full my-4">
            <button
              type="button"
              className="py-2 px-4 disabled:bg-red-300 disabled:text-gray-100 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              disabled={
                initialDeposit === 0 ||
                address === "" ||
                proposeRelationshipState.status !== "None" ||
                approveWethState.status !== "None"
              }
              onClick={proposeRelationship}
            >
              {proposeRelationshipState.status === "None" ||
              approveWethState.status === "None"
                ? "Send"
                : proposeRelationshipState.status || approveWethState.status}
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="text-red-600 text-sm font-medium uppercase underline"
              onClick={clearData}
            >
              reset form
            </button>
          </div>
        </form>
        <Snackbar />
      </div>
    </div>
  );
};
