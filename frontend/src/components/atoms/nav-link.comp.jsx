import { Link } from "react-router-dom";

export function NavLink({ to, children, className = "" }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg hover:bg-base-300 transition-colors duration-200 ${className}`}
    >
      {children}
    </Link>
  );
}
