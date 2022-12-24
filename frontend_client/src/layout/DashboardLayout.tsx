import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { EthBalance } from "../features/Navbar/EthBalance/EthBalance";
import { WethConverter } from "../features/Navbar/WethConverter/WethConverter";
import { WalletConnector } from "../features/Navbar/WalletConnector/WalletConnector";
import { NetworkIndicator } from "../features/Navbar/NetworkIndicator/NetworkIndicator";
import { Logo } from "../atoms/Logo/Logo";

export const DashboardLayout = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-700 to-red-700">
      <div className="max-w-screen-2xl px-20 pb-11 pt-4 min-h-screen mx-auto my-0">
        <div className="flex text-neutral-50 min-h-screen shadow-3xl">
          <nav className="static flex flex-col px-12 bg-neutral-800 py-10">
            <Logo />
            <ul className="mt-32">
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
                  to="/propose"
                >
                  Propose
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
            <header className="h-32 bg-neutral-300 flex justify-end px-10 text-neutral-800">
              <div className="flex justify-evenly items-center">
                <div className="mr-6">
                  <EthBalance />
                </div>
                <div className="mr-6">
                  <NetworkIndicator />
                </div>
                <div className="mr-6">
                  <WethConverter />
                </div>
                <div>
                  <WalletConnector />
                </div>
              </div>
            </header>
            <div className="bg-neutral-100 h-full text-neutral-800 p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
