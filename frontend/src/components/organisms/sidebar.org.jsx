import { Link, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Aurora from "../animations/aurora.animation.ani.jsx";
import { UserAvatar } from "../atoms/user.avatar.com.jsx";

export function Sidebar({ isCollapsed, onToggle }) {
  const location = useLocation();
  const { isSignedIn } = useUser();

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
          />
        </svg>
      ),
      requiresAuth: true,
    },
    {
      name: "Ernährung",
      path: "/food",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      requiresAuth: true,
    },
    {
      name: "Profil",
      path: "/profile",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      requiresAuth: true,
    },
    {
      name: "Login",
      path: "/signin",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
      ),
      requiresAuth: false,
      showWhen: !isSignedIn,
    },
    {
      name: "Registrieren",
      path: "/signup",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      ),
      requiresAuth: false,
      showWhen: !isSignedIn,
    },
  ];

  const filteredItems = navigationItems.filter(
    (item) => item.showWhen !== false && (!item.requiresAuth || isSignedIn)
  );

  return (
    <div
      className={`
       fixed left-0 top-0 h-full bg-base-200 z-40 border-r border-base-300
       transition-all duration-300 ease-in-out
       ${isCollapsed ? "w-16" : "w-64"}
     `}
      style={{
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 opacity-20">
        <Aurora
          colorStops={["#2eb872", "#ffd166"]}
          blend={0.4}
          amplitude={0.8}
          speed={0.3}
        />
      </div>

      {/* Sidebar Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Logo Section */}
        <div className="border-b border-base-300 flex items-center">
          {!isCollapsed ? (
            <div className="p-4 flex items-center justify-between w-full">
              <Link
                to={isSignedIn ? "/dashboard" : "/"}
                className="flex items-center space-x-3"
              >
                <img
                  src="./src/assets/img/logoNoBg.png"
                  alt="ProPerc Logo"
                  className="h-8 w-auto"
                />
                <span className="text-lg font-bold text-base-content">
                  ProPerc
                </span>
              </Link>

              {/* Toggle Button */}
              <button
                onClick={onToggle}
                className="btn btn-ghost btn-sm p-1"
                aria-label="Sidebar minimieren"
              >
                <svg
                  className="w-4 h-4 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="p-2 flex flex-col items-center w-full space-y-2">
              <Link
                to={isSignedIn ? "/dashboard" : "/"}
                className="flex items-center justify-center"
              >
                <img
                  src="./src/assets/img/logoNoBg.png"
                  alt="ProPerc Logo"
                  className="h-8 w-8 object-contain"
                />
              </Link>

              {/* Toggle Button */}
              <button
                onClick={onToggle}
                className="btn btn-ghost btn-sm p-1"
                aria-label="Sidebar erweitern"
              >
                <svg
                  className="w-4 h-4 transition-transform duration-300 rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className={`space-y-2 ${isCollapsed ? "p-2" : "p-4"}`}>
            {filteredItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center rounded-lg transition-colors group
                      ${
                        isActive
                          ? "bg-primary text-primary-content"
                          : "text-base-content hover:bg-base-300 hover:text-base-content"
                      }
                      ${isCollapsed ? "px-2 py-3 justify-center" : "px-3 py-2"}
                    `}
                    title={isCollapsed ? item.name : ""}
                  >
                    {item.icon}
                    {!isCollapsed && (
                      <span className="ml-3 font-medium">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div
          className={`border-t border-base-300 ${isCollapsed ? "p-2" : "p-4"}`}
        >
          {isSignedIn ? (
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-start"
              }`}
            >
              <UserAvatar collapsed={isCollapsed} />
            </div>
          ) : (
            !isCollapsed && (
              <div className="text-sm text-base-content/70 text-center">
                Melde dich an für mehr Funktionen
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
