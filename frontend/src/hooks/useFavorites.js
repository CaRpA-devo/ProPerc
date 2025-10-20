import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const useFavorites = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API Call Helper
  const apiCall = async (endpoint, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const token = await getToken();
      const response = await fetch(`${API_BASE_URL}/api/favorites${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

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

  // Alle Favoriten abrufen
  const getFavorites = async () => {
    return await apiCall("/");
  };

  // Favorit hinzufügen
  const addFavorite = async (foodData) => {
    return await apiCall("/", {
      method: "POST",
      body: JSON.stringify({ foodData }),
    });
  };

  // Favorit entfernen
  const removeFavorite = async (foodName) => {
    return await apiCall(`/${encodeURIComponent(foodName)}`, {
      method: "DELETE",
    });
  };

  return {
    loading,
    error,
    getFavorites,
    addFavorite,
    removeFavorite,
  };
};
