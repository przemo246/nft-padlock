import { MyPendingRelationships } from "./MyPendingRelationships/MyPendingRelationships.component";
import { FundWeth } from "./FundWeth/FundWeth.component";
import { MyRelationship } from "./MyRelationship/MyRelationship.component";
import { ProposeRelationshipForm } from "./ProposeRelationshipForm/ProposeRelationshipForm.component";

export const PadLockControls = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-lg rounded overflow-hidden shadow-lg p-8">
        <ProposeRelationshipForm />
      </div>
      <div className="mt-12 max-w-lg rounded overflow-hidden shadow-lg p-8">
        <FundWeth />
      </div>
      <div className="mt-12 max-w-lg rounded overflow-hidden shadow-lg p-8">
        <MyRelationship />
      </div>
      <div className="mt-12 max-w-lg rounded overflow-hidden shadow-lg p-8">
        <MyPendingRelationships />
      </div>
    </div>
  );
};
