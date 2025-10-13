import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../atoms/button.comp";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { useUser } from "../../context/UserContext";

// Constants
const ALLERGY_OPTIONS = [
  'Laktose', 
  'Gluten', 
  'Nüsse', 
  'Schalentiere', 
  'Soja', 
  'Eier', 
  'Fisch', 
  'Sesam'
];

const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sitzend (kaum oder keine Bewegung)' },
  { value: 'light', label: 'Leicht aktiv (leichte Bewegung 1-3 Tage/Woche)' },
  { value: 'moderate', label: 'Mäßig aktiv (mäßige Bewegung 3-5 Tage/Woche)' },
  { value: 'active', label: 'Sehr aktiv (intensives Training 6-7 Tage/Woche)' },
  { value: 'very_active', label: 'Extrem aktiv (sehr anstrengendes Training oder körperliche Arbeit)' }
];

export function StartSettingsUserPage() {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: userData.gender || '',
    age: userData.age || '',
    height: userData.height || '',
    heightUnit: userData.heightUnit || 'cm',
    weight: userData.weight || '',
    weightUnit: userData.weightUnit || 'kg',
    activityLevel: userData.activityLevel || '',
    goal: userData.goal || 'maintain',
    allergies: userData.allergies || [],
    dietaryRestrictions: userData.dietaryRestrictions || []
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    // Aktualisiere den Kontext mit den neuen Daten
    updateUserData(newData);
  };

  const handleAllergyToggle = (allergy) => {
    const newAllergies = formData.allergies.includes(allergy)
      ? formData.allergies.filter(a => a !== allergy)
      : [...formData.allergies, allergy];
    const newData = { ...formData, allergies: newAllergies };
    setFormData(newData);
    updateUserData(newData);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Speichere alle Daten im Kontext
      updateUserData(formData);
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateBMI = () => {
    if (!formData.height || !formData.weight) return { value: null, category: '' };
    
    const heightInM = formData.heightUnit === 'cm' 
      ? formData.height / 100 
      : formData.height * 2.54 / 100;
    
    const weightInKg = formData.weightUnit === 'kg' 
      ? formData.weight 
      : formData.weight * 0.453592;
    
    const bmiValue = (weightInKg / (heightInM * heightInM)).toFixed(1);
    
    // BMI Kategorien
    let category = '';
    if (bmiValue < 18.5) {
      category = 'untergewichtig';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = 'normalgewichtig';
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = 'übergewichtig';
    } else {
      category = 'stark übergewichtig';
    }
    
    return { value: bmiValue, category };
  };
  
  const getBMIColor = (bmi) => {
    if (!bmi || !bmi.value) return 'bg-base-200';
    const bmiValue = parseFloat(bmi.value);
    
    if (bmiValue < 18.5) return 'bg-blue-100/70';
    if (bmiValue < 25) return 'bg-green-100/70';
    if (bmiValue < 30) return 'bg-yellow-100/70';
    return 'bg-red-100/70';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Persönliche Daten</h2>
            
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Geschlecht</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              >
                <option value="">Bitte auswählen</option>
                <option value="female">Weiblich</option>
                <option value="male">Männlich</option>
                <option value="diverse">Divers</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Alter</span>
              </label>
              <input
                type="number"
                min="12"
                max="120"
                className="input input-bordered w-full"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Körpermaße</h2>
            
            <div className="flex gap-4">
              <div className="form-control w-3/4">
                <label className="label">
                  <span className="label-text">Größe</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                  />
                  <select 
                    className="select select-bordered w-1/4"
                    value={formData.heightUnit}
                    onChange={(e) => handleInputChange('heightUnit', e.target.value)}
                  >
                    <option value="cm">cm</option>
                    <option value="in">in</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="form-control w-3/4">
                <label className="label">
                  <span className="label-text">Gewicht</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                  />
                  <select 
                    className="select select-bordered w-1/4"
                    value={formData.weightUnit}
                    onChange={(e) => handleInputChange('weightUnit', e.target.value)}
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>
            </div>

            {formData.height && formData.weight && (() => {
              const bmi = calculateBMI();
              return (
                <div className={`mt-4 p-4 rounded-lg ${getBMIColor(bmi)} transition-colors duration-300`}>
                  <p className="text-center">
                    Dein BMI: <span className="font-bold">{bmi.value}</span>
                    {bmi.category && (
                      <span className="ml-2 text-sm">({bmi.category})</span>
                    )}
                  </p>
                </div>
              );
            })()}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Aktivitätslevel</h2>
            <p className="text-sm text-base-content/70">
              Wähle aus, wie aktiv du im Alltag bist.
            </p>
            
            <div className="space-y-2">
              {ACTIVITY_LEVELS.map((level) => (
                <div key={level.value} className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="radio"
                      name="activityLevel"
                      className="radio radio-primary"
                      checked={formData.activityLevel === level.value}
                      onChange={() => handleInputChange('activityLevel', level.value)}
                    />
                    <span className="label-text">{level.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Ernährungsziele</h2>
            <p className="text-sm text-base-content/70">
              Was möchtest du erreichen?
            </p>
            
            <div className="space-y-2">
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="radio"
                    name="goal"
                    className="radio radio-primary"
                    checked={formData.goal === 'lose'}
                    onChange={() => handleInputChange('goal', 'lose')}
                  />
                  <span className="label-text">Gewicht verlieren</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="radio"
                    name="goal"
                    className="radio radio-primary"
                    checked={formData.goal === 'maintain'}
                    onChange={() => handleInputChange('goal', 'maintain')}
                  />
                  <span className="label-text">Gewicht halten</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="radio"
                    name="goal"
                    className="radio radio-primary"
                    checked={formData.goal === 'gain'}
                    onChange={() => handleInputChange('goal', 'gain')}
                  />
                  <span className="label-text">Muskelmasse aufbauen</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Allergien & Unverträglichkeiten</h2>
            <p className="text-sm text-base-content/70">
              Wähle aus, welche Lebensmittel du nicht verträgst.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ALLERGY_OPTIONS.map((allergy) => (
                <div key={allergy} className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.allergies.includes(allergy)}
                      onChange={() => handleAllergyToggle(allergy)}
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text">{allergy}</span>
                  </label>
                </div>
              ))}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Weitere Ernährungsbeschränkungen (optional)</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Zum Beispiel: Vegetarisch, Vegan, Halal, etc."
                value={formData.dietaryRestrictions.join(', ')}
                onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value.split(',').map(s => s.trim()))}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Willkommen bei ProPerc</h1>
          <p className="text-base-content/70">
            Bitte gib uns einige Informationen, um dein persönliches Erlebnis zu gestalten.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-base-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-right text-base-content/70">
          Schritt {currentStep} von {totalSteps}
        </p>

        {/* Form Content */}
        <div className="bg-base-100 rounded-lg shadow-lg p-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Zurück
          </Button>
          
          <Button 
            onClick={nextStep}
            disabled={!isStepComplete(currentStep)}
          >
            {currentStep === totalSteps ? 'Abschließen' : 'Weiter'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );

  function isStepComplete(step) {
    switch(step) {
      case 1:
        return formData.gender && formData.age;
      case 2:
        return formData.height && formData.weight;
      case 3:
        return formData.activityLevel;
      case 4:
        return true; // Goal selection is optional
      case 5:
        return true; // Allergies are optional
      default:
        return false;
    }
  }
}

export default StartSettingsUserPage;
