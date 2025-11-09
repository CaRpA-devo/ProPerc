import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export function SetupGuard({ children }) {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [isSetupComplete, setIsSetupComplete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSetupStatus = async () => {
      if (!isLoaded || !user) {
        setLoading(false);
        return;
      }

      try {
        const token = await getToken();
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile/me`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const profileData = await res.json();

          // Prüfen ob alle wichtigen Felder ausgefüllt sind
          const hasBasicInfo = profileData.gender && profileData.age;
          const hasBodyInfo = profileData.height && profileData.weight;
          const hasActivityInfo = profileData.activityLevel;

          const setupComplete = hasBasicInfo && hasBodyInfo && hasActivityInfo;
          setIsSetupComplete(setupComplete);

          // Wenn Setup nicht abgeschlossen, zur Setup-Seite weiterleiten
          if (!setupComplete) {
            navigate("/setup");
            return;
          }
        } else {
          // Wenn kein Profil existiert, zur Setup-Seite weiterleiten
          navigate("/setup");
          return;
        }
      } catch (err) {
        console.error("Fehler beim Prüfen des Setup-Status:", err);
        navigate("/setup");
        return;
      } finally {
        setLoading(false);
      }
    };

    checkSetupStatus();
  }, [user, isLoaded, getToken, navigate]);

  // Loading-Spinner anzeigen
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Wenn Setup nicht abgeschlossen, nichts anzeigen (Weiterleitung läuft)
  if (isSetupComplete === false) {
    return null;
  }

  // Wenn Setup abgeschlossen, Kinder-Komponenten rendern
  return children;
}
