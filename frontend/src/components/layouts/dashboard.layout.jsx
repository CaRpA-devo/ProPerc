import { Outlet } from "react-router";
import { NavbarLink } from "../organisms/navbarlink.org";
import { Footer } from "../organisms/footer.org";

export function DashboardLayout({ children }) {
  return (
    <>
      <NavbarLink />
      {children}
      <Footer />
    </>
  );
}
