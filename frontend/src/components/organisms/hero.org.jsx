import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "../atoms/button.comp";

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
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Deine Balllance schon gefunden?
            </h1>
            <p className="mb-5">
              Plane hier dein gesundes Leben! Fit & Vital bleiben! Mit{" "}
              <strong>ProPerc</strong> Ernährung, Sport und Gesundheit auf einen
              Blick.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}
