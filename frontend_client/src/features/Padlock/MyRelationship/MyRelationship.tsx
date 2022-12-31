import { useEffect, useState } from "react";

import { useCall, useEthers, useContractFunction } from "@usedapp/core";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Spinner } from "../../../atoms/Spinner/Spinner";
import {
  Relationship,
  BreakupProposal,
  BreakupApproved
} from "../../../types/types";
import {
  unixToDate,
  daysSinceRelationshipStarted
} from "../../../utils/dateUtils";
import { ERC721 } from "../../../contracts/ERC721";
import { PadLock } from "../../../contracts/PadLock";
import { ERC1155 } from "../../../contracts/ERC1155";
import { Button } from "../../../atoms/Button/Button";
import { addresses } from "../../../contracts/addresses";
import { Snackbar } from "../../../atoms/Snackbar/Snackbar";

const GetRelationshipApproved = gql`
  query GetRelationshipApproved($account: String!) {
    firstHalf: relationshipApproveds(where: { firstHalf: $account }) {
      id
      relationshipId
      firstHalf
      secondHalf
      startedAt
      NFTPadlock
      NFTFraction
    }
    secondHalf: relationshipApproveds(where: { secondHalf: $account }) {
      id
      relationshipId
      firstHalf
      secondHalf
      startedAt
      NFTPadlock
      NFTFraction
    }
  }
`;

const GetBreakupProposal = gql`
  query GetBreakupProposal($relationshipId: String!) {
    breakupProposals(where: { relationshipId: $relationshipId }) {
      id
      relationshipId
      initiator
    }
  }
`;

const GetApprovedBreakup = gql`
  query GetBreakupProposal {
    breakupApproveds {
      id
      relationshipId
    }
  }
`;

type Props = {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
};

