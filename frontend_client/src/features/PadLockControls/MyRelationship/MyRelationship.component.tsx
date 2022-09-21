import { useCall, useEthers } from "@usedapp/core";
import { PadLock } from "../../../contracts/PadLock";

export const MyRelationship = () => {
  const { account } = useEthers();
  const { value } =
    useCall({
      contract: PadLock,
      method: "idToRelationship",
      args: [account]
    }) ?? {};

  if (!value) {
    return <p>Calling contract ...</p>;
  }

  const [
    startedAt,
    firstHalf,
    secondHalf,
    established,
    NFTPadlock,
    NFTFraction,
    initialFee,
    vault
  ] = value;

  return (
    <>
      <h2 className="font-bold ">Reading relationship from contract:</h2>
      <pre>
        Contract response:{" "}
        {JSON.stringify(
          {
            startedAt,
            firstHalf,
            secondHalf,
            established,
            NFTPadlock,
            NFTFraction,
            initialFee,
            vault
          },
          undefined,
          4
        )}
      </pre>
    </>
  );
};
