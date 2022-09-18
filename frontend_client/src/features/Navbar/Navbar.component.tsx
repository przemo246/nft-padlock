import { EthBalance } from "./EthBalance/EthBalance";
import { NetworkIndicator } from "./NetworkIndicator/NetworkIndicator";
import { WalletConnector } from "./WalletConnector/WalletConnector.component";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center m-8">
      <div className="text-3xl font-bold tracking-tight text-gray-900">
        NFT padlock
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
