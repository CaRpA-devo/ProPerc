import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./user-profile-card.style.css";

export function UserProfileCard() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  // Profildaten vom Backend laden
  useEffect(() => {
    const loadProfile = async () => {
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
          const data = await res.json();
          setUserData(data);
        } else {
          console.error("Fehler beim Laden des Profils:", res.status);
        }
      } catch (err) {
        console.error("Fetch Fehler:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, isLoaded, getToken]);

  // Funktion zur Formatierung der Aktivitätsstufe
  const getActivityLevelLabel = (level) => {
    switch (level) {
      case "sedentary":
        return "Sitzend";
      case "light":
        return "Leicht aktiv";
      case "moderate":
        return "Mäßig aktiv";
      case "active":
        return "Sehr aktiv";
      case "very_active":
        return "Extrem aktiv";
      default:
        return "Nicht angegeben";
    }
  };

  // Funktion zur Bestimmung der BMI-Klasse
  const getBMIClass = (bmi) => {
    if (!bmi) return "";
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return "bmi-untergewichtig";
    if (bmiValue < 25) return "bmi-normalgewichtig";
    if (bmiValue < 30) return "bmi-uebergewichtig";
    return "bmi-stark-uebergewichtig";
  };

  // Funktion zur Formatierung des Geschlechts
  const formatGender = (gender) => {
    switch (gender) {
      case "male":
        return "Männlich";
      case "female":
        return "Weiblich";
      case "diverse":
        return "Divers";
      default:
        return "Nicht angegeben";
    }
  };

  // Funktion zur Formatierung der Ernährungsweise
  const formatDietType = (dietType) => {
    switch (dietType) {
      case "omnivore":
        return "Allesesser";
      case "vegetarian":
        return "Vegetarisch";
      case "vegan":
        return "Vegan";
      case "pescatarian":
        return "Pescetarisch";
      case "keto":
        return "Ketogen";
      case "paleo":
        return "Paleo";
      case "mediterranean":
        return "Mittelmeerküche";
      case "flexitarian":
        return "Flexitarisch";
      default:
        return "Nicht angegeben";
    }
  };

  if (loading) {
    return (
      <div className="user-profile-card">
        <div className="flex justify-center items-center h-32">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-card bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30 rounded-lg">
      <div className="user-profile-header flex justify-between items-center">
        <h2 className="text-white">👤 Dein Profil</h2>
      </div>

      <div className="user-profile-content">
        {/* Wichtigste Daten - Horizontales Layout */}
        <div className="main-stats">
          <div className="stat-item">
            <div className="stat-value text-white">{userData.age || "--"}</div>
            <div className="stat-label text-white/80">Jahre</div>
          </div>
          <div className="stat-item">
            <div className="stat-value text-white">
              {userData.height
                ? `${userData.height} ${userData.heightUnit}`
                : "--"}
            </div>
            <div className="stat-label text-white/80">Größe</div>
          </div>
          <div className="stat-item weight-item">
            <div className="stat-value text-white">
              {userData.weight
                ? `${userData.weight} ${userData.weightUnit}`
                : "--"}
            </div>
            <div className="stat-label text-white/80">Aktuell</div>
          </div>
          <div className="stat-item weight-item">
            <div className="stat-value text-white">
              {userData.targetWeight
                ? `${userData.targetWeight} ${userData.weightUnit}`
                : "--"}
            </div>
            <div className="stat-label text-white/80">Ziel</div>
          </div>
          <div className={`stat-item bmi-stat ${getBMIClass(userData.bmi)}`}>
            <div className="stat-value text-white">{userData.bmi || "--"}</div>
            <div className="stat-label text-white/80">BMI</div>
          </div>
        </div>

        {/* Weitere Informationen - Kompakt */}
        <div className="additional-info">
          <div className="info-row">
            <span className="info-label text-white/80">Geschlecht:</span>
            <span className="info-value text-white">
              {formatGender(userData.gender) || "--"}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label text-white/80">Aktivitätsstufe:</span>
            <span className="info-value text-white">
              {getActivityLevelLabel(userData.activityLevel) || "--"}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label text-white/80">Ziel:</span>
            <span className="info-value text-white">
              {userData.goal === "lose"
                ? "Abnehmen"
                : userData.goal === "gain"
                ? "Zunehmen"
                : userData.goal
                ? "Halten"
                : "--"}
            </span>
          </div>
          <div className="info-row ">
            <span className="info-label text-white/80">Ernährung:</span>
            <span className="info-value text-white">
              {formatDietType(userData.dietType) || "--"}
            </span>
          </div>
        </div>

        {/* Allergien - Kompakt */}
        {((userData.allergies && userData.allergies.length > 0) ||
          (userData.dietaryRestrictions &&
            userData.dietaryRestrictions.length > 0)) && (
          <div className="restrictions ">
            <div className="restrictions-label borderbottom text-white/80">
              Einschränkungen:
            </div>
            <div className="restrictions-tags mb-5 flex flex-wrap gap-1 items-center">
              {userData.allergies?.map((allergy, index) => (
                <span
                  key={index}
                  className="restriction-tag bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                >
                  {allergy}
                </span>
              ))}
              {userData.dietaryRestrictions?.map((restriction, index) => (
                <span
                  key={`r-${index}`}
                  className="restriction-tag bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                >
                  {restriction}
                </span>
              ))}
              <button
                onClick={() => navigate("/setup")}
                className="btn bg-green-500/20 backdrop-blur-sm border border-green-500/30 text-green-400 hover:bg-green-500/30 btn-xs"
              >
                Profil bearbeiten
              </button>
            </div>
            <div className="  mt-1">
              <p className=" text-white/60">
                <span className="  paragraph pt-1 mt-1 border-white/30">
                  Du kannst jederzeit deine Eingaben im Profil bearbeiten
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
