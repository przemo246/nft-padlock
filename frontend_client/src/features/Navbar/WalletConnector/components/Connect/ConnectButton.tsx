interface ConnectButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const ConnectButton: React.FunctionComponent<ConnectButtonProps> = ({
  onClick,
  children
}) => {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-[30px] border border-transparent transition-shadow bg-neutral-900 px-10 py-2 text-sm font-medium text-white shadow-[5px_5px_0px_#F24333] hover:shadow-[2px_2px_0px_#F24333]"
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};
