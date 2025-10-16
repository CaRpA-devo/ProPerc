import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    gender: String,
    age: Number,
    height: Number,
    heightUnit: { type: String, default: "cm" },
    weight: Number,
    weightUnit: { type: String, default: "kg" },
    targetWeight: Number,
    activityLevel: String,
    goal: { type: String, default: "maintain" },
    dietType: { type: String, default: "omnivore" },
    allergies: [String],
    dietaryRestrictions: [String],
    bmi: Number,
    bmiCategory: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
