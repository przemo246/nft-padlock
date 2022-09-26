import { useContractFunction, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { useState } from "react";
import { PadLock } from "../../contracts/PadLock";

export const CreatePadlockForm = () => {
  const { account } = useEthers();
  const { state, send, resetState } = useContractFunction(
    PadLock,
    "proposeRelationship",
    {
      transactionName: "Propose relationship"
    }
  );
  const [initialDeposit, setInitialDeposit] = useState(0.0);
  const [address, setAddress] = useState("");

  if (!account) {
    return <p>Please connect first</p>;
  }

  const proposeRelationship = async () => {
    send(address, utils.parseEther(initialDeposit.toString()));
  };

  return (
    <div className="flex flex-col max-w-md px-4 py-8 rounded-lg shadowpx-8">
      <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl ">
        Create a new padlock
      </div>
      <div className="p-6">
        <form action="#">
          <div className="flex flex-col mb-2">
            <div className=" relative" style={{ minWidth: "300px" }}>
              <input
                type="text"
                id="create-padlock-address"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                name="address"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 mb-2">
            <div className=" relative flex-1">
              <input
                type="float"
                id="create-padlock-initial-deposit"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 pl-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                name="Initial deposit"
                placeholder="Initial deposit"
                min={0}
                max={32}
                onChange={(e) => setInitialDeposit(+e.target.value)}
              />
            </div>
            ETH
          </div>

          <div className="flex w-full my-4">
            <button
              type="submit"
              className="py-2 px-4 disabled:bg-red-300 disabled:text-gray-100 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              disabled={
                initialDeposit === 0 ||
                address === "" ||
                state.status !== "None"
              }
              onSubmit={() => console.log("hello world")}
              onClick={(e) => {
                e.preventDefault();
                proposeRelationship();
              }}
            >
              {state.status === "None" ? "Send" : state.status}
            </button>
          </div>
          {state.status === "Exception" && (
            <>
              <div className="text-red-600">
                {state.errorMessage}
                {". "}
                <button className="underline font-bold" onClick={resetState}>
                  reset form
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
