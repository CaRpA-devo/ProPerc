import { NavLink } from "../atoms/nav-link.comp";
import Aurora from "../animations/aurora.animation.ani.jsx";
import { useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();

  // Zeige die Navbar nicht auf der Onboarding-Seite
  if (location.pathname.startsWith("/onboarding")) {
    return null;
  }

  return (
    <div
      className="w-full bg-base-200 flex flex-col justify-center"
      style={{ position: "relative", minHeight: "64px" }}
    >
      {/* Aurora Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Aurora
          colorStops={["#f4f4f4", "#ffd166", "#2eb872"]}
          blend={0.4}
          amplitude={0.8}
          speed={0.3}
        />
      </div>

      {/* Navbar Content */}
      <div className="relative z-10 flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <NavLink to="/" className="p-0 hover:bg-transparent">
          <img
            src="/src/assets/img/logoNoBg.png"
            alt="ProPerc Logo"
            className="h-12"
          />
        </NavLink>

        {/* Mobile Menu Button (optional) */}
        <button className="md:hidden p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
