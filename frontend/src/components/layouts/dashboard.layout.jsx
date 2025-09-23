import { Outlet } from "react-router";
import { NavbarLink } from "../organisms/navbarlink.org";

export function DashboardLayout() {
  return (
    <>
      <NavbarLink>
        <Outlet />
      </NavbarLink>
    </>
  );
}
