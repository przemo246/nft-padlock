import React from "react";
import { PadLockControls } from "../features/PadLockControls/PadLockControls.component";
import { DefaultLayout } from "../layout/DefaultLayout";

export default () => {
  return (
    <div className="App">
      <DefaultLayout>
        <PadLockControls />
      </DefaultLayout>
    </div>
  );
};
