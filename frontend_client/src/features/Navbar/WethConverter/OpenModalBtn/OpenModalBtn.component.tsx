import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

export const OpenModalBtn: React.FC<{ onClick: () => void }> = ({
  onClick
}) => {
  return (
    <button
      className="flex justify-center items-center hover:bg-gray-100 hover:shadow-sm rounded-lg p-1"
      onClick={onClick}
      type="button"
    >
      <ArrowPathRoundedSquareIcon className="h-8 w-8 text-black" />{" "}
      <span className="font-bold ml-1">Swap WETH</span>
    </button>
  );
};
