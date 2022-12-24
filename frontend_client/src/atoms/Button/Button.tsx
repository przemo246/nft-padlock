import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type PropsWithChildren
} from "react";

type ButtonProps = PropsWithChildren &
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    onClick: () => void;
    variant?: "primary" | "secondaryFull" | "secondaryGhost" | "tertiary";
    className?: string;
  };

const variants = {
  primary:
    "text-white shadow-[5px_5px_0px_#F55D3E] hover:shadow-[2px_2px_0px_#F55D3E] transition-shadow bg-neutral-900",
  secondaryFull:
    "transition text-white border border-red-600 bg-red-600 hover:bg-[#F44B2A] hover:border-[#F44B2A]",
  secondaryGhost:
    "transition text-red-600 border border-red-600 bg-transparent hover:bg-red-600 hover:text-white",
  tertiary:
    "transition bg-indigo-600 text-white px-6 py-2 hover:bg-indigo-700 text-sm"
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button
      type="button"
      className={`rounded-[30px] px-10 py-2.5 text-sm font-medium ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
