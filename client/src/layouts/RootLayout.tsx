import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Aside } from "../components/Aside";

export const RootLayout = () => {
  return (
    <>
      <Nav />
      <Aside />
      <main>
        <Outlet />
      </main>
    </>
  );
};
