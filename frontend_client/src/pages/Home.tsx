import React from "react";
import SignInBtn from "../features/SignInBtn/SignInBtn.component";

export default () => {
  return (
    <div className="App flex flex-col items-center font-sans">
      <h1 className=" text-3xl font-bold underline mb-4">
        Make love with DeFi
      </h1>
      <SignInBtn />
    </div>
  );
};
