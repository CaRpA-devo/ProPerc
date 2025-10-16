import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // von Clerk
  date: { type: Date, default: Date.now }, // wann der Eintrag erstellt wurde
  calories: { type: Number, required: true },
  protein: Number,
});

export const Entry = mongoose.model("Entry", EntrySchema);
