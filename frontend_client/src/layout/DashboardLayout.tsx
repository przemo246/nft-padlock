import { Outlet } from "react-router-dom";
import { Navbar } from "../features/Navbar/Navbar.component";

export const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="h-full mx-24 flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};
