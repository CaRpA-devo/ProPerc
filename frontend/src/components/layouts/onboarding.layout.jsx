import { NavbarLink } from "../organisms/navbarlink.org";
import { Footer } from "../organisms/footer.org";

export function OnboardingLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarLink />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
