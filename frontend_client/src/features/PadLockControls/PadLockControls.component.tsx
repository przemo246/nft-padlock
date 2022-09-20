import { ProposeRelationshipBtn } from "./ProposeRelationshipBtn/ProposeRelationshipBtn.component";
import { gql, useQuery } from "@apollo/client";

const getRelationshipsQuery = gql`
  query {
    breakupApproveds(first: 5) {
      id
      relationshipId
      initiator
      approver
    }
    breakupProposals(first: 5) {
      id
      relationshipId
      initiator
    }
  }
`;

export const PadLockControls = () => {
  const { loading, error, data } = useQuery(getRelationshipsQuery);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <h2 className="text-2xl">Padlock controlls</h2>
      <ProposeRelationshipBtn /> */}
      <h2 className="text-2xl">Subgraph response:</h2>
      {data && <pre>{JSON.stringify(data, undefined, 4)}</pre>}
    </div>
  );
};
