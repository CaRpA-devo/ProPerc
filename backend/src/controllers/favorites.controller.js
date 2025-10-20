import { Favorite } from "../models/favorites.mod.js";
import { createError } from "../utils/createError.js";

// Alle Favoriten eines Users abrufen
export const getFavorites = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;

    const favorites = await Favorite.findByUser(clerkId);

    res.status(200).json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    next(createError(500, "Fehler beim Laden der Favoriten", error.message));
  }
};

// Favorit hinzufügen
export const addFavorite = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;
    const { foodData } = req.body;

    if (!foodData || !foodData.name) {
      return next(createError(400, "Essensdaten sind erforderlich"));
    }

    try {
      const favorite = await Favorite.addFavorite(clerkId, foodData);

      res.status(201).json({
        success: true,
        message: "Favorit erfolgreich hinzugefügt",
        data: favorite,
      });
    } catch (error) {
      if (error.message === "Favorit existiert bereits") {
        return next(createError(409, "Favorit existiert bereits"));
      }
      throw error;
    }
  } catch (error) {
    next(
      createError(500, "Fehler beim Hinzufügen des Favoriten", error.message)
    );
  }
};

// Favorit entfernen
export const removeFavorite = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;
    const { foodName } = req.params;

    const favorite = await Favorite.removeFavorite(clerkId, foodName);

    if (!favorite) {
      return next(createError(404, "Favorit nicht gefunden"));
    }

    res.status(200).json({
      success: true,
      message: "Favorit erfolgreich entfernt",
    });
  } catch (error) {
    next(
      createError(500, "Fehler beim Entfernen des Favoriten", error.message)
    );
  }
};
