import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

import { Link } from "react-router-dom";
import Aurora from "../animations/aurora.animation.ani.jsx";

export function Navbar() {
  return (
    <div
      className="w-full flex flex-col justify-center"
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
          colorStops={["#2eb872", "#ffd166"]}
          blend={0.4}
          amplitude={0.8}
          speed={0.3}
        />
      </div>

      {/* Navbar Content */}
      <div className="relative z-10 flex items-center justify-between px-4 h-full">
        {/* Logo (links) */}
        <Link to="/" className=" btn btn-ghost">
          <img
            src="../../../assets/img/logoNoBg.png"
            alt="ProPerc Logo"
            className="h-10 w-auto px-1 rounded-full"
          />
        </Link>

        {/* Sign In (rechts) */}
        <div className="flex items-center gap-2">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link to="/signin" className="btn btn-ghost">
              Sign In
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
