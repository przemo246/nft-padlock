import { HeartIcon } from "@heroicons/react/24/solid";

import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative text-2xl font-semibold font-logo cursor-pointer"
      onClick={() => navigate("/")}
    >
      nftpadLock
      <HeartIcon className="fill-red-600 absolute rotate-6 top-[-5px] w-[13px] left-[52px]" />
    </div>
  );
};
