import { Navbar } from "../features/Navbar/Navbar.component";
import { Outlet } from "react-router-dom";

export const HeroLayout = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-violet-100 via-white to-amber-50">
      <div className="h-full max-w-screen-2xl my-0 mx-auto flex flex-col items-stretch">
        <Navbar />
        <main className="h-full mx-24 flex items-center justify-between">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
