import { useState } from "react";
import heroBg from "../../assets/img/heroDarkGreen.jpg";
import { SignInForm } from "../molecules/signin-form.molecule";
import { SignUpForm } from "../molecules/signup-form.molecule";

export function Hero() {
  const [activeForm, setActiveForm] = useState(null); // Fix: korrekte State-Benennung

  const handleCloseForm = () => setActiveForm(null);

  return (
    <>
      <div
        className="hero min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        {/* Hero Overlay */}
        <div className="hero-overlay bg-opacity-40"></div>

        {/* Content Container - Responsive statt feste px-Werte */}
        <div className="hero-content text-neutral-content w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Deine Balance schon gefunden?
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-neutral-content/90 max-w-lg">
                Plane hier dein gesundes Leben! Fit & Vital bleiben! Mit{" "}
                <strong className="text-secondary">ProPerc</strong> Ernährung,
                Sport und Gesundheit auf einen Blick.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setActiveForm("signup")}
                  className="btn btn-primary btn-lg"
                >
                  Jetzt starten
                </button>
                <button
                  onClick={() => setActiveForm("signin")}
                  className="btn btn-outline btn-lg"
                >
                  Anmelden
                </button>
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
                      Bereit zu starten?
                    </h3>
                    <p className="text-base-content/80 mb-6">
                      Erstellen Sie Ihr kostenloses Konto und beginnen Sie Ihre
                      Gesundheitsreise.
                    </p>
                    <div className="space-y-3">
                      <button
                        onClick={() => setActiveForm("signup")}
                        className="btn btn-primary w-full"
                      >
                        Kostenlos registrieren
                      </button>
                      <button
                        onClick={() => setActiveForm("signin")}
                        className="btn btn-ghost w-full"
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
