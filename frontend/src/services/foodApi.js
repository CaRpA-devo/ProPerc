// Food API Service für Nahrungsmitteldaten mit Allergien- und Ernährungsweise-Filterung
// Verwendet nur die USDA API (kostenlos und zuverlässig)

import usdaFoodApiService from "./usdaFoodApi.js";

class FoodApiService {
  constructor() {
    // USDA API hat eigenes Caching
  }

  // Nahrungsmittel suchen
  async searchFoods(query, options = {}) {
    console.log("Verwende USDA API (kostenlos und zuverlässig)");
    return await usdaFoodApiService.searchFoods(query, options);
  }

  // Nahrungsmittel-Details abrufen
  async getFoodDetails(foodId) {
    return await usdaFoodApiService.getFoodDetails(foodId);
  }

  // Empfehlungen basierend auf Profil
  async getRecommendations(userProfile, maxResults = 10) {
    return await usdaFoodApiService.getRecommendations(userProfile, maxResults);
  }
}

// Singleton-Instanz
const foodApiService = new FoodApiService();

export default foodApiService;
