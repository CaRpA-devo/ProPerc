import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    // Metadaten
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    // Compound Index für effiziente Abfragen
    indexes: [
      { clerkId: 1, name: 1 }, // Eindeutigkeit pro User
    ],
  }
);

// Eindeutigkeit pro User und Name sicherstellen
favoriteSchema.index({ clerkId: 1, name: 1 }, { unique: true });

// Statische Methode um Favoriten eines Users zu finden
favoriteSchema.statics.findByUser = async function (clerkId) {
  return await this.find({ clerkId }).sort({ createdAt: -1 });
};

// Statische Methode um einen Favoriten hinzuzufügen
favoriteSchema.statics.addFavorite = async function (clerkId, foodData) {
  try {
    const favorite = new this({
      clerkId,
      name: foodData.name,
      calories: foodData.calories || 0,
      protein: foodData.protein || 0,
      fat: foodData.fat || 0,
      carbs: foodData.carbs || 0,
    });
    return await favorite.save();
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error - Favorit existiert bereits
      throw new Error("Favorit existiert bereits");
    }
    throw error;
  }
};

// Statische Methode um einen Favoriten zu entfernen
favoriteSchema.statics.removeFavorite = async function (clerkId, foodName) {
  return await this.findOneAndDelete({ clerkId, name: foodName });
};

export const Favorite = mongoose.model("Favorite", favoriteSchema);
