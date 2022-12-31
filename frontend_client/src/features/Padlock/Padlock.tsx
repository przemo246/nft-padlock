import { useState } from "react";

import { Button } from "../../atoms/Button/Button";
import { MyRelationship } from "./MyRelationship/MyRelationship";
import { MyPendingRelationships } from "./MyPendingRelationships/MyPendingRelationships";

export const Padlock = () => {
  const [currentView, setCurrentView] = useState("active");

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
