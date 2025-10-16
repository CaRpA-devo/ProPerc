import { User } from "../models/profile.mod.js";

// BMI-Berechnung
const calculateBMI = (weight, height, weightUnit = "kg", heightUnit = "cm") => {
  if (!weight || !height) return null;

  // Gewicht in kg umrechnen
  let weightInKg = parseFloat(weight);
  if (weightUnit === "lbs") {
    weightInKg = weightInKg * 0.453592;
  }

  // Größe in Meter umrechnen
  let heightInM = parseFloat(height);
  if (heightUnit === "cm") {
    heightInM = heightInM / 100;
  } else if (heightUnit === "in") {
    heightInM = heightInM * 0.0254;
  }

  const bmi = weightInKg / (heightInM * heightInM);
  return Math.round(bmi * 10) / 10; // Auf 1 Dezimalstelle runden
};

// BMI-Kategorie bestimmen
const getBMICategory = (bmi) => {
  if (!bmi) return null;
  if (bmi < 18.5) return "Untergewichtig";
  if (bmi < 25) return "Normalgewichtig";
  if (bmi < 30) return "Übergewichtig";
  return "Stark übergewichtig";
};

export const getProfile = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({ clerkId });
    }

    // BMI berechnen und hinzufügen
    if (user.weight && user.height) {
      user.bmi = calculateBMI(
        user.weight,
        user.height,
        user.weightUnit,
        user.heightUnit
      );
      user.bmiCategory = getBMICategory(user.bmi);
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fehler beim Laden des Profils" });
  }
};

export const saveProfile = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const updates = req.body;

    console.log("Profile Controller - Saving profile for clerkId:", clerkId);
    console.log("Profile Controller - Updates:", updates);

    // BMI berechnen wenn Gewicht und Größe vorhanden sind
    if (updates.weight && updates.height) {
      updates.bmi = calculateBMI(
        updates.weight,
        updates.height,
        updates.weightUnit,
        updates.heightUnit
      );
      updates.bmiCategory = getBMICategory(updates.bmi);
      console.log("Profile Controller - Calculated BMI:", updates.bmi);
    }

    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: updates },
      { new: true, upsert: true }
    );

    console.log("Profile Controller - User saved:", !!user);
    console.log("Profile Controller - User data:", user);
    res.json(user);
  } catch (err) {
    console.error("Profile Controller - Error:", err);
    res.status(500).json({ message: "Fehler beim Speichern des Profils" });
  }
};
