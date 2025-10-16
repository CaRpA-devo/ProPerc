import Aurora from "../animations/aurora.animation.ani.jsx";
import { Link } from "react-router";

import { UserAvatar } from "../atoms/user.avatar.com.jsx";

export function NavbarLink({}) {
  return (
    <div
      className="w-full bg-base-200 flex text-center items-center justify-center "
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
        <div className="flex-none btn btn-ghost">
          <Link to="/dashboard">
            <img
              src="./src/assets/img/logoNoBg.png"
              alt="ProPerc Logo"
              className="h-16 w-auto px-1 rounded-full"
            />
          </Link>
        </div>
        {/* Zentrale Navigation */}
        <div className="flex-1 flex justify-center">
          <ul className="menu menu-horizontal px-1 hidden lg:flex space-x-8">
            <li>
              <Link
                to="/dashboard"
                className="text-base font-medium hover:text-primary transition-colors py-2"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-base font-medium hover:text-primary transition-colors py-2"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="text-base font-medium hover:text-primary transition-colors py-2"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="text-base font-medium hover:text-primary transition-colors py-2"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:block">
          <UserAvatar />
        </div>
      </div>
      {/* Mobile Menü */}
      <div className="flex-none lg:hidden">
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-sm"
            aria-label="Menü öffnen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
              <UserAvatar />
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/signin">Login</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
