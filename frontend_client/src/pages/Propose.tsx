import { useEthers } from "@usedapp/core";
import { CreatePadlockForm } from "../features/CreatePadlockForm/CreatePadLockForm";

export const Propose = () => {
  const { account } = useEthers();

  if (!account) {
    return <p>Please connect your account first</p>;
  }

  return (
    <div className="h-full flex justify-start items-center flex-col">
      <CreatePadlockForm />
    </div>
  );
};
