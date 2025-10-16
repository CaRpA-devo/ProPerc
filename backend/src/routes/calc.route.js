import express from "express";
import { requireAuth } from "../middelwares/clerkauth.js";

const router = express.Router();

function calcBMR({ sex, weight, height, age }) {
  if (sex === "male") {
    // BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    // female
    return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }
}

router.post("/", requireAuth, (req, res) => {
  try {
    console.log("Calc Route - Received request body:", req.body);
    const {
      weight, // kg
      height, // cm
      age, // years
      sex = "male", // 'male' | 'female'
      activityFactor = 1.55, // default moderat
      goal = "muscle_gain", // 'muscle_gain'|'lose'|'maintain'
      proteinFactor = 2.0, // g/kg, default 2.0 for muscle gain
      fatPercent = 0.22, // percent of calories for fat (e.g. 0.22)
    } = req.body;

    console.log("Calc Route - Parsed values:", {
      weight,
      height,
      age,
      sex,
      activityFactor,
      goal,
      proteinFactor,
      fatPercent,
    });

    if (!weight || !height || !age) {
      return res.status(400).json({ error: "weight, height and age required" });
    }

    // 1) BMR
    const bmr = calcBMR({ sex, weight, height, age });

    // 2) TDEE
    const tdee = bmr * activityFactor;

    // 3) calorie target by goal
    let calorieTarget = tdee;
    if (goal === "muscle_gain") calorieTarget = Math.round(tdee + 400); // Mittelwert +400
    if (goal === "lose") calorieTarget = Math.round(tdee - 500);
    if (goal === "maintain") calorieTarget = Math.round(tdee);

    // 4) protein grams
    const protein_g = Math.round(weight * proteinFactor);

    // 5) protein calories
    const protein_cals = protein_g * 4;

    // 6) fat calories & grams
    const fat_cals = Math.round(calorieTarget * fatPercent);
    const fat_g = Math.round(fat_cals / 9);

    // 7) carbs calories & grams (rest)
    const remaining_cals = calorieTarget - (protein_cals + fat_cals);
    const carbs_g = Math.round(remaining_cals / 4);

    // 8) percentages (for charts)
    const protein_percent = +((protein_cals / calorieTarget) * 100).toFixed(1);
    const fat_percent = +((fat_cals / calorieTarget) * 100).toFixed(1);
    const carbs_percent = +((remaining_cals / calorieTarget) * 100).toFixed(1);

    console.log("Calc Route - Calculated percentages:", {
      protein_percent,
      fat_percent,
      carbs_percent,
    });
    console.log("Calc Route - Calculated grams:", {
      protein_g,
      fat_g,
      carbs_g,
    });
    console.log("Calc Route - Calculated calories:", {
      protein_cals,
      fat_cals,
      remaining_cals,
      calorieTarget,
    });

    const result = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calorieTarget,
      macros: {
        protein: {
          g: protein_g,
          calories: protein_cals,
          percent: protein_percent,
        },
        fat: { g: fat_g, calories: fat_cals, percent: fat_percent },
        carbs: { g: carbs_g, calories: remaining_cals, percent: carbs_percent },
      },
    };

    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

export default router;
