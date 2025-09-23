import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Aurora from "../animations/aurora.animation.ani.jsx";
import { Link } from "react-router";

export function NavbarLink() {
  return (
    <div
      className="w-full flex flex-col items-center justify-center"
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
      <div
        className="relative z-10 w-full flex items-center justify-between px-4"
        style={{ height: "64px" }}
      >
        {/* Logo */}
        <div className="flex-none">
          <Link to="/">
            <img
              src={logoImg}
              alt="ProPerc Logo"
              className="h-10 w-auto px-1 rounded-full"
            />
          </Link>
        </div>
        {/* Zentrale Navigation */}
        <div className="flex-1 flex justify-center">
          {/* Desktop Menü */}
          <ul className="menu menu-horizontal px-1 hidden lg:flex space-x-6">
            <li>
              <a
                href=""
                className="text-base font-medium hover:text-primary transition-colors"
              >
                LINK 1
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-base font-medium hover:text-primary transition-colors"
              >
                LINK 2
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-base font-medium hover:text-primary transition-colors"
              >
                LINK 3
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-base font-medium hover:text-primary transition-colors"
              >
                LINK 4
              </a>
            </li>
          </ul>
        </div>
        {/* Mobile Menü */}
        <div className="flex-none lg:hidden">
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost"
              aria-label="Menü öffnen"
            >
              {/* Hamburger Icon */}
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
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="">LINK 1</a>
              </li>
              <li>
                <a href="">LINK 2</a>
              </li>
              <li>
                <a href="">LINK 3</a>
              </li>
              <li>
                <a href="">LINK 4</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
