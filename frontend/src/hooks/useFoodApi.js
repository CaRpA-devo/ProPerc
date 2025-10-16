import { useState, useEffect, useCallback } from "react";
import foodApiService from "../services/foodApi";
import { useProfile } from "./useProfile";

export const useFoodApi = () => {
  const { formData: userData } = useProfile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState({ foods: [], total: 0 });
  const [recommendations, setRecommendations] = useState({
    foods: [],
    total: 0,
  });

  // Nahrungsmittel suchen
  const searchFoods = useCallback(
    async (query, options = {}) => {
      if (!query.trim()) {
        setSearchResults({ foods: [], total: 0 });
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const userAllergies = userData?.allergies || [];
        const userDietType = userData?.dietType || "omnivore";

        const results = await foodApiService.searchFoods(query, {
          allergies: userAllergies,
          dietType: userDietType,
          maxResults: options.maxResults || 20,
          ...options,
        });

        setSearchResults(results);
      } catch (err) {
        setError(err.message);
        console.error("Food search error:", err);
      } finally {
        setLoading(false);
      }
    },
    [userData]
  );

  // Empfehlungen laden
  const loadRecommendations = useCallback(async () => {
    if (!userData) return;

    setLoading(true);
    setError(null);

    try {
      const results = await foodApiService.getRecommendations(userData, 12);
      setRecommendations(results);
    } catch (err) {
      setError(err.message);
      console.error("Recommendations error:", err);
    } finally {
      setLoading(false);
    }
  }, [userData]);

  // Nahrungsmittel-Details abrufen
  const getFoodDetails = useCallback(async (foodId) => {
    try {
      return await foodApiService.getFoodDetails(foodId);
    } catch (err) {
      setError(err.message);
      console.error("Food details error:", err);
      return null;
    }
  }, []);

  // Filter für Nahrungsmittel basierend auf Profil
  const filterFoodsByProfile = useCallback(
    (foods) => {
      if (!userData) return foods;

      const { allergies = [], dietType = "omnivore" } = userData;

      return foods.filter((food) => {
        // Allergien-Filter
        const hasUserAllergies = food.allergens?.some((allergen) =>
          allergies.includes(allergen)
        );
        if (hasUserAllergies) return false;

        // Ernährungsweise-Filter
        if (dietType !== "omnivore") {
          return food.dietCompatibility?.isCompatible !== false;
        }

        return true;
      });
    },
    [userData]
  );

  // Nahrungsmittel bewerten basierend auf Profil
  const scoreFoodForProfile = useCallback(
    (food) => {
      if (!userData) return food.healthScore || 50;

      let score = food.healthScore || 50;
      const { goal, activityLevel } = userData;

      // Ziel-basierte Bewertung
      switch (goal) {
        case "lose":
          // Niedrige Kalorien, hohe Ballaststoffe
          if (food.calories < 100) score += 10;
          if (food.fiber > 5) score += 15;
          if (food.sugar < 10) score += 10;
          break;
        case "gain":
          // Hohe Kalorien, hohes Protein
          if (food.calories > 200) score += 10;
          if (food.protein > 15) score += 20;
          if (food.fat > 10) score += 5;
          break;
        case "maintain":
          // Ausgewogene Nährstoffe
          if (food.protein > 10 && food.protein < 30) score += 10;
          if (food.fiber > 3) score += 10;
          break;
      }

      // Aktivitätslevel-basierte Bewertung
      if (activityLevel === "very_active" && food.protein > 20) {
        score += 10;
      }

      return Math.min(100, score);
    },
    [userData]
  );

  // Nahrungsmittel mit Profil-Score erweitern
  const enhanceFoodsWithProfile = useCallback(
    (foods) => {
      return foods.map((food) => ({
        ...food,
        profileScore: scoreFoodForProfile(food),
        isRecommended: scoreFoodForProfile(food) > 80,
        warnings: [
          ...(food.dietCompatibility?.warnings || []),
          ...(food.allergens?.length > 0
            ? [`Enthält: ${food.allergens.join(", ")}`]
            : []),
        ].filter(Boolean),
      }));
    },
    [scoreFoodForProfile]
  );

  // Automatische Empfehlungen laden
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      loadRecommendations();
    }
  }, [userData, loadRecommendations]);

  return {
    // Daten
    searchResults,
    recommendations,
    loading,
    error,

    // Funktionen
    searchFoods,
    loadRecommendations,
    getFoodDetails,
    filterFoodsByProfile,
    scoreFoodForProfile,
    enhanceFoodsWithProfile,

    // Utility
    clearError: () => setError(null),
    clearSearch: () => setSearchResults({ foods: [], total: 0 }),
  };
};
