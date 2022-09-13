import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectAddress, setAddress } from "./SignInBtn.slice";

export default () => {
  const address = useAppSelector(selectAddress);
  const dispatch = useAppDispatch();
  return (
    <div>
      {!address ? (
        <button
          className="h-10 px-6 font-semibold rounded-md bg-black text-white"
          onClick={() =>
            dispatch(setAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F"))
          }
        >
          Log in
        </button>
      ) : (
        <h1 className="text-lg font-semibold text-slate-900">
          Logged in as {address}
        </h1>
      )}
    </div>
  );
};
