import { DashboardLayout } from "../layouts/dashboard.layout.jsx";
import { SectionWrapper } from "../atoms/sectionwrapper.comp.jsx";
import { Button } from "../atoms/button.comp.jsx";
import { useProfile } from "../../hooks/useProfile.js";
import { useNavigate } from "react-router-dom";

const ALLERGY_OPTIONS = [
  "Laktose",
  "Gluten",
  "Nüsse",
  "Schalentiere",
  "Soja",
  "Eier",
  "Fisch",
  "Sesam",
  "Keine",
];
const ACTIVITY_LEVELS = [
  { value: "sedentary", label: "Sitzend (kaum oder keine Bewegung)" },
  { value: "light", label: "Leicht aktiv (1-3 Tage/Woche)" },
  { value: "moderate", label: "Mäßig aktiv (3-5 Tage/Woche)" },
  { value: "active", label: "Sehr aktiv (6-7 Tage/Woche)" },
  { value: "very_active", label: "Extrem aktiv" },
];

const DIET_TYPES = [
  { value: "omnivore", label: "Allesesser (Omnivor)" },
  { value: "vegetarian", label: "Vegetarisch" },
  { value: "vegan", label: "Vegan" },
  { value: "pescatarian", label: "Pescetarisch (Fisch + Vegetarisch)" },
  { value: "keto", label: "Ketogen" },
  { value: "paleo", label: "Paleo" },
  { value: "mediterranean", label: "Mittelmeerküche" },
  { value: "flexitarian", label: "Flexitarisch" },
];

export function SetupPage() {
  const navigate = useNavigate();
  const {
    loading,
    currentStep,
    totalSteps,
    formData,
    handleInputChange,
    handleAllergyToggle,
    nextStep,
    prevStep,
    isStepComplete,
    saveAndGoBack,
  } = useProfile(navigate);

  if (loading) return <p>Lade Profil...</p>;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 ">
            <h2 className="text-xl  font-semibold">Persönliche Daten</h2>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Geschlecht auswählen</option>
              <option value="female">Weiblich</option>
              <option value="male">Männlich</option>
              <option value="diverse">Divers</option>
            </select>
            <input
              type="number"
              min="12"
              max="120"
              value={formData.age}
              placeholder="Alter"
              className="input input-bordered w-full"
              onChange={(e) => handleInputChange("age", e.target.value)}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Körpermaße</h2>
            <div className="flex gap-2">
              <input
                type="number"
                value={formData.height}
                placeholder="Größe"
                className="input input-bordered w-3/4"
                onChange={(e) => handleInputChange("height", e.target.value)}
              />
              <select
                value={formData.heightUnit}
                onChange={(e) =>
                  handleInputChange("heightUnit", e.target.value)
                }
                className="select select-bordered w-1/4"
              >
                <option value="cm">cm</option>
                <option value="in">in</option>
              </select>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={formData.weight}
                placeholder="Aktuelles Gewicht"
                className="input input-bordered w-3/4"
                onChange={(e) => handleInputChange("weight", e.target.value)}
              />
              <select
                value={formData.weightUnit}
                onChange={(e) =>
                  handleInputChange("weightUnit", e.target.value)
                }
                className="select select-bordered w-1/4"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={formData.targetWeight}
                placeholder="Zielgewicht"
                className="input input-bordered w-3/4"
                onChange={(e) =>
                  handleInputChange("targetWeight", e.target.value)
                }
              />
              <select
                value={formData.weightUnit}
                onChange={(e) =>
                  handleInputChange("weightUnit", e.target.value)
                }
                className="select select-bordered w-1/4"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Aktivitätslevel</h2>
            {ACTIVITY_LEVELS.map((level) => (
              <label
                key={level.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  className="radio radio-primary"
                  checked={formData.activityLevel === level.value}
                  onChange={() =>
                    handleInputChange("activityLevel", level.value)
                  }
                />
                {level.label}
              </label>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Ernährungsweise</h2>
            {DIET_TYPES.map((diet) => (
              <label
                key={diet.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  className="radio radio-primary"
                  checked={formData.dietType === diet.value}
                  onChange={() => handleInputChange("dietType", diet.value)}
                />
                {diet.label}
              </label>
            ))}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Ernährungsziel</h2>
            {["lose", "maintain", "gain"].map((goal) => (
              <label
                key={goal}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  checked={formData.goal === goal}
                  onChange={() => handleInputChange("goal", goal)}
                  className="radio radio-primary"
                />
                {goal === "lose"
                  ? "Gewicht verlieren"
                  : goal === "gain"
                  ? "Muskelmasse aufbauen"
                  : "Gewicht halten"}
              </label>
            ))}
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Allergien & Einschränkungen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ALLERGY_OPTIONS.map((allergy) => (
                <label
                  key={allergy}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={formData.allergies.includes(allergy)}
                    onChange={() => handleAllergyToggle(allergy)}
                  />
                  {allergy}
                </label>
              ))}
            </div>
            <textarea
              placeholder="Weitere Einschränkungen (z.B. vegan)"
              className="textarea textarea-bordered w-full"
              value={formData.dietaryRestrictions.join(", ")}
              onChange={(e) =>
                handleInputChange(
                  "dietaryRestrictions",
                  e.target.value.split(",").map((s) => s.trim())
                )
              }
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <SectionWrapper className="py-12 px-4">
        <div className="w-full mx-100 bg-base-200 rounded-xl p-6 shadow-md">
          <div className="w-full bg-base-100 rounded-full h-2.5 mb-6">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          {renderStep()}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Zurück
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={saveAndGoBack}>
                Speichern & Zurück
              </Button>
              <Button
                onClick={nextStep}
                disabled={!isStepComplete(currentStep)}
              >
                {currentStep === totalSteps ? "Abschließen" : "Weiter"}
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </DashboardLayout>
  );
}
