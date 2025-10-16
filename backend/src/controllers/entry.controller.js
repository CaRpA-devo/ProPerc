import { Entry } from "../models/entry.mod.js";

// 📥 Eintrag speichern
export const addEntry = async (req, res) => {
  const { calories, protein } = req.body;

  const entry = new Entry({
    userId: req.userId,
    calories,
    protein,
  });

  await entry.save();
  res.json(entry);
};

// 📤 Alle Einträge des Benutzers holen
export const getEntries = async (req, res) => {
  const entries = await Entry.find({ userId: req.userId }).sort({ date: 1 });
  res.json(entries);
};
