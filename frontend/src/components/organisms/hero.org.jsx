import { useEffect, useState } from "react";
import heroBg from "../../assets/img/heroFruits.jpg";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();
  const { user } = useUser(); // Clerk User
  const [loading, setLoading] = useState(false);

  // Prüfen, ob Profil existiert
  useEffect(() => {
    const checkProfile = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const res = await fetch("/api/profile/exist");
        const data = await res.json();
        navigate(data.exists ? "/dashboard" : "/setup");
      } catch (err) {
        console.error(err);
        navigate("/setup"); // Fallback
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [user, navigate]);

  return (
    <div
      className="hero min-h-screen relative overflow-hidden contrast-110 saturate-125 brightness-105"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero-overlay bg-opacity-40"></div>

      <div className="hero-content text-neutral-content w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Text */}
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
              <strong>ProPerc</strong> Ernährung, Sport und Gesundheit auf einen
              Blick.
            </p>

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

          {/* Auth */}
          <div className="flex justify-center flex-col lg:justify-end">
            <div className="w-full max-w-md">
              <div className="card bg-base-100/10 backdrop-blur-md border border-white/20 p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Starten Sie noch heute
                </h3>
                <p className="text-base-content/80 mb-6">
                  Erstelle dein kostenloses Konto und beginne deine
                  Gesundheitsreise mit personalisierten Plänen.
                </p>

                <div className="space-y-3">
                  <SignedOut>
                    <button
                      className="btn border-0 text-emerald-800 font-semibold hover:scale-105 transition-all duration-300 shadow-lg w-full"
                      style={{ backgroundColor: "#FFD166", color: "#1E3A34" }}
                      onClick={() => navigate("/signup")}
                    >
                      Kostenlos registrieren
                    </button>
                    <button
                      className="btn btn-ghost w-full"
                      onClick={() => navigate("/signin")}
                    >
                      Bereits Mitglied? Anmelden
                    </button>
                  </SignedOut>

                  <SignedIn>
                    <div className="flex flex-col items-center space-y-4">
                      <UserButton />
                      {loading ? (
                        <button className="btn btn-primary w-full" disabled>
                          Prüfe Profil...
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary w-full"
                          onClick={() =>
                            navigate(
                              user.privateMetadata?.hasProfile
                                ? "/dashboard"
                                : "/setup"
                            )
                          }
                        >
                          Weiter
                        </button>
                      )}
                    </div>
                  </SignedIn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
