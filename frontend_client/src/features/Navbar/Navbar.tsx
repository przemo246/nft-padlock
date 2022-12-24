import { Logo } from "../../atoms/Logo/Logo";
import { EthBalance } from "./EthBalance/EthBalance";
import { NetworkIndicator } from "./NetworkIndicator/NetworkIndicator";
import { WalletConnector } from "./WalletConnector/WalletConnector";
import { WethConverter } from "./WethConverter/WethConverter";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-8 px-24">
      <Logo />
      <div className="flex justify-evenly items-center">
        <div className="mr-4">
          <EthBalance />
        </div>
        <div className="mr-4">
          <NetworkIndicator />
        </div>
        <div className="mr-4">
          <WethConverter />
        </div>
        <div>
          <WalletConnector />
        </div>
      </div>
    </nav>
  );
};
