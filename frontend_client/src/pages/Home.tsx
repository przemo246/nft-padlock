import React from "react";
import { PadLockControls } from "../features/PadLockControls/PadLockControls.component";
import { Hero } from "../features/Hero/Hero";
import { DefaultLayout } from "../layout/DefaultLayout";

export default () => {
  return (
    <div className="App">
      <DefaultLayout>
        <Hero />
      </DefaultLayout>
    </div>
  );
};
