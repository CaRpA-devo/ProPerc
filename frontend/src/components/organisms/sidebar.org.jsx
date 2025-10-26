import { Link, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Aurora from "../animations/aurora.animation.ani.jsx";
import { UserAvatar } from "../atoms/user.avatar.com.jsx";

export function Sidebar({ isCollapsed, onToggle }) {
  const location = useLocation();
  const { isSignedIn } = useUser();

  // Aurora-Container mit absoluter Positionierung über die ganze Sidebar
  const auroraStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none", // Damit Clicks durch die Animation durchgehen
    zIndex: 0, // Unter dem Inhalt
  };

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
      name: "Planer",
      path: "/planer",
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      requiresAuth: true,
    },
    {
      name: "Wiki",
      path: "/wiki",
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
      requiresAuth: false,
    },
    {
      name: "Support",
      path: "/support",
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
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      requiresAuth: false,
    },
    {
      name: "Einstellungen",
      path: "/settings",
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      requiresAuth: true,
    },
    {
      name: "AGB",
      path: "/agb",
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      requiresAuth: false,
    },
    {
      name: "Über uns",
      path: "/aboutus",
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      requiresAuth: false,
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
       sticky top-0 bg-base-200/90 z-40 border-r border-base-300
       transition-all duration-300 ease-in-out self-start
       h-screen
       ${isCollapsed ? "w-16" : "w-64"}
     `}
      style={{
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      {/* Aurora Background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ overflow: "hidden" }}
      >
        <Aurora
          colorStops={["#2eb872", "#1a1a1a", "#ffd166"]}
          blend={0.6}
          amplitude={1.2}
          speed={0.2}
        />
      </div>

      {/* Sidebar Content */}
      <div className="relative z-10 h-full flex flex-col min-h-0">
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
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
          <ul className={`space-y-2 ${isCollapsed ? "p-2" : "p-4"}`}>
            {filteredItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li
                  key={item.path}
                  className="animate-fade-in-down"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "both",
                  }}
                >
                  <Link
                    to={item.path}
                    className={`
                      flex items-center rounded-lg transition-all duration-300 group
                      ${
                        isActive
                          ? "bg-primary/20 text-primary border-l-4 border-primary shadow-lg backdrop-blur-sm"
                          : "text-base-content hover:bg-base-300/50 hover:text-base-content hover:shadow-md hover:backdrop-blur-sm"
                      }
                      ${isCollapsed ? "px-2 py-3 justify-center" : "px-3 py-2"}
                    `}
                    title={isCollapsed ? item.name : ""}
                  >
                    <div
                      className={`
                      transition-transform duration-300 group-hover:scale-110
                      ${isActive ? "text-primary" : "text-current"}
                    `}
                    >
                      {item.icon}
                    </div>
                    {!isCollapsed && (
                      <span className="ml-3 font-medium transition-all duration-300 group-hover:translate-x-1">
                        {item.name}
                      </span>
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
