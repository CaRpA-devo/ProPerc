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
    <div className="user-profile-card">
      <div className="user-profile-header flex justify-between items-center">
        <h2>Dein Profil</h2>
      </div>

      <div className="user-profile-content">
        {/* Wichtigste Daten - Horizontales Layout */}
        <div className="main-stats">
          <div className="stat-item">
            <div className="stat-value">{userData.age || "--"}</div>
            <div className="stat-label">Jahre</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              {userData.height
                ? `${userData.height} ${userData.heightUnit}`
                : "--"}
            </div>
            <div className="stat-label">Größe</div>
          </div>
          <div className="stat-item weight-item">
            <div className="stat-value">
              {userData.weight
                ? `${userData.weight} ${userData.weightUnit}`
                : "--"}
            </div>
            <div className="stat-label">Aktuell</div>
          </div>
          <div className="stat-item weight-item">
            <div className="stat-value">
              {userData.targetWeight
                ? `${userData.targetWeight} ${userData.weightUnit}`
                : "--"}
            </div>
            <div className="stat-label">Ziel</div>
          </div>
          <div className={`stat-item bmi-stat ${getBMIClass(userData.bmi)}`}>
            <div className="stat-value">{userData.bmi || "--"}</div>
            <div className="stat-label">BMI</div>
          </div>
        </div>

        {/* Weitere Informationen - Kompakt */}
        <div className="additional-info">
          <div className="info-row">
            <span className="info-label">Geschlecht:</span>
            <span className="info-value">
              {formatGender(userData.gender) || "--"}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Aktivitätsstufe:</span>
            <span className="info-value">
              {getActivityLevelLabel(userData.activityLevel) || "--"}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Ziel:</span>
            <span className="info-value">
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
            <span className="info-label ">Ernährung:</span>
            <span className="info-value">
              {formatDietType(userData.dietType) || "--"}
            </span>
          </div>
        </div>

        {/* Allergien - Kompakt */}
        {((userData.allergies && userData.allergies.length > 0) ||
          (userData.dietaryRestrictions &&
            userData.dietaryRestrictions.length > 0)) && (
          <div className="restrictions ">
            <div className="restrictions-label borderbottom ">
              Einschränkungen:
            </div>
            <div className="restrictions-tags mb-5 flex flex-wrap gap-1 items-center">
              {userData.allergies?.map((allergy, index) => (
                <span key={index} className="restriction-tag">
                  {allergy}
                </span>
              ))}
              {userData.dietaryRestrictions?.map((restriction, index) => (
                <span key={`r-${index}`} className="restriction-tag">
                  {restriction}
                </span>
              ))}
              <button
                onClick={() => navigate("/setup")}
                className="btn btn-primary btn-xs"
              >
                Profil bearbeiten
              </button>
            </div>
            <div className="  mt-1">
              <p className=" text-gray-400">
                <span className="  paragraph pt-1 mt-1 border-gray-400">
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
