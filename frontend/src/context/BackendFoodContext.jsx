import React, { createContext, useContext, useState, useEffect } from "react";
import { useDailyTracking } from "../hooks/useDailyTracking";
import { useFavorites } from "../hooks/useFavorites";

const BackendFoodContext = createContext();

export const useBackendFood = () => {
  const context = useContext(BackendFoodContext);
  if (!context) {
    throw new Error("useBackendFood must be used within a BackendFoodProvider");
  }
  return context;
};

export const BackendFoodProvider = ({ children }) => {
  const [todayFoods, setTodayFoods] = useState([]);
  const [waterIntake, setWaterIntake] = useState(0);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    loading: apiLoading,
    error: apiError,
    getTodayData,
    addFood: apiAddFood,
    removeFood: apiRemoveFood,
    updateWater: apiUpdateWater,
    resetToday: apiResetToday,
  } = useDailyTracking();

  const {
    loading: favoritesLoading,
    error: favoritesError,
    getFavorites: apiGetFavorites,
    addFavorite: apiAddFavorite,
    removeFavorite: apiRemoveFavorite,
  } = useFavorites();

  // Lade Daten beim Start
  useEffect(() => {
    loadTodayData();
    loadFavoritesData();
    loadLocalData();
  }, []);

  // Lade heute's Tracking-Daten vom Backend
  const loadTodayData = async () => {
    try {
      setIsLoading(true);
      const response = await getTodayData();

      if (response.success) {
        setTodayFoods(response.data.foods || []);
        setWaterIntake(response.data.waterIntake || 0);
      }
    } catch (err) {
      console.error("Fehler beim Laden der Tracking-Daten:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Lade Favoriten vom Backend
  const loadFavoritesData = async () => {
    try {
      const response = await apiGetFavorites();

      if (response.success) {
        setFavoriteFoods(response.data || []);
      }
    } catch (err) {
      console.error("Fehler beim Laden der Favoriten:", err);
      // Fallback: Lade lokale Favoriten
      const savedFavorites = localStorage.getItem("favoriteFoods");
      if (savedFavorites) {
        try {
          setFavoriteFoods(JSON.parse(savedFavorites));
        } catch (error) {
          console.error("Fehler beim Laden der lokalen Favoriten:", error);
        }
      }
    }
  };

  // Lade lokale Daten (nur Rezepte)
  const loadLocalData = () => {
    // Nur Rezepte bleiben lokal gespeichert
    const savedRecipes = localStorage.getItem("savedRecipes");

    if (savedRecipes) {
      try {
        setSavedRecipes(JSON.parse(savedRecipes));
      } catch (error) {
        console.error("Fehler beim Laden der Rezepte:", error);
      }
    }
  };

  // Essen hinzufügen
  const addFood = async (foodData) => {
    try {
      const response = await apiAddFood(foodData);

      if (response.success) {
        setTodayFoods((prev) => [...prev, response.data]);
      }
    } catch (err) {
      console.error("Fehler beim Hinzufügen des Essens:", err);
      setError(err.message);
    }
  };

  // Essen entfernen
  const removeFood = async (foodId) => {
    try {
      const response = await apiRemoveFood(foodId);

      if (response.success) {
        setTodayFoods((prev) => prev.filter((food) => food.id !== foodId));
      }
    } catch (err) {
      console.error("Fehler beim Entfernen des Essens:", err);
      setError(err.message);
    }
  };

  // Wasser ändern
  const updateWater = async (change) => {
    try {
      const response = await apiUpdateWater(change);

      if (response.success) {
        setWaterIntake(response.data.waterIntake);
      }
    } catch (err) {
      console.error("Fehler beim Aktualisieren des Wasser-Intakes:", err);
      setError(err.message);
    }
  };

  // Rezept speichern (lokal)
  const saveRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setSavedRecipes((prev) => [...prev, newRecipe]);
  };

  // Rezept entfernen (lokal)
  const removeRecipe = (recipeId) => {
    setSavedRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
  };

  // Favoriten hinzufügen (Backend)
  const addToFavorites = async (food) => {
    try {
      const response = await apiAddFavorite(food);

      if (response.success) {
        setFavoriteFoods((prev) => [...prev, response.data]);
      }
    } catch (err) {
      console.error("Fehler beim Hinzufügen des Favoriten:", err);
      setError(err.message);
    }
  };

  // Favoriten entfernen (Backend)
  const removeFromFavorites = async (foodName) => {
    try {
      const response = await apiRemoveFavorite(foodName);

      if (response.success) {
        setFavoriteFoods((prev) => prev.filter((fav) => fav.name !== foodName));
      }
    } catch (err) {
      console.error("Fehler beim Entfernen des Favoriten:", err);
      setError(err.message);
    }
  };

  // Heute's Kalorien berechnen
  const getTodayCalories = () => {
    return todayFoods.reduce((total, food) => total + (food.calories || 0), 0);
  };

  // Heute's Makros berechnen
  const getTodayMacros = () => {
    return todayFoods.reduce(
      (total, food) => ({
        protein: total.protein + (food.protein || 0),
        fat: total.fat + (food.fat || 0),
        carbs: total.carbs + (food.carbs || 0),
      }),
      { protein: 0, fat: 0, carbs: 0 }
    );
  };

  // Tagesfortschritt zurücksetzen
  const resetDay = async () => {
    try {
      const response = await apiResetToday();

      if (response.success) {
        setTodayFoods([]);
        setWaterIntake(0);
      }
    } catch (err) {
      console.error("Fehler beim Zurücksetzen:", err);
      setError(err.message);
    }
  };

  // Speichere lokale Daten bei Änderungen (nur Rezepte)
  useEffect(() => {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const value = {
    // Daten
    todayFoods,
    waterIntake,
    savedRecipes,
    favoriteFoods,
    isLoading: isLoading || apiLoading || favoritesLoading,
    error: error || apiError || favoritesError,

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
    loadTodayData, // Für manuelles Neuladen
  };

  return (
    <BackendFoodContext.Provider value={value}>
      {children}
    </BackendFoodContext.Provider>
  );
};
