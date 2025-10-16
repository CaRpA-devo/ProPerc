import { Profile } from "../models/profile.mod.js";

export const getProfile = async (req, res) => {
  const profile = await Profile.findOne({ userId: req.userId });
  res.json(profile);
};

export const saveProfile = async (req, res) => {
  const { gender, age, weight, goalCalories } = req.body;
  const profile = await Profile.findOneAndUpdate(
    { userId: req.userId },
    { gender, age, weight, goalCalories },
    { upsert: true, new: true }
  );
  res.json(profile);
};