export const MyRelationship = ({ setCurrentView }: Props) => {
  const [approvedRelationship, setApprovedRelationship] =
    useState<Relationship | null>(null);
  const [breakupProposal, setBreakupProposal] =
    useState<BreakupProposal | null>(null);
  const [NFTPadlockId, setNFTPadlockId] = useState<string | null>(null);

  const { account } = useEthers();
  const navigate = useNavigate();

  const {
    data: relationshipApprovedData,
    loading: relationshipApprovedLoading
  } = useQuery(GetRelationshipApproved, {
    variables: { account }
  });

  const { data: breakupProposedData, loading: breakupProposedLoading } =
    useQuery(GetBreakupProposal, {
      variables: { relationshipId: approvedRelationship?.relationshipId }
    });

  const { data: breakupApprovedData, loading: breakupApprovedLoading } =
    useQuery(GetApprovedBreakup);

  const { value: erc721Uri } =
    useCall({
      contract: ERC721,
      method: "tokenURI",
      args: [NFTPadlockId || ""]
    }) ?? {};

  const { value: idToRelationship } =
    useCall({
      contract: PadLock,
      method: "idToRelationship",
      args: [approvedRelationship?.relationshipId || ""]
    }) ?? {};

  const {
    state: proposeBreakupState,
    send: proposeBreakupSend,
    resetState: proposeBreakupResetState
  } = useContractFunction(PadLock, "proposeBreakUp", {
    transactionName: "Propose breakup"
  });

  const {
    state: approveBreakupState,
    send: approveBreakupSend,
    resetState: approveBreakupResetState
  } = useContractFunction(PadLock, "approveBreakUp", {
    transactionName: "Approve breakup"
  });

  const {
    state: approveERC1155State,
    send: approveERC1155Send,
    resetState: approveERC1155ResetState
  } = useContractFunction(ERC1155, "setApprovalForAll", {
    transactionName: "ERC1155 Approval"
  });

  const proposeBreakup = async () => {
    const approveERC1155Tx = await approveERC1155Send(addresses.padlock, true);
    if (approveERC1155Tx) {
      proposeBreakupSend();
    }
  };

  const approveBreakup = async () => {
    const approveERC1155Tx = await approveERC1155Send(addresses.padlock, true);
    if (approveERC1155Tx) {
      approveBreakupSend();
    }
  };

  useEffect(() => {
    if (proposeBreakupState.errorMessage) {
      toast.error(proposeBreakupState.errorMessage);
      proposeBreakupResetState();
    }

    if (approveBreakupState.errorMessage) {
      toast.error(approveBreakupState.errorMessage);
      approveBreakupResetState();
    }

    if (approveERC1155State.errorMessage) {
      toast.error(approveERC1155State.errorMessage);
      approveERC1155ResetState();
    }

    if (proposeBreakupState.status === "Success") {
      toast.success("Breakup has been successfully proposed");
      proposeBreakupResetState();
    }

    if (approveBreakupState.status === "Success") {
      toast.success("Breakup has been successfully approved");
      proposeBreakupResetState();
    }

    if (approveERC1155State.status === "Success") {
      toast.success("ERC1155 approval granted");
      approveERC1155ResetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    proposeBreakupState.status,
    proposeBreakupState.errorMessage,
    approveBreakupState.status,
    approveBreakupState.errorMessage,
    approveERC1155State.status,
    approveERC1155State.errorMessage
  ]);

  useEffect(() => {
    if (!idToRelationship) return;

    const { NFTPadlock } = idToRelationship;

    setNFTPadlockId(NFTPadlock.toString());
  }, [idToRelationship]);

  useEffect(() => {
    // Check if there is data
    if (!relationshipApprovedData || !breakupApprovedData) return;

    const { firstHalf, secondHalf } = relationshipApprovedData;
    const { breakupApproveds } = breakupApprovedData;

    // Check if there are any approved relationships
    if (!firstHalf.length && !secondHalf.length) return;

    // Check if there are breakups
    if (!breakupApproveds.length) {
      setApprovedRelationship(firstHalf[0] || secondHalf[0]);
      return;
    }

    const relationshipApprovedDataFiltered = [
      ...firstHalf,
      ...secondHalf
    ].filter(
      (d: Relationship) =>
        !Boolean(
          breakupApprovedData.breakupApproveds.find(
            (el: BreakupApproved) => el.relationshipId === d.relationshipId
          )
        )
    );

    setApprovedRelationship(relationshipApprovedDataFiltered[0]);
  }, [relationshipApprovedData, breakupApprovedData, approvedRelationship]);

  useEffect(() => {
    if (!breakupProposedData) return;

    if (breakupProposedData.breakupProposals.length) {
      setBreakupProposal(breakupProposedData.breakupProposals[0]);
    }
  }, [breakupProposedData]);

  if (
    relationshipApprovedLoading ||
    breakupProposedLoading ||
    breakupApprovedLoading
  ) {
    return <Spinner />;
  }

  return (
    <div>
      {!approvedRelationship ? (
        <div>
          Currently not in a relationship.{" "}
          <button
            className="underline hover:text-red-600 transition"
            onClick={() => navigate("/propose")}
          >
            Propose
          </button>{" "}
          a relationship or{" "}
          <button
            onClick={() => setCurrentView("pending")}
            className="underline hover:text-red-600 transition"
          >
            accept
          </button>{" "}
          a pending relationship.
        </div>
      ) : (
        <div>
          <div className="text-2xl mb-6">My relationship</div>
          <div className="mb-4 inline-block">
            {NFTPadlockId && erc721Uri ? (
              <div className="bg-teal-100 rounded-lg">
                <img
                  src={erc721Uri[0]}
                  className="max-w-xs"
                  alt="Love Padlock"
                />
              </div>
            ) : (
              <Spinner />
            )}
          </div>
          <div className="text-lg">
            <div className="mr-4 mb-4">
              <span className="mr-4 font-medium">Created:</span>
              <span className="mr-2">
                {unixToDate(approvedRelationship.startedAt).toLocaleString()}
              </span>
              <span>
                ({daysSinceRelationshipStarted(approvedRelationship.startedAt)})
              </span>
            </div>
            <div className="mb-6">
              <span className="mr-4 font-medium">With:</span>
              {account?.toLowerCase() ===
              approvedRelationship.firstHalf.toLowerCase()
                ? approvedRelationship.secondHalf
                : approvedRelationship.firstHalf}
            </div>
            <div>
              {breakupProposal ? (
                <Button
                  onClick={
                    breakupProposal.initiator.toLowerCase() ===
                    account?.toLowerCase()
                      ? () => {}
                      : () => approveBreakup()
                  }
                  disabled={
                    breakupProposal.initiator.toLowerCase() ===
                    account?.toLowerCase()
                  }
                  variant="tertiary"
                  className={
                    breakupProposal.initiator.toLowerCase() ===
                    account?.toLowerCase()
                      ? "bg-slate-500 hover:bg-slate-600"
                      : ""
                  }
                >
                  {breakupProposal.initiator.toLowerCase() ===
                  account?.toLowerCase()
                    ? "Awaiting approval"
                    : "Approve breakup"}
                </Button>
              ) : (
                <Button onClick={() => proposeBreakup()} variant="tertiary">
                  Propose breakup
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      <Snackbar />
    </div>
  );
};
