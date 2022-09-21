interface ConnectButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export const ConnectButton: React.FunctionComponent<ConnectButtonProps> = ({
  onClick,
  children,
  variant = "primary"
}) => {
  const styles =
    variant === "primary"
      ? "shadow-[5px_5px_0px_#F55D3E] hover:shadow-[2px_2px_0px_#F55D3E] transition-shadow bg-neutral-900"
      : "bg-red-600";

  return (
    <button
      type="button"
      className={`inline-flex items-center rounded-[30px] border border-transparent px-10 py-2.5 text-sm font-medium text-white ${styles}`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};
