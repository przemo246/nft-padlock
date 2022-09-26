import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { EthBalance } from "../features/Navbar/EthBalance/EthBalance";
import { WethConverter } from "../features/Navbar/WethConverter/WethConverter.component";
import { WalletConnector } from "../features/Navbar/WalletConnector/WalletConnector.component";
import { NetworkIndicator } from "../features/Navbar/NetworkIndicator/NetworkIndicator";

export const DashboardLayout = () => {
  return (
    <div className="flex text-neutral-50 h-screen">
      <nav className="static flex flex-col px-12 bg-neutral-800 py-10">
        <div className="text-2xl font-semibold font-logo mb-32">nftpadLock</div>
        <ul>
          <li className="mb-12 relative">
            <NavLink
              className="nav-link hover:text-neutral-50 transition-all"
              to="/padlock"
            >
              Padlock
            </NavLink>
          </li>
          <li className="mb-12 relative">
            <NavLink
              className="nav-link hover:text-neutral-50 transition-all"
              to="/create-new"
            >
              Create new
            </NavLink>
          </li>
          <li className="mb-12 relative">
            <NavLink
              className="nav-link hover:text-neutral-50 transition-all"
              to="/top-relationships"
            >
              Top relationships
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="flex flex-col w-full">
        <header className="h-28 bg-neutral-300 flex justify-end px-10 text-neutral-800">
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
        </header>
        <div className="bg-neutral-100 h-full flex flex-col justify-center items-center text-neutral-800">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
