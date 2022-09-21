import { Navbar } from "../features/Navbar/Navbar.component";

export const HeroLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="bg-gradient-to-br from-violet-100 via-white to-amber-50">
      <div className="max-w-screen-2xl my-0 mx-auto flex flex-col items-stretch h-screen">
        <Navbar />
        <main className="mx-24 h-full flex items-center justify-between">
          {children}
        </main>
      </div>
    </div>
  );
};
