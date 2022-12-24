import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { Modal } from "./Modal/Modal";
import { OpenModalBtn } from "./OpenModalBtn/OpenModalBtn";

export const WethConverter = () => {
  const { account } = useEthers();
  const [open, setOpen] = useState<boolean>(false);

  if (!account) {
    return null;
  }

  return (
    <>
      <OpenModalBtn onClick={() => setOpen(!open)} />
      <Modal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
