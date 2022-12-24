import { useState } from "react";

import { useEthers } from "@usedapp/core";

import { MyRelationship } from "../features/PadLockControls/MyRelationship/MyRelationship";
import { MyPendingRelationships } from "../features/PadLockControls/MyPendingRelationships/MyPendingRelationships";
import { Button } from "../atoms/Button/Button";

export const Padlock = () => {
  const [currentView, setCurrentView] = useState("active");

  const { account } = useEthers();

  if (!account) {
    return <p>Please connect your account first</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <Button
          variant={
            currentView === "active" ? "secondaryFull" : "secondaryGhost"
          }
          className="mr-2"
          onClick={() => setCurrentView("active")}
        >
          Active
        </Button>
        <Button
          variant={
            currentView === "pending" ? "secondaryFull" : "secondaryGhost"
          }
          onClick={() => setCurrentView("pending")}
        >
          Pending
        </Button>
      </div>
      <div>
        {currentView === "active" ? (
          <MyRelationship setCurrentView={setCurrentView} />
        ) : (
          <MyPendingRelationships />
        )}
      </div>
    </div>
  );
};
