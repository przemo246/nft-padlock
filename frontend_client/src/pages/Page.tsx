import { Fragment, PropsWithChildren } from "react";

import { useEthers } from "@usedapp/core";

export const Page = ({ children }: PropsWithChildren) => {
  const { account } = useEthers();

  if (!account) {
    return <p>Please connect your account first</p>;
  }

  return <Fragment>{children}</Fragment>;
};
