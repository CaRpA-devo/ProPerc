import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import heroImg from "../../../assets/img/findeDeineBalance.jpg";

export function Hero() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Deine Balance schon gefunden?
            </h1>
            <p className="mb-5">
              Plane hier dein gesundes Leben! Fit & Vital bleiben! Mit{" "}
              <strong>ProPerc</strong> Ernährung, Sport und Gesundheit auf einen
              Blick.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signup" className="btn btn-primary">
                Registrieren
              </Link>
              <Link to="/signin" className="btn btn-outline btn-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
