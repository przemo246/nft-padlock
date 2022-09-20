import { Navbar } from "../features/Navbar/Navbar.component";

export const DefaultLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="flex flex-col items-stretch font-sans h-screen">
      <Navbar />
      <main className="mx-24 h-full">{children}</main>
    </div>
  );
};
