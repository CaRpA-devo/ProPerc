import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    mealType: {
      type: String,
      required: true,
      enum: ["breakfast", "lunch", "dinner", "snack"],
    },
    food: {
      foodId: String,
      name: String,
      portion: Number,
      unit: String,
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      source: {
        type: String,
        enum: ["favorite", "search", "custom"],
        required: true,
      },
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Compound index für effiziente Abfragen nach User und Datum
mealPlanSchema.index({ userId: 1, date: 1 });

export const MealPlan = mongoose.model("MealPlan", mealPlanSchema);
