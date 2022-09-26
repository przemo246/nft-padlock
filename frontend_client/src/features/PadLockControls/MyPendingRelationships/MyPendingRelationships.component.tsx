import { gql, useQuery } from "@apollo/client";

const getRelationshipsQuery = gql`
  query {
    relationshipProposeds(
      where: { firstHalf: "0x688B9b1BD574b9B5a0d8968b6b1E906Cfc6e8DC7" }
    ) {
      id
      relationshipId
      firstHalf
      secondHalf
    }
  }
`;

export const MyPendingRelationships = () => {
  const { data } = useQuery(getRelationshipsQuery);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl">Subgraph response:</h2>
      {data && <pre>{JSON.stringify(data, undefined, 4)}</pre>}
    </div>
  );
};
