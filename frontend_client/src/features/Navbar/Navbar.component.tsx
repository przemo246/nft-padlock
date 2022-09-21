import { EthBalance } from "./EthBalance/EthBalance";
import { NetworkIndicator } from "./NetworkIndicator/NetworkIndicator";
import { WalletConnector } from "./WalletConnector/WalletConnector.component";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-8 px-24">
      <div className="text-2xl font-semibold font-logo text-neutral-900">
        nftpadLock
      </div>
      <div className="flex justify-evenly items-center">
        <div className="mr-4">
          <EthBalance />
        </div>
        <div className="mr-4">
          <NetworkIndicator />
        </div>
        <div>
          <WalletConnector />
        </div>
      </div>
    </nav>
  );
};
