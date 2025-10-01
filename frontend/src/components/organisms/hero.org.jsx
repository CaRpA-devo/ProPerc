import heroBg from "../../assets/img/heroFruits.jpg";
import { useState } from "react";
import { SignInForm } from "../molecules/signin-form.molecule";
import { SignUpForm } from "../molecules/signup-form.molecule";

export function Hero() {
  const [activeForm, setActiveForm] = useState(null); // Fix: korrekte State-Benennung

  const handleCloseForm = () => setActiveForm(null);

  return (
    <>
      <div
        className="hero min-h-screen relative overflow-hidden  contrast-110 saturate-125 brightness-105"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        {/* Hero Overlay */}
        <div className="hero-overlay bg-opacity-40 "></div>

        {/* Content Container - Responsive statt feste px-Werte */}
        <div className="hero-content text-neutral-content w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                style={{ color: "#073c26" }}
              >
                Deine <span style={{ color: "#ffd166" }}>Balance</span> schon
                gefunden?
              </h1>
              <p
                className="text-lg sm:text-xl mb-8 text-neutral-content/90 max-w-lg"
                style={{ color: "#073c26" }}
              >
                Plane hier dein gesundes Leben! Fit & Vital bleiben! Mit{" "}
                <strong>ProPerc</strong> Ernährung, Sport und Gesundheit auf
                einen Blick.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                {/* Primary CTA - Yellow button with dark green text */}
                <button
                  onClick={() => setActiveForm("signup")}
                  className="btn btn-lg border-0 text-emerald-800 font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                  style={{
                    backgroundColor: "#FFD166",
                    color: "#1E3A34",
                  }}
                >
                  Jetzt starten
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5-5 5M6 12h12"
                    />
                  </svg>
                </button>

                {/* Secondary CTA - Outlined green button */}
                <button
                  onClick={() => setActiveForm("signin")}
                  className="btn btn-lg btn-ghost border-0 hover:scale-105 transition-all duration-300"
                  style={{
                    color: "#f4f4f4",
                  }}
                >
                  Anmelden
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-8 text-green-900">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-900 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    Wissenschaftlich fundiert
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-900 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    5.000+ zufriedene Nutzer
                  </span>
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="flex justify-center lg:justify-end">
              {activeForm === "signin" && (
                <div className="w-full max-w-md">
                  <SignInForm onClose={handleCloseForm} />
                </div>
              )}

              {activeForm === "signup" && (
                <div className="w-full max-w-md">
                  <SignUpForm onClose={handleCloseForm} />
                </div>
              )}

              {!activeForm && (
                <div className="hidden lg:block w-full max-w-md">
                  <div className="card bg-base-100/10 backdrop-blur-md border border-white/20 p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">
                      Starten Sie noch heute
                    </h3>
                    <p className="text-base-content/80 mb-6">
                      Erstellen Sie Ihr kostenloses Konto und beginnen Sie Ihre
                      Gesundheitsreise mit personalisierten Plänen.
                    </p>
                    <div className="space-y-3">
                      <button
                        onClick={() => setActiveForm("signup")}
                        className="btn border-0 text-emerald-800 font-semibold hover:scale-105 transition-all duration-300 shadow-lg w-full"
                        style={{
                          backgroundColor: "#FFD166",
                          color: "#1E3A34",
                        }}
                      >
                        Kostenlos registrieren
                      </button>
                      <button
                        onClick={() => setActiveForm("signin")}
                        className="btn btn-ghost w-full"
                        style={{
                          color: "#f4f4f4",
                        }}
                      >
                        Bereits Mitglied?
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
