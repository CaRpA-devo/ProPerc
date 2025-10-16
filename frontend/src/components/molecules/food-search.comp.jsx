import React, { useState, useEffect, useRef } from "react";
import { useFoodApi } from "../../hooks/useFoodApi";
import { useFood } from "../../context/FoodContext";

const FoodSearch = ({ onFoodSelect, showRecommendations = true }) => {
  const {
    searchResults,
    recommendations,
    loading,
    error,
    searchFoods,
    enhanceFoodsWithProfile,
  } = useFoodApi();
  const { addFood, addToFavorites, favoriteFoods } = useFood();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const searchRef = useRef(null);

  // Kategorien für Filterung (müssen mit den API-Kategorien übereinstimmen)
  const categories = [
    { id: "all", name: "Alle", icon: "🍽️" },
    { id: "Obst", name: "Obst", icon: "🍎" },
    { id: "Gemüse", name: "Gemüse", icon: "🥕" },
    { id: "Fleisch", name: "Fleisch", icon: "🥩" },
    { id: "Fisch", name: "Fisch", icon: "🐟" },
    { id: "Getreide", name: "Getreide", icon: "🌾" },
    { id: "Milchprodukte", name: "Milchprodukte", icon: "🥛" },
    { id: "Eier", name: "Eier", icon: "🥚" },
    { id: "Nüsse", name: "Nüsse", icon: "🥜" },
  ];

  // Debounced Search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        searchFoods(query);
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, searchFoods]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Nahrungsmittel filtern
  const getFilteredFoods = () => {
    let foods = showResults ? searchResults.foods : recommendations.foods;

    if (selectedCategory !== "all") {
      foods = foods.filter((food) => {
        // Exakte Übereinstimmung mit der Kategorie
        return food.category === selectedCategory;
      });
    }

    return enhanceFoodsWithProfile(foods);
  };

  const handleFoodSelect = (food) => {
    // Nahrungsmittel zu heute hinzufügen
    addFood({
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      fat: food.fat,
      carbs: food.carbs,
      quantity: 1,
    });

    if (onFoodSelect) {
      onFoodSelect(food);
    }

    // Suche zurücksetzen
    setQuery("");
    setShowResults(false);
  };

  const handleAddToFavorites = (food, event) => {
    event.stopPropagation(); // Verhindert das Auslösen von handleFoodSelect
    addToFavorites({
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      fat: food.fat,
      carbs: food.carbs,
    });
  };

  // Prüfe ob ein Nahrungsmittel bereits in den Favoriten ist
  const isFavorite = (foodName) => {
    return favoriteFoods.some((fav) => fav.name === foodName);
  };

  const filteredFoods = getFilteredFoods();

  return (
    <div className="relative" ref={searchRef}>
      {/* Suchfeld */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nahrungsmittel suchen..."
          className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      {/* Kategorie-Filter */}
      <div className="flex flex-wrap gap-2 mt-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedCategory === category.id
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Fehler-Anzeige */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Suchergebnisse */}
      {showResults && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {filteredFoods.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <div className="text-2xl mb-2">🔍</div>
              <p>Keine Ergebnisse gefunden</p>
              <p className="text-sm">Versuche einen anderen Suchbegriff</p>
            </div>
          ) : (
            <div className="p-2">
              {filteredFoods.map((food) => (
                <FoodItem
                  key={food.id}
                  food={food}
                  onSelect={() => handleFoodSelect(food)}
                  onAddToFavorites={handleAddToFavorites}
                  isFavorite={isFavorite}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empfehlungen (wenn keine Suche aktiv) */}
      {!showResults &&
        showRecommendations &&
        recommendations.foods.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Empfohlene Nahrungsmittel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredFoods.slice(0, 6).map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  onSelect={() => handleFoodSelect(food)}
                  onAddToFavorites={handleAddToFavorites}
                  isFavorite={isFavorite}
                />
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

// Nahrungsmittel-Item für Suchergebnisse
const FoodItem = ({ food, onSelect, onAddToFavorites, isFavorite }) => (
  <div
    onClick={onSelect}
    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
  >
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <h4 className="font-medium text-gray-800">{food.name}</h4>
        {food.isRecommended && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Empfohlen
          </span>
        )}
        {food.dietCompatibility?.warnings?.length > 0 && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
            ⚠️
          </span>
        )}
      </div>
      <div className="flex space-x-4 text-sm text-gray-600 mt-1">
        <span>{food.calories} kcal</span>
        <span>P: {food.protein}g</span>
        <span>F: {food.fat}g</span>
        <span>C: {food.carbs}g</span>
        <span className="text-green-600 font-medium">
          Score: {food.profileScore || food.healthScore}
        </span>
      </div>
      {food.warnings?.length > 0 && (
        <div className="text-xs text-yellow-600 mt-1">{food.warnings[0]}</div>
      )}
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => onAddToFavorites(food, e)}
        className={`p-2 rounded-lg transition-colors ${
          isFavorite(food.name)
            ? "text-purple-500 bg-purple-50"
            : "text-yellow-500 hover:bg-yellow-50"
        }`}
        title={
          isFavorite(food.name) ? "In Favoriten" : "Zu Favoriten hinzufügen"
        }
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </button>
      <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  </div>
);

// Nahrungsmittel-Card für Empfehlungen
const FoodCard = ({ food, onSelect, onAddToFavorites, isFavorite }) => (
  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <h4 className="font-medium text-gray-800 truncate">{food.name}</h4>
      <div className="flex items-center gap-2">
        {food.isRecommended && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            ⭐
          </span>
        )}
        <button
          onClick={(e) => onAddToFavorites(food, e)}
          className={`p-1 rounded transition-colors ${
            isFavorite(food.name)
              ? "text-purple-500 bg-purple-50"
              : "text-yellow-500 hover:bg-yellow-50"
          }`}
          title={
            isFavorite(food.name) ? "In Favoriten" : "Zu Favoriten hinzufügen"
          }
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div className="text-sm text-gray-600 space-y-1">
      <div className="flex justify-between">
        <span>Kalorien:</span>
        <span className="font-medium">{food.calories}</span>
      </div>
      <div className="flex justify-between">
        <span>Protein:</span>
        <span className="font-medium">{food.protein}g</span>
      </div>
      <div className="flex justify-between">
        <span>Score:</span>
        <span className="font-medium text-green-600">
          {food.profileScore || food.healthScore}
        </span>
      </div>
    </div>
    {food.warnings?.length > 0 && (
      <div className="mt-2 text-xs text-yellow-600">⚠️ {food.warnings[0]}</div>
    )}
    <button
      onClick={onSelect}
      className="w-full mt-3 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
    >
      Hinzufügen
    </button>
  </div>
);

export default FoodSearch;
