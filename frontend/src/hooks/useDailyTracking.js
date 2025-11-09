import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const useDailyTracking = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API Call Helper
  const apiCall = async (endpoint, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const token = await getToken();
      const response = await fetch(
        `${API_BASE_URL}/api/daily-tracking${endpoint}`,
        {
          ...options,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "API Fehler");
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Heute's Tracking-Daten abrufen
  const getTodayData = async () => {
    return await apiCall("/today");
  };

  // Essen hinzufügen
  const addFood = async (foodData) => {
    return await apiCall("/food", {
      method: "POST",
      body: JSON.stringify({ foodData }),
    });
  };

  // Essen entfernen
  const removeFood = async (foodId) => {
    return await apiCall(`/food/${foodId}`, {
      method: "DELETE",
    });
  };

  // Wasser-Intake aktualisieren
  const updateWater = async (change) => {
    return await apiCall("/water", {
      method: "PATCH",
      body: JSON.stringify({ change }),
    });
  };

  // Tägliche Daten zurücksetzen
  const resetToday = async () => {
    return await apiCall("/reset", {
      method: "POST",
    });
  };

  // Historie abrufen
  const getHistory = async (days = 7) => {
    return await apiCall(`/history?days=${days}`);
  };

  return {
    loading,
    error,
    getTodayData,
    addFood,
    removeFood,
    updateWater,
    resetToday,
    getHistory,
  };
};
