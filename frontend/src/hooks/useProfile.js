import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";

export function useProfile(navigate) {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    heightUnit: "cm",
    weight: "",
    weightUnit: "kg",
    targetWeight: "",
    activityLevel: "",
    goal: "maintain",
    dietType: "omnivore",
    allergies: [],
    dietaryRestrictions: [],
  });

  // Profile laden
  useEffect(() => {
    const load = async () => {
      if (!isLoaded || !user) return;

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

        const text = await res.text();

        if (!res.ok) {
          // Backend returned an error (e.g. 500). Log the status and body and do not try to parse as profile JSON.
          console.error(
            "Backend Fehler beim Laden des Profils:",
            res.status,
            text
          );
          return;
        }

        if (text) {
          try {
            const data = JSON.parse(text);

            // Normalisierung von Backend-Werten auf Frontend-Formdaten
            const normalizeGoal = (goal) => {
              if (!goal) return "maintain";
              if (goal === "muscle_gain") return "gain";
              if (goal === "weight_loss") return "lose";
              if (["lose", "maintain", "gain"].includes(goal)) return goal;
              return "maintain";
            };

            const normalizeActivityLevel = (value) => {
              if (!value) return "";
              // Bereits einer der erwarteten Keys
              const known = [
                "sedentary",
                "light",
                "moderate",
                "active",
                "very_active",
              ];
              if (known.includes(value)) return value;
              // Numerische/faktorische Werte (z.B. "1.55") in Keys mappen
              const n = parseFloat(value);
              if (Number.isFinite(n)) {
                if (n <= 1.3) return "sedentary";
                if (n <= 1.5) return "light";
                if (n <= 1.7) return "moderate";
                if (n <= 1.9) return "active";
                return "very_active";
              }
              return "";
            };

            const normalized = {
              ...data,
              goal: normalizeGoal(data.goal),
              activityLevel: normalizeActivityLevel(data.activityLevel),
            };

            setFormData((prev) => ({ ...prev, ...normalized }));
          } catch {
            console.error("Backend liefert kein JSON:", text);
          }
        }
      } catch (err) {
        console.error("Fetch Fehler:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, isLoaded, getToken]);

  // Input ändern
  const handleInputChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleAllergyToggle = (allergy) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  };

  const nextStep = async () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
    else await saveProfile();
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return formData.gender && formData.age;
      case 2:
        return formData.height && formData.weight;
      case 3:
        return formData.activityLevel;
      case 4:
        return formData.dietType;
      case 5:
        return true;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const saveProfile = async () => {
    try {
      console.log("useProfile - Saving profile with data:", formData);
      const token = await getToken();
      const url = `${
        import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
      }/api/profile/settings`;
      console.log("useProfile - Saving to URL:", url);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      console.log("useProfile - Response status:", res.status);

      if (res.ok) {
        const savedData = await res.json();
        console.log("useProfile - Profile saved successfully:", savedData);
        if (typeof navigate === "function") {
          navigate("/dashboard");
        } else {
          console.warn("navigate function is not available, not redirecting");
        }
      } else {
        const errorText = await res.text();
        console.error(
          "useProfile - Error saving profile:",
          res.status,
          errorText
        );
      }
    } catch (err) {
      console.error("useProfile - Exception:", err);
    }
  };

  const saveAndGoBack = async () => {
    try {
      console.log(
        "useProfile - Saving profile and going back with data:",
        formData
      );
      const token = await getToken();
      const url = `${
        import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
      }/api/profile/settings`;
      console.log("useProfile - Saving to URL:", url);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      console.log("useProfile - Response status:", res.status);

      if (res.ok) {
        const savedData = await res.json();
        console.log("useProfile - Profile saved successfully:", savedData);
        if (typeof navigate === "function") {
          navigate("/dashboard");
        } else {
          console.warn("navigate function is not available, not redirecting");
        }
      } else {
        const errorText = await res.text();
        console.error(
          "useProfile - Error saving profile:",
          res.status,
          errorText
        );
      }
    } catch (err) {
      console.error("useProfile - Exception:", err);
    }
  };

  return {
    loading,
    currentStep,
    totalSteps,
    formData,
    userData: formData, // Export formData as userData for compatibility
    handleInputChange,
    handleAllergyToggle,
    nextStep,
    prevStep,
    isStepComplete,
    saveAndGoBack,
  };
}
