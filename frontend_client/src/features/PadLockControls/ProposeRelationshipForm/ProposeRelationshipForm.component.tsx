import { useContractFunction, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { PadLock } from "../../../contracts/PadLock";

export const ProposeRelationshipForm = () => {
  const { account } = useEthers();
  const { state, send, resetState } = useContractFunction(
    PadLock,
    "proposeRelationship",
    {
      transactionName: "Propose relationship"
    }
  );
  if (!account) {
    return <p>Please connect first</p>;
  }

  const proposeRelationship = async () => {
    await send(
      "0x4F37b447Cf179d6174b497e066105523f86A7559",
      utils.parseEther("0.01")
    );
  };

  return (
    <div className="flex flex-col">
      <span>PadLock contract address: {PadLock.address}</span>
      <button
        className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 mt-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        onClick={proposeRelationship}
        disabled={state.status !== "None"}
      >
        Propose relationship
      </button>
      {state.status !== "None" && (
        <span className="font-medium my-1">{state.status}</span>
      )}
      {state.status === "Exception" && (
        <div className="text-red-800 my-1">{state.errorMessage}</div>
      )}
      {state.status !== "None" && (
        <button className="self-start underline mt-2" onClick={resetState}>
          Reset state
        </button>
      )}
    </div>
  );
};
