import React, { createContext, useContext, useState, useEffect } from "react";

const FoodContext = createContext();

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
};

export const FoodProvider = ({ children }) => {
  const [todayFoods, setTodayFoods] = useState([]);
  const [waterIntake, setWaterIntake] = useState(0);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [favoriteFoods, setFavoriteFoods] = useState([]);

  // Lade gespeicherte Daten beim Start mit 24h Check
  useEffect(() => {
    const loadData = () => {
      const today = new Date().toDateString();
      const lastReset = localStorage.getItem("lastResetDate");

      // Prüfe ob ein neuer Tag ist (nur wenn lastReset existiert)
      if (lastReset && lastReset !== today) {
        // Neuer Tag - reset nur Essen-Daten, Wasser bleibt erhalten
        setTodayFoods([]);
        localStorage.setItem("lastResetDate", today);
        localStorage.removeItem("todayFoods");
        console.log(
          "Neuer Tag - nur Essen-Daten zurückgesetzt, Wasser bleibt erhalten"
        );
      } else {
        console.log("Gleicher Tag - lade gespeicherte Daten");
        // Gleicher Tag oder erster Besuch - lade gespeicherte Daten
        const savedTodayFoods = localStorage.getItem("todayFoods");
        const savedWater = localStorage.getItem("waterIntake");

        if (savedTodayFoods) {
          try {
            setTodayFoods(JSON.parse(savedTodayFoods));
          } catch (error) {
            console.error("Fehler beim Laden der Essen-Daten:", error);
            setTodayFoods([]);
          }
        }

        if (savedWater) {
          try {
            setWaterIntake(parseInt(savedWater));
          } catch (error) {
            console.error("Fehler beim Laden der Wasser-Daten:", error);
            setWaterIntake(0);
          }
        }

        // Setze lastResetDate nur beim ersten Besuch
        if (!lastReset) {
          localStorage.setItem("lastResetDate", today);
          console.log("Erster Besuch - lastResetDate gesetzt:", today);
        }
      }

      // Lade permanente Daten (Rezepte, Favoriten)
      const savedRecipes = localStorage.getItem("savedRecipes");
      const savedFavorites = localStorage.getItem("favoriteFoods");

      if (savedRecipes) {
        try {
          setSavedRecipes(JSON.parse(savedRecipes));
        } catch (error) {
          console.error("Fehler beim Laden der Rezepte:", error);
          setSavedRecipes([]);
        }
      }

      if (savedFavorites) {
        try {
          setFavoriteFoods(JSON.parse(savedFavorites));
        } catch (error) {
          console.error("Fehler beim Laden der Favoriten:", error);
          setFavoriteFoods([]);
        }
      }
    };

    loadData();
  }, []);

  // 24h Timer für automatischen Reset
  useEffect(() => {
    const checkForNewDay = () => {
      const today = new Date().toDateString();
      const lastReset = localStorage.getItem("lastResetDate");

      if (lastReset && lastReset !== today) {
        // Neuer Tag - reset nur Essen-Daten, Wasser bleibt erhalten
        setTodayFoods([]);
        localStorage.setItem("lastResetDate", today);
        localStorage.removeItem("todayFoods");
        console.log(
          "24h Timer - nur Essen-Daten zurückgesetzt, Wasser bleibt erhalten"
        );
      }
    };

    // Warte 1 Sekunde bevor der Timer startet, damit die initialen Daten geladen werden
    const initialDelay = setTimeout(() => {
      checkForNewDay();
    }, 1000);

    // Dann prüfe alle 5 Minuten
    const interval = setInterval(checkForNewDay, 5 * 60 * 1000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  // Speichere Daten bei Änderungen
  useEffect(() => {
    localStorage.setItem("todayFoods", JSON.stringify(todayFoods));
  }, [todayFoods]);

  useEffect(() => {
    localStorage.setItem("waterIntake", waterIntake.toString());
  }, [waterIntake]);

  useEffect(() => {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  useEffect(() => {
    localStorage.setItem("favoriteFoods", JSON.stringify(favoriteFoods));
  }, [favoriteFoods]);

  // Essen hinzufügen
  const addFood = (foodData) => {
    const newFood = {
      ...foodData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    setTodayFoods((prev) => [...prev, newFood]);
  };

  // Essen entfernen
  const removeFood = (foodId) => {
    setTodayFoods((prev) => prev.filter((food) => food.id !== foodId));
  };

  // Wasser ändern
  const updateWater = (change) => {
    setWaterIntake((prev) => {
      const newValue = Math.max(0, Math.min(8, prev + change));
      return newValue;
    });
  };

  // Rezept speichern
  const saveRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setSavedRecipes((prev) => [...prev, newRecipe]);
  };

  // Rezept entfernen
  const removeRecipe = (recipeId) => {
    setSavedRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
  };

  // Favoriten hinzufügen
  const addToFavorites = (food) => {
    if (!favoriteFoods.find((fav) => fav.name === food.name)) {
      setFavoriteFoods((prev) => [...prev, food]);
    }
  };

  // Favoriten entfernen
  const removeFromFavorites = (foodName) => {
    setFavoriteFoods((prev) => prev.filter((fav) => fav.name !== foodName));
  };

  // Heute's Kalorien berechnen
  const getTodayCalories = () => {
    return todayFoods.reduce((total, food) => total + food.calories, 0);
  };

  // Heute's Makros berechnen
  const getTodayMacros = () => {
    return todayFoods.reduce(
      (total, food) => ({
        protein: total.protein + food.protein,
        fat: total.fat + food.fat,
        carbs: total.carbs + food.carbs,
      }),
      { protein: 0, fat: 0, carbs: 0 }
    );
  };

  // Tagesfortschritt zurücksetzen (für neuen Tag)
  const resetDay = () => {
    setTodayFoods([]);
    localStorage.removeItem("todayFoods");
    localStorage.setItem("lastResetDate", new Date().toDateString());
  };

  // Manueller Reset für Testing
  const forceReset = () => {
    setTodayFoods([]);
    setWaterIntake(0);
    localStorage.removeItem("todayFoods");
    localStorage.removeItem("waterIntake");
    localStorage.removeItem("lastResetDate");
    console.log("Manueller Reset durchgeführt");
  };

  const value = {
    // Daten
    todayFoods,
    waterIntake,
    savedRecipes,
    favoriteFoods,

    // Funktionen
    addFood,
    removeFood,
    updateWater,
    saveRecipe,
    removeRecipe,
    addToFavorites,
    removeFromFavorites,
    getTodayCalories,
    getTodayMacros,
    resetDay,
    forceReset,
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
};
