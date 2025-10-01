import { Link } from "react-router-dom";
import Aurora from "../animations/aurora.animation.ani.jsx";

export function Navbar() {
  return (
    <div
      className="w-full bg-base-200 flex flex-col justify-center "
      style={{ position: "relative", height: "64px", minHeight: "64px" }}
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
      <div className="relative z-10 flex items-center justify-between px-4 h-full">
        {/* Logo (links) */}
        <Link to="/" className="pl-10">
          <img
            src="/src/assets/img/logoNoBg.png"
            alt="ProPerc Logo"
            className="h-16 "
          />
        </Link>
      </div>
    </div>
  );
}
