export function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        {/* Branding */}
        <div className="flex-1 flex items-center">
          <img
            src="frontend/assets/img/properclogo.png"
            alt="Logo"
            className="h-10 w-auto mr-2 rounded-full "
          />
          <a className="btn btn-ghost text-xl">ProPerc</a>
        </div>

        {/* Navigation */}
        <div className="flex-none">
          {/* Mobile Menü */}
          <div className="dropdown dropdown-end lg:hidden">
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

          {/* Desktop Menü */}
          <ul className="menu menu-horizontal px-1 hidden lg:flex">
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
    </>
  );
}
