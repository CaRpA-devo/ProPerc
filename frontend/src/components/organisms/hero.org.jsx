import heroBg from "../../assets/img/herobg.jpg";
import { Button } from "../atoms/button.comp";
import { SignInPage } from "../pages/signin.page";
import { SignUpPage } from "../pages/signup.page";
import { useState } from "react";

export function Hero() {
  const [showSignUp, setShowSignIn] = useState(false);

  return (
    <>
      <div
        className="hero min-h-screen bg-cover bg-center contrast-110 saturate-125 brightness-105"
        style={{
          backgroundImage: `url(${heroBg} )`,
          position: "relative",
          overflow: "hidden",
          cursor: "default",
        }}
      >
        <div className="hero-overlay">
          <div className="flex justify-between pl-16 pr-16">
            <div className="max-w-md pt-50">
              <h1 className="mb-5 text-5xl font-bold">
                Deine Balance schon gefunden?
              </h1>
              <p className="mb-5">
                Plane hier dein gesundes Leben! Fit & Vital bleiben! Mit
                <strong>ProPerc</strong> Ernährung, Sport und Gesundheit auf
                einen Blick.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => setShowSignIn(true)}>Sign in</Button>

                <Button onClick={() => setShowSignIn(false)}>Sign up</Button>
              </div>
            </div>

            {showSignUp ? <SignInPage /> : <SignUpPage />}
          </div>
        </div>
      </div>
    </>
  );
}
