import { useUser } from "../../context/UserContext";

export function UserProfileCard() {
  const { userData } = useUser();
  
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

  // Funktion zur Bestimmung der BMI-Farbe
  const getBMIColor = (bmi) => {
    if (!bmi) return 'bg-base-200';
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return 'bg-blue-100/70';
    if (bmiValue < 25) return 'bg-green-100/70';
    if (bmiValue < 30) return 'bg-yellow-100/70';
    return 'bg-red-100/70';
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
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-emerald-900 mb-4">Dein Profil</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Persönliche Daten */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-emerald-800">Persönliche Daten</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Geschlecht:</span> {formatGender(userData.gender)}</p>
            <p><span className="font-medium">Alter:</span> {userData.age || 'Nicht angegeben'}</p>
            <p>
              <span className="font-medium">Größe:</span> {userData.height} {userData.heightUnit}
            </p>
            <p>
              <span className="font-medium">Gewicht:</span> {userData.weight} {userData.weightUnit}
            </p>
          </div>
        </div>

        {/* Gesundheitsdaten */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-emerald-800">Gesundheitsdaten</h3>
          <div className="space-y-2">
            <div className={`p-3 rounded-lg ${getBMIColor(userData.bmi)}`}>
              <p className="font-medium">BMI: <span className="font-bold">{userData.bmi || 'Nicht berechenbar'}</span></p>
              {userData.bmiCategory && (
                <p className="text-sm">Kategorie: {userData.bmiCategory}</p>
              )}
            </div>
            <p>
              <span className="font-medium">Aktivitätslevel:</span> {getActivityLevelLabel(userData.activityLevel)}
            </p>
            <p>
              <span className="font-medium">Ziel:</span> 
              {userData.goal === 'lose' ? 'Gewicht verlieren' : 
               userData.goal === 'gain' ? 'Muskelmasse aufbauen' : 
               'Gewicht halten'}
            </p>
          </div>
        </div>

        {/* Allergien & Einschränkungen */}
        {(userData.allergies?.length > 0 || userData.dietaryRestrictions?.length > 0) && (
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-3 text-emerald-800">Allergien & Einschränkungen</h3>
            <div className="flex flex-wrap gap-2">
              {userData.allergies?.map((allergy, index) => (
                <span key={index} className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full">
                  {allergy}
                </span>
              ))}
              {userData.dietaryRestrictions?.map((restriction, index) => (
                <span key={`r-${index}`} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {restriction}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Du kannst deine Daten jederzeit in den Einstellungen aktualisieren.
        </p>
      </div>
    </div>
  );
}
