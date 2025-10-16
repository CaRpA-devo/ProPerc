import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  gender: String,
  age: Number,
  weight: Number,
  goalCalories: Number,
});

export const Profile = mongoose.model("Profile", ProfileSchema);
