import { NavbarLink } from "../organisms/navbarlink.org.jsx";
import { Footer } from "../organisms/footer.org.jsx";

export function DashboardLayout({ children }) {
  return (
    <>
      <NavbarLink />
      {children}
      <Footer />
    </>
  );
}
