import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Deine Balance schon gefunden?
            </h1>
            <p className="mb-5">
              Plane hier dein gesundes Leben! Fit & Vital bleiben! Mit{" "}
              <strong>ProPerc</strong> Ernährung, Sport und Gesundheit auf einen
              Blick.
            </p>
            <SignedIn>
              <div className="flex gap-2">
                <Link className="btn btn-ghost" to="/dashboard">
                  Login
                </Link>
              </div>
            </SignedIn>
            {/* <Link to="/signup" className="btn btn-primary">
              Registrieren
            </Link> */}
            {/* <Link to="/signin" className="btn btn-primary">
              Login
            </Link> */}
            <SignedOut>
              <Link to="/signin" className="btn btn-primary">
                Login
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </>
  );
}
