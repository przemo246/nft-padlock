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
    // <button
    //   type="button"
    //   className="px-6
    //   py-2.5
    //   bg-blue-600
    //   text-white
    //   font-medium
    //   text-xs
    //   leading-tight
    //   uppercase
    //   rounded
    //   shadow-md
    //   hover:bg-blue-700 hover:shadow-lg
    //   focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
    //   active:bg-blue-800 active:shadow-lg
    //   transition
    //   duration-150
    //   ease-in-out"
    //   onClick={onClick}
    // >
    //   Launch demo modal
    // </button>
  );
};
