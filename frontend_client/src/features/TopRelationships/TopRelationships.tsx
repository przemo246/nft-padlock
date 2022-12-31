import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import { Spinner } from "../../atoms/Spinner/Spinner";
import {
  daysSinceRelationshipStarted,
  unixToDate
} from "../../utils/dateUtils";
import { RelationshipApproved, BreakupApproved } from "../../types/types";

const GetRelationshipApproved = gql`
  query GetRelationshipApproved {
    relationshipApproveds(order_by: { startedAt: asc }) {
      id
      relationshipId
      startedAt
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

export const TopRelationships = () => {
  const [approvedRelationships, setApprovedRelationships] = useState<
    RelationshipApproved[]
  >([]);

  const {
    data: relationshipApprovedData,
    loading: relationshipApprovedLoading
  } = useQuery(GetRelationshipApproved);

  const { data: breakupApprovedData, loading: breakupApprovedLoading } =
    useQuery(GetApprovedBreakup);

  useEffect(() => {
    // Check if there is data
    if (!relationshipApprovedData || !breakupApprovedData) return;

    const { relationshipApproveds } = relationshipApprovedData;
    const { breakupApproveds } = breakupApprovedData;

    // Check if there are approved relationships
    if (!relationshipApproveds.length) return;

    // Check if there are brekups
    if (!breakupApproveds.length) {
      setApprovedRelationships(relationshipApproveds);
      return;
    }

    const relationshipApprovedDataFiltered = relationshipApproveds.filter(
      (d: RelationshipApproved) =>
        !Boolean(
          breakupApproveds.find(
            (el: BreakupApproved) => el.relationshipId === d.relationshipId
          )
        )
    );

    setApprovedRelationships(relationshipApprovedDataFiltered);
  }, [relationshipApprovedData, breakupApprovedData]);

  if (breakupApprovedLoading || relationshipApprovedLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="text-2xl mb-6">Top relationships</div>
      <ul>
        {Boolean(approvedRelationships.length) ? (
          approvedRelationships.map((el, i) => (
            <li key={el.id} className="mb-2">
              <span className="text-red-600 mr-4 font-medium">{i + 1}</span>
              <span className="mr-2">
                {unixToDate(el.startedAt).toLocaleString()}
              </span>
              <span>({daysSinceRelationshipStarted(el.startedAt)})</span>
            </li>
          ))
        ) : (
          <div>There are currently no relationships to display</div>
        )}
      </ul>
    </div>
  );
};
