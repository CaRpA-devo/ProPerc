import mongoose from "mongoose";

const dailyTrackingSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    }, // Format: YYYY-MM-DD
    foods: [
      {
        id: String,
        name: String,
        calories: Number,
        protein: Number,
        fat: Number,
        carbs: Number,
        quantity: Number,
        timestamp: Date,
      },
    ],
    waterIntake: {
      type: Number,
      default: 0,
      min: 0,
      max: 20,
    },
    // Berechnete Werte für den Tag
    totalCalories: { type: Number, default: 0 },
    totalProtein: { type: Number, default: 0 },
    totalFat: { type: Number, default: 0 },
    totalCarbs: { type: Number, default: 0 },
    // Metadaten
    lastUpdated: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    // Compound Index für effiziente Abfragen
    indexes: [
      { clerkId: 1, date: 1 },
      { date: 1, isActive: 1 },
    ],
  }
);

// Pre-save Middleware um berechnete Werte zu aktualisieren
dailyTrackingSchema.pre("save", function (next) {
  if (this.foods && this.foods.length > 0) {
    this.totalCalories = this.foods.reduce(
      (sum, food) => sum + (food.calories || 0),
      0
    );
    this.totalProtein = this.foods.reduce(
      (sum, food) => sum + (food.protein || 0),
      0
    );
    this.totalFat = this.foods.reduce((sum, food) => sum + (food.fat || 0), 0);
    this.totalCarbs = this.foods.reduce(
      (sum, food) => sum + (food.carbs || 0),
      0
    );
  } else {
    this.totalCalories = 0;
    this.totalProtein = 0;
    this.totalFat = 0;
    this.totalCarbs = 0;
  }
  this.lastUpdated = new Date();
  next();
});

// Statische Methode um tägliche Daten zu finden oder zu erstellen
dailyTrackingSchema.statics.findOrCreateToday = async function (clerkId) {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD Format

  let dailyData = await this.findOne({
    clerkId,
    date: today,
    isActive: true,
  });

  if (!dailyData) {
    dailyData = new this({
      clerkId,
      date: today,
      foods: [],
      waterIntake: 0,
    });
    await dailyData.save();
  }

  return dailyData;
};

// Statische Methode um alte Daten zu deaktivieren (für 24h Reset)
dailyTrackingSchema.statics.deactivateOldData = async function () {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const result = await this.updateMany(
    {
      date: { $lt: yesterdayStr },
      isActive: true,
    },
    {
      isActive: false,
    }
  );

  console.log(`Deaktivierte ${result.modifiedCount} alte Tracking-Einträge`);
  return result;
};

export const DailyTracking = mongoose.model(
  "DailyTracking",
  dailyTrackingSchema
);
