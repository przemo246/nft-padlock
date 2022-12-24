import { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import { useEthers, useContractFunction } from "@usedapp/core";

import { Spinner } from "../../../atoms/Spinner/Spinner";
import { RelationshipsData } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../atoms/Button/Button";
import { PadLock } from "../../../contracts/PadLock";
import { toast } from "react-toastify";
import { Snackbar } from "../../../atoms/Snackbar/Snackbar";

const GetRelationshipProposed = gql`
  query GetRelationshipProposed($account: String!) {
    firstHalf: relationshipProposeds(where: { firstHalf: $account }) {
      id
      relationshipId
      firstHalf
      secondHalf
    }
    secondHalf: relationshipProposeds(where: { secondHalf: $account }) {
      id
      relationshipId
      firstHalf
      secondHalf
    }
  }
`;

export const MyPendingRelationships = () => {
  const [pendingRelationships, setPendingRelationships] =
    useState<RelationshipsData | null>(null);

  const navigate = useNavigate();
  const { account } = useEthers();
  const { loading, data } = useQuery(GetRelationshipProposed, {
    variables: { account }
  });
  const { state, send, resetState } = useContractFunction(
    PadLock,
    "approveRelationship",
    {
      transactionName: "Approve relationship"
    }
  );

  const handleAcceptRelationship = (id: string) => send(id);

  useEffect(() => {
    if (!data) return;
    setPendingRelationships(data);
  }, [data]);

  useEffect(() => {
    if (state.errorMessage) {
      toast.error(state.errorMessage);
      resetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.errorMessage, state.status]);

  if (loading || !pendingRelationships) {
    return <Spinner />;
  }

  return (
    <div>
      {!pendingRelationships.firstHalf.length &&
      !pendingRelationships.secondHalf.length ? (
        <div>
          You haven't got any pending relationships to approve.{" "}
          <button
            className="underline hover:text-red-600 transition"
            onClick={() => navigate("/propose")}
          >
            Send
          </button>{" "}
          a proposal.
        </div>
      ) : (
        <div className="flex flex-col items-start">
          {Boolean(pendingRelationships.firstHalf.length) && (
            <div className="mb-4">
              <div className="text-xl mb-5">Sent proposals</div>
              <ul>
                {pendingRelationships.firstHalf.map((el, i) => (
                  <li key={el.id} className="flex items-center mb-4">
                    <div className="text-red-600 mr-4">{i + 1}.</div>
                    To: {el.secondHalf}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {Boolean(pendingRelationships.secondHalf.length) && (
            <div>
              <div className="text-xl mb-5">Received proposals</div>
              <ul>
                {pendingRelationships.secondHalf.map((el, i) => (
                  <li key={el.id} className="flex items-center mb-4">
                    <div className="text-red-600 mr-4">{i + 1}.</div>
                    <div className="mr-4">From: {el.firstHalf}</div>
                    <Button
                      onClick={() =>
                        handleAcceptRelationship(el.relationshipId)
                      }
                      variant="tertiary"
                    >
                      Accept
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <Snackbar />
    </div>
  );
};
