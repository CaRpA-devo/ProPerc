// components/auth/AuthenticatedRoute.jsx
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export function AuthenticatedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // oder ein Loader

  if (!isSignedIn) {
    // Weiterleitung auf Landingpage, wenn nicht eingeloggt
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
