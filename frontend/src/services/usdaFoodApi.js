// USDA FoodData Central API Service - 100% KOSTENLOS!
// https://fdc.nal.usda.gov/api-guide.html

const USDA_BASE_URL = "https://api.nal.usda.gov/fdc/v1";
const USDA_API_KEY = "gm31YYomkSSo1GF9iCX3q49uhuLDUD3fyU8tGlZA";

class UsdaFoodApiService {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 Stunden
  }

  // Cache-Management
  getCachedData(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  // Deutsche zu englischen Suchbegriffen übersetzen
  translateSearchQuery(query) {
    const translations = {
      apfel: "apple",
      äpfel: "apple",
      banane: "banana",
      bananen: "banana",
      brokkoli: "broccoli",
      karotte: "carrot",
      karotten: "carrot",
      möhre: "carrot",
      möhren: "carrot",
      hähnchen: "chicken",
      huhn: "chicken",
      rindfleisch: "beef",
      rind: "beef",
      schweinefleisch: "pork",
      schwein: "pork",
      fisch: "fish",
      lachs: "salmon",
      thunfisch: "tuna",
      milch: "milk",
      käse: "cheese",
      joghurt: "yogurt",
      brot: "bread",
      reis: "rice",
      nudeln: "pasta",
      pasta: "pasta",
      ei: "egg",
      eier: "egg",
      nüsse: "nuts",
      mandeln: "almond",
      walnüsse: "walnut",
      avocado: "avocado",
      tomate: "tomato",
      tomaten: "tomato",
      gurke: "cucumber",
      gurken: "cucumber",
      kartoffel: "potato",
      kartoffeln: "potato",
      zwiebel: "onion",
      zwiebeln: "onion",
      knoblauch: "garlic",
      spinat: "spinach",
      salat: "lettuce",
      kohl: "cabbage",
      blumenkohl: "cauliflower",
      zucchini: "zucchini",
      paprika: "pepper",
      chili: "chili",
      pfeffer: "pepper",
      salz: "salt",
      zucker: "sugar",
      honig: "honey",
      öl: "oil",
      butter: "butter",
      margarine: "margarine",
      mehl: "flour",
      zitrone: "lemon",
      orange: "orange",
      erdbeere: "strawberry",
      erdbeeren: "strawberry",
      traube: "grape",
      trauben: "grape",
      birne: "pear",
      birnen: "pear",
      pfirsich: "peach",
      pfirsiche: "peach",
      kiwi: "kiwi",
      ananas: "pineapple",
      mango: "mango",
      kokosnuss: "coconut",
      dattel: "date",
      datteln: "date",
      feige: "fig",
      feigen: "fig",
      pflaume: "plum",
      pflaumen: "plum",
      kirsche: "cherry",
      kirschen: "cherry",
      heidelbeere: "blueberry",
      heidelbeeren: "blueberry",
      himbeere: "raspberry",
      himbeeren: "raspberry",
      brombeere: "blackberry",
      brombeeren: "blackberry",
      cranberry: "cranberry",
      preiselbeere: "lingonberry",
      preiselbeeren: "lingonberry",
      sanddorn: "sea buckthorn",
      quitte: "quince",
      quitten: "quince",
      granatapfel: "pomegranate",
      granatäpfel: "pomegranate",
      passionsfrucht: "passion fruit",
      lychee: "lychee",
      drachenfrucht: "dragon fruit",
      jackfrucht: "jackfruit",
      durian: "durian",
      rambutan: "rambutan",
      mangostan: "mangosteen",
      stachelbeere: "gooseberry",
      stachelbeeren: "gooseberry",
      johannisbeere: "currant",
      johannisbeeren: "currant",
      holunderbeere: "elderberry",
      holunderbeeren: "elderberry",
      "schwarze johannisbeere": "black currant",
      "rote johannisbeere": "red currant",
      "weiße johannisbeere": "white currant",
      aronia: "aronia",
      sanddornbeere: "sea buckthorn",
      sanddornbeeren: "sea buckthorn",
      hagebutte: "rose hip",
      hagebutten: "rose hip",
      vogelbeere: "rowan berry",
      vogelbeeren: "rowan berry",
      schlehe: "sloe",
      schlehen: "sloe",
      kornelkirsche: "cornelian cherry",
      kornelkirschen: "cornelian cherry",
      maulbeere: "mulberry",
      maulbeeren: "mulberry",
      wassermelone: "watermelon",
      honigmelone: "honeydew melon",
      cantaloupe: "cantaloupe",
      "galia melone": "galia melon",
      "charentais melone": "charentais melon",
      netzmelone: "net melon",
      wintermelone: "winter melon",
      bittermelone: "bitter melon",
      kürbis: "pumpkin",
      kürbisse: "pumpkin",
      "butternuss kürbis": "butternut squash",
      "hokkaido kürbis": "hokkaido squash",
      "spaghetti kürbis": "spaghetti squash",
      patisson: "pattypan squash",
      zucchini: "zucchini",
      gurke: "cucumber",
      gurken: "cucumber",
      einlegegurke: "pickling cucumber",
      einlegegurken: "pickling cucumber",
      salatgurke: "slicing cucumber",
      salatgurken: "slicing cucumber",
      schlangengurke: "snake cucumber",
      schlangengurken: "snake cucumber",
      zitronengurke: "lemon cucumber",
      zitronengurken: "lemon cucumber",
      minigurke: "mini cucumber",
      minigurken: "mini cucumber",
      cocktailgurke: "cocktail cucumber",
      cocktailgurken: "cocktail cucumber",
      snackgurke: "snack cucumber",
      snackgurken: "snack cucumber",
      babygurke: "baby cucumber",
      babygurken: "baby cucumber",
      kirschgurke: "cherry cucumber",
      kirschgurken: "cherry cucumber",
      weingurke: "wine cucumber",
      weingurken: "wine cucumber",
      salatgurke: "slicing cucumber",
      salatgurken: "slicing cucumber",
      einlegegurke: "pickling cucumber",
      einlegegurken: "pickling cucumber",
      schlangengurke: "snake cucumber",
      schlangengurken: "snake cucumber",
      zitronengurke: "lemon cucumber",
      zitronengurken: "lemon cucumber",
      minigurke: "mini cucumber",
      minigurken: "mini cucumber",
      cocktailgurke: "cocktail cucumber",
      cocktailgurken: "cocktail cucumber",
      snackgurke: "snack cucumber",
      snackgurken: "snack cucumber",
      babygurke: "baby cucumber",
      babygurken: "baby cucumber",
      kirschgurke: "cherry cucumber",
      kirschgurken: "cherry cucumber",
      weingurke: "wine cucumber",
      weingurken: "wine cucumber",
    };

    const lowerQuery = query.toLowerCase().trim();
    return translations[lowerQuery] || query;
  }

  // Nahrungsmittel suchen
  async searchFoods(query, options = {}) {
    const { allergies = [], dietType = "omnivore", maxResults = 20 } = options;

    // Deutsche Suchbegriffe zu englischen übersetzen
    const translatedQuery = this.translateSearchQuery(query);
    console.log(`Suche: "${query}" → "${translatedQuery}"`);

    const cacheKey = `usda_search_${translatedQuery}_${allergies.join(
      ","
    )}_${dietType}_${maxResults}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const params = new URLSearchParams({
        query: translatedQuery,
        pageSize: maxResults.toString(),
        api_key: USDA_API_KEY,
        dataType: "Foundation,SR Legacy",
        sortBy: "dataType.keyword",
        sortOrder: "asc",
      });

      const response = await fetch(`${USDA_BASE_URL}/foods/search?${params}`);

      if (!response.ok) {
        throw new Error(`USDA API Error: ${response.status}`);
      }

      const data = await response.json();
      const processedData = this.processUsdaData(
        data,
        allergies,
        dietType,
        query
      );

      this.setCachedData(cacheKey, processedData);
      return processedData;
    } catch (error) {
      console.error("USDA Food API Error:", error);
      // Fallback zu lokalen Daten
      return this.getFallbackFoods(query, allergies, dietType);
    }
  }

  // USDA Daten verarbeiten
  processUsdaData(apiData, allergies, dietType, query) {
    if (!apiData.foods) return { foods: [], total: 0 };

    const foods = apiData.foods.map((food) => {
      const nutrients = this.extractNutrients(food.foodNutrients);

      return {
        id: food.fdcId,
        name: food.description,
        brand: food.brandOwner || null,
        category: this.categorizeFood(food.description, food.dataType),
        calories: Math.round(nutrients.ENERC_KCAL || 0),
        protein: Math.round((nutrients.PROCNT || 0) * 10) / 10,
        fat: Math.round((nutrients.FAT || 0) * 10) / 10,
        carbs: Math.round((nutrients.CHOCDF || 0) * 10) / 10,
        fiber: Math.round((nutrients.FIBTG || 0) * 10) / 10,
        sugar: Math.round((nutrients.SUGAR || 0) * 10) / 10,
        sodium: Math.round((nutrients.NA || 0) * 10) / 10,
        // Allergien-Informationen
        allergens: this.extractAllergens(food, allergies),
        // Ernährungsweise-Kompatibilität
        dietCompatibility: this.checkDietCompatibility(food, dietType),
        // Zutaten
        ingredients: food.ingredients || null,
        // Nährwert-Score
        healthScore: this.calculateHealthScore(nutrients, dietType),
        // Portionsgröße (USDA verwendet 100g als Standard)
        servingSize: 100,
        servingUnit: "g",
        // USDA-spezifische Daten
        dataType: food.dataType,
        fdcId: food.fdcId,
        // Bild (falls verfügbar)
        image: food.image || null,
      };
    });

    return {
      foods: foods.sort((a, b) => b.healthScore - a.healthScore),
      total: foods.length,
      query: query,
      hasMore: apiData.totalHits > foods.length,
      totalHits: apiData.totalHits,
    };
  }

  // Nährstoffe aus USDA-Format extrahieren
  extractNutrients(foodNutrients) {
    const nutrients = {};

    foodNutrients.forEach((nutrient) => {
      const nutrientName = nutrient.nutrientName;
      const value = nutrient.value || 0;

      // Mapping der USDA Nährstoff-Namen basierend auf der tatsächlichen API-Response
      if (
        nutrientName === "Energy" ||
        nutrientName === "Energy (Atwater General Factors)" ||
        nutrientName === "Energy (Atwater Specific Factors)"
      ) {
        nutrients.ENERC_KCAL = value;
      } else if (nutrientName === "Protein") {
        nutrients.PROCNT = value;
      } else if (nutrientName === "Total lipid (fat)") {
        nutrients.FAT = value;
      } else if (nutrientName === "Carbohydrate, by difference") {
        nutrients.CHOCDF = value;
      } else if (nutrientName === "Fiber, total dietary") {
        nutrients.FIBTG = value;
      } else if (
        nutrientName === "Sugars, total including NLEA" ||
        nutrientName === "Total Sugars"
      ) {
        nutrients.SUGAR = value;
      } else if (nutrientName === "Sodium, Na") {
        nutrients.NA = value;
      }
    });

    return nutrients;
  }

  // Nahrungsmittel kategorisieren
  categorizeFood(description, dataType) {
    const desc = description.toLowerCase();

    if (
      desc.includes("apple") ||
      desc.includes("banana") ||
      desc.includes("fruit")
    ) {
      return "Obst";
    }
    if (
      desc.includes("carrot") ||
      desc.includes("broccoli") ||
      desc.includes("vegetable")
    ) {
      return "Gemüse";
    }
    if (
      desc.includes("chicken") ||
      desc.includes("beef") ||
      desc.includes("pork") ||
      desc.includes("meat")
    ) {
      return "Fleisch";
    }
    if (
      desc.includes("fish") ||
      desc.includes("salmon") ||
      desc.includes("tuna")
    ) {
      return "Fisch";
    }
    if (
      desc.includes("milk") ||
      desc.includes("cheese") ||
      desc.includes("yogurt") ||
      desc.includes("dairy")
    ) {
      return "Milchprodukte";
    }
    if (
      desc.includes("bread") ||
      desc.includes("rice") ||
      desc.includes("pasta") ||
      desc.includes("grain")
    ) {
      return "Getreide";
    }
    if (desc.includes("egg")) {
      return "Eier";
    }
    if (
      desc.includes("nut") ||
      desc.includes("almond") ||
      desc.includes("walnut")
    ) {
      return "Nüsse";
    }

    return dataType === "Foundation" ? "Grundnahrungsmittel" : "Verarbeitet";
  }

  // Allergene extrahieren (USDA hat begrenzte Allergien-Daten)
  extractAllergens(food, userAllergies) {
    const allergens = [];
    const description = food.description?.toLowerCase() || "";
    const ingredients = food.ingredients?.toLowerCase() || "";

    // Einfache Keyword-basierte Erkennung
    const allergyKeywords = {
      Laktose: ["milk", "dairy", "cheese", "yogurt", "lactose"],
      Gluten: ["wheat", "gluten", "barley", "rye", "flour"],
      Nüsse: ["nut", "almond", "walnut", "pecan", "hazelnut"],
      Eier: ["egg", "egg white", "egg yolk"],
      Soja: ["soy", "soybean", "tofu"],
      Fisch: ["fish", "salmon", "tuna", "cod"],
      Schalentiere: ["shellfish", "shrimp", "crab", "lobster"],
    };

    Object.entries(allergyKeywords).forEach(([allergy, keywords]) => {
      if (userAllergies.includes(allergy)) {
        const hasAllergen = keywords.some(
          (keyword) =>
            description.includes(keyword) || ingredients.includes(keyword)
        );
        if (hasAllergen) {
          allergens.push(allergy);
        }
      }
    });

    return allergens;
  }

  // Ernährungsweise-Kompatibilität prüfen
  checkDietCompatibility(food, dietType) {
    const compatibility = {
      isCompatible: true,
      warnings: [],
      score: 100,
    };

    const description = food.description?.toLowerCase() || "";
    const ingredients = food.ingredients?.toLowerCase() || "";

    switch (dietType) {
      case "vegan":
        const nonVeganKeywords = [
          "milk",
          "dairy",
          "cheese",
          "egg",
          "meat",
          "chicken",
          "beef",
          "fish",
        ];
        const hasNonVegan = nonVeganKeywords.some(
          (keyword) =>
            description.includes(keyword) || ingredients.includes(keyword)
        );
        if (hasNonVegan) {
          compatibility.isCompatible = false;
          compatibility.warnings.push("Enthält tierische Produkte");
          compatibility.score = 0;
        }
        break;

      case "vegetarian":
        const nonVegetarianKeywords = [
          "meat",
          "chicken",
          "beef",
          "pork",
          "fish",
          "seafood",
        ];
        const hasNonVegetarian = nonVegetarianKeywords.some(
          (keyword) =>
            description.includes(keyword) || ingredients.includes(keyword)
        );
        if (hasNonVegetarian) {
          compatibility.isCompatible = false;
          compatibility.warnings.push("Enthält Fleisch oder Fisch");
          compatibility.score = 0;
        }
        break;

      case "keto":
        const carbs = this.extractNutrients(food.foodNutrients).CHOCDF || 0;
        if (carbs > 20) {
          compatibility.warnings.push("Hoher Kohlenhydratgehalt für Keto");
          compatibility.score = Math.max(0, 100 - (carbs - 20) * 2);
        }
        break;
    }

    return compatibility;
  }

  // Gesundheits-Score berechnen
  calculateHealthScore(nutrients, dietType) {
    let score = 50; // Basis-Score

    // Protein-Bonus
    const protein = nutrients.PROCNT || 0;
    if (protein > 20) score += 20;
    else if (protein > 10) score += 10;

    // Fett-Bewertung
    const fat = nutrients.FAT || 0;
    if (fat < 10) score += 10;
    else if (fat > 30) score -= 10;

    // Zucker-Bewertung
    const sugar = nutrients.SUGAR || 0;
    if (sugar < 5) score += 15;
    else if (sugar > 20) score -= 20;

    // Ballaststoffe-Bonus
    const fiber = nutrients.FIBTG || 0;
    if (fiber > 5) score += 15;
    else if (fiber > 2) score += 5;

    // Natrium-Bewertung
    const sodium = nutrients.NA || 0;
    if (sodium < 200) score += 10;
    else if (sodium > 800) score -= 15;

    return Math.max(0, Math.min(100, score));
  }

  // Fallback-Daten für Offline-Modus
  getFallbackFoods(query, allergies, dietType) {
    const fallbackFoods = [
      {
        id: "fallback_1",
        name: "Apfel, roh",
        brand: null,
        category: "Obst",
        calories: 52,
        protein: 0.3,
        fat: 0.2,
        carbs: 14,
        fiber: 2.4,
        sugar: 10.4,
        sodium: 1,
        allergens: [],
        dietCompatibility: { isCompatible: true, warnings: [], score: 95 },
        ingredients: "Apfel",
        image: null,
        healthScore: 95,
        servingSize: 100,
        servingUnit: "g",
        dataType: "Foundation",
        fdcId: "fallback_1",
      },
      {
        id: "fallback_2",
        name: "Hähnchenbrust, roh",
        brand: null,
        category: "Fleisch",
        calories: 165,
        protein: 31,
        fat: 3.6,
        carbs: 0,
        fiber: 0,
        sugar: 0,
        sodium: 74,
        allergens: [],
        dietCompatibility: { isCompatible: true, warnings: [], score: 85 },
        ingredients: "Hähnchenbrust",
        image: null,
        healthScore: 85,
        servingSize: 100,
        servingUnit: "g",
        dataType: "Foundation",
        fdcId: "fallback_2",
      },
    ];

    // Filter basierend auf Allergien und Ernährungsweise
    const filteredFoods = fallbackFoods.filter((food) => {
      // Allergien-Filter
      const hasAllergens = food.allergens.some((allergen) =>
        allergies.includes(allergen)
      );
      if (hasAllergens) return false;

      // Ernährungsweise-Filter
      return food.dietCompatibility.isCompatible;
    });

    return {
      foods: filteredFoods,
      total: filteredFoods.length,
      query: query,
      hasMore: false,
      isFallback: true,
    };
  }

  // Nahrungsmittel-Details abrufen
  async getFoodDetails(fdcId) {
    const cacheKey = `usda_details_${fdcId}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(
        `${USDA_BASE_URL}/food/${fdcId}?api_key=${USDA_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`USDA Details API Error: ${response.status}`);
      }

      const data = await response.json();
      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error("USDA Food Details API Error:", error);
      return null;
    }
  }

  // Empfehlungen basierend auf Profil
  async getRecommendations(userProfile, maxResults = 10) {
    const { dietType, allergies, goal, activityLevel } = userProfile;

    // Empfehlungen basierend auf Ziel
    let recommendationQueries = [];

    switch (goal) {
      case "lose":
        recommendationQueries = [
          "apple",
          "broccoli",
          "chicken breast",
          "salmon",
        ];
        break;
      case "gain":
        recommendationQueries = ["beef", "eggs", "nuts", "avocado"];
        break;
      case "maintain":
        recommendationQueries = ["balanced", "variety", "healthy"];
        break;
      default:
        recommendationQueries = ["healthy", "nutritious"];
    }

    const allRecommendations = [];

    for (const query of recommendationQueries) {
      try {
        const results = await this.searchFoods(query, {
          allergies,
          dietType,
          maxResults: Math.ceil(maxResults / recommendationQueries.length),
        });
        allRecommendations.push(...results.foods);
      } catch (error) {
        console.error(`USDA Recommendation error for ${query}:`, error);
      }
    }

    // Sortieren nach Gesundheits-Score und Duplikate entfernen
    const uniqueRecommendations = allRecommendations
      .filter(
        (food, index, self) => index === self.findIndex((f) => f.id === food.id)
      )
      .sort((a, b) => b.healthScore - a.healthScore)
      .slice(0, maxResults);

    return {
      foods: uniqueRecommendations,
      total: uniqueRecommendations.length,
      basedOn: { dietType, allergies, goal },
    };
  }
}

// Singleton-Instanz
const usdaFoodApiService = new UsdaFoodApiService();

export default usdaFoodApiService;
