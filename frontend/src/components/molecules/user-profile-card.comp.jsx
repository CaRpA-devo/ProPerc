import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./user-profile-card.style.css";

export function UserProfileCard() {
  const { userData } = useUser();
  const navigate = useNavigate();
  
  // Funktion zur Formatierung der Aktivitätsstufe
  const getActivityLevelLabel = (level) => {
    switch(level) {
      case 'sedentary': return 'Sitzend';
      case 'light': return 'Leicht aktiv';
      case 'moderate': return 'Mäßig aktiv';
      case 'active': return 'Sehr aktiv';
      case 'very_active': return 'Extrem aktiv';
      default: return 'Nicht angegeben';
    }
  };

  // Funktion zur Bestimmung der BMI-Klasse
  const getBMIClass = (bmi) => {
    if (!bmi) return '';
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return 'bmi-untergewichtig';
    if (bmiValue < 25) return 'bmi-normalgewichtig';
    if (bmiValue < 30) return 'bmi-uebergewichtig';
    return 'bmi-stark-uebergewichtig';
  };

  // Funktion zur Formatierung des Geschlechts
  const formatGender = (gender) => {
    switch(gender) {
      case 'male': return 'Männlich';
      case 'female': return 'Weiblich';
      case 'diverse': return 'Divers';
      default: return 'Nicht angegeben';
    }
  };

  return (
    <div className="user-profile-card">
      <div className="user-profile-header flex justify-between items-center">
        <h2>Dein Profil</h2>
        <button 
          onClick={() => navigate('/onboarding')}
          className="btn btn-primary btn-sm"
        >
          Profil bearbeiten
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Persönliche Daten */}
        <div className="user-profile-section">
          <h3>Persönliche Daten</h3>
          <div className="space-y-3">
            <div className="user-detail">
              <span className="detail-label">Geschlecht:</span>
              <span className="detail-value">{formatGender(userData.gender) || 'Nicht angegeben'}</span>
            </div>
            <div className="user-detail">
              <span className="detail-label">Alter:</span>
              <span className="detail-value">{userData.age || 'Nicht angegeben'}</span>
            </div>
            <div className="user-detail">
              <span className="detail-label">Größe:</span>
              <span className="detail-value">
                {userData.height ? `${userData.height} ${userData.heightUnit}` : 'Nicht angegeben'}
              </span>
            </div>
            <div className="user-detail">
              <span className="detail-label">Gewicht:</span>
              <span className="detail-value">
                {userData.weight ? `${userData.weight} ${userData.weightUnit}` : 'Nicht angegeben'}
              </span>
            </div>
          </div>
        </div>

        {/* Gesundheitsdaten */}
        <div className="user-profile-section">
          <h3>Gesundheitsdaten</h3>
          <div className="space-y-3">
            <div className={`bmi-display ${getBMIClass(userData.bmi)}`}>
              <div className="font-bold text-lg">{userData.bmi || '--'}</div>
              <div className="text-sm">
                {userData.bmiCategory ? `(${userData.bmiCategory})` : 'BMI'}
              </div>
            </div>
            
            <div className="user-detail">
              <span className="detail-label">Aktivitätslevel:</span>
              <span className="detail-value">
                {getActivityLevelLabel(userData.activityLevel) || 'Nicht angegeben'}
              </span>
            </div>
            <div className="user-detail">
              <span className="detail-label">Ziel:</span>
              <span className="detail-value">
                {userData.goal === 'lose' ? 'Gewicht verlieren' : 
                 userData.goal === 'gain' ? 'Muskelmasse aufbauen' : 
                 userData.goal ? 'Gewicht halten' : 'Nicht angegeben'}
              </span>
            </div>
          </div>
        </div>

        {/* Allergien & Einschränkungen */}
        {(userData.allergies?.length > 0 || userData.dietaryRestrictions?.length > 0) && (
          <div className="user-profile-section md:col-span-2">
            <h3>Allergien & Einschränkungen</h3>
            <div className="tags-container">
              {userData.allergies?.map((allergy, index) => (
                <span key={index} className="tag tag-allergy">
                  {allergy}
                </span>
              ))}
              {userData.dietaryRestrictions?.map((restriction, index) => (
                <span key={`r-${index}`} className="tag tag-diet">
                  {restriction}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700/30">
        <p className="text-sm text-gray-400">
          Du kannst deine Daten jederzeit in den Einstellungen aktualisieren.
        </p>
      </div>
    </div>
  );
}
