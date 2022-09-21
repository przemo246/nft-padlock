import React from "react";
import { PadLockControls } from "../features/PadLockControls/PadLockControls.component";
import { Hero } from "../features/Hero/Hero";
import { HeroLayout } from "../layout/HeroLayout";

export default () => {
  return (
    <div className="App">
      <HeroLayout>
        <Hero />
      </HeroLayout>
    </div>
  );
};
