import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { Button } from "../atoms/button.comp";
import { useBackendFood } from "../../context/BackendFoodContext";
import { useCalculator } from "../../hooks/useCalculator";
import { useProfile } from "../../hooks/useProfile";
import { useFoodApi } from "../../hooks/useFoodApi";
import FoodSearch from "../molecules/food-search.comp";

const FoodPage = () => {
  const navigate = useNavigate();
  const { formData: userData } = useProfile();
  const { calculations } = useCalculator();
  const {
    todayFoods,
    waterIntake,
    savedRecipes,
    favoriteFoods,
    addFood,
    removeFood,
    updateWater,
    saveRecipe,
    removeRecipe,
    addToFavorites,
    removeFromFavorites,
    getTodayCalories,
    getTodayMacros,
  } = useBackendFood();

  const [activeTab, setActiveTab] = useState("today");
  const {
    recommendations,
    loading: apiLoading,
    error: apiError,
  } = useFoodApi();

  // Berechnungen
  const todayCalories = getTodayCalories();
  const todayMacros = getTodayMacros();
  const calorieTarget = calculations?.calorieTarget || 2000;
  const macros = calculations?.macros;

  const calorieProgress = Math.min((todayCalories / calorieTarget) * 100, 100);
  const waterProgress = Math.min((waterIntake / 8) * 100, 100);

  // Makro-Fortschritt
  const proteinTarget = macros?.protein?.g || 150;
  const fatTarget = macros?.fat?.g || 80;
  const carbsTarget = macros?.carbs?.g || 200;

  const proteinProgress = Math.min(
    (todayMacros.protein / proteinTarget) * 100,
    100
  );
  const fatProgress = Math.min((todayMacros.fat / fatTarget) * 100, 100);
  const carbsProgress = Math.min((todayMacros.carbs / carbsTarget) * 100, 100);

  // Status-Farben
  const getStatusColor = (progress) => {
    if (progress >= 100) return "text-green-600";
    if (progress >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressBarColor = (progress) => {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <DashboardLayout>
      <section className="p-6 flex justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Ernährung & Tracking
          </h1>
          <p className="text-base-content/80 mb-4">
            Verfolge deine Mahlzeiten, Kalorien und Makronährstoffe
          </p>
          <Button
            onClick={() => navigate("/add-food-local")}
            className="mt-4 bg-primary/20 backdrop-blur-sm border border-primary/30 hover:bg-primary/30 text-primary"
          >
            🍽️ Essen hinzufügen
          </Button>
        </div>
      </section>

      {/* Tabs */}
      <section className="p-6 flex justify-center border border-base-300 rounded-lg bg-base-200 max-w-5xl mx-auto mb-6">
        <div className="flex space-x-1 bg-base-100 p-1 rounded-lg w-full">
          {[
            { id: "today", label: "Heute", icon: "📊" },
            { id: "recipes", label: "Rezepte", icon: "👨‍🍳" },
            { id: "favorites", label: "Favoriten", icon: "💚" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-green-500/20 backdrop-blur-sm border border-green-500/30 text-green-400 shadow-sm"
                  : "text-base-content/60 hover:text-base-content"
              }`}
            >
              <span className="mr-2 text-sm">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Heute Tab */}
      {activeTab === "today" && (
        <section className="p-6 flex justify-center border border-base-300 rounded-lg bg-base-200 max-w-5xl mx-auto mb-6">
          <div className="w-full space-y-6">
            {/* Übersicht */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Kalorien */}
              <div className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-300">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-base-content">
                    Kalorien
                  </h3>
                  <span
                    className={`text-2xl font-bold ${getStatusColor(
                      calorieProgress
                    )}`}
                  >
                    {todayCalories} / {calorieTarget}
                  </span>
                </div>
                <div className="w-full bg-base-300 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(
                      calorieProgress
                    )}`}
                    style={{ width: `${Math.min(calorieProgress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-base-content/60 mt-2">
                  {calorieProgress >= 100
                    ? "Ziel erreicht! 🎉"
                    : `${Math.round(calorieTarget - todayCalories)} kcal übrig`}
                </p>
              </div>

              {/* Wasser */}
              <div
                className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-300"
                key={`water-section-${waterIntake}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-base-content">
                    Wasser
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateWater(-1)}
                      className="w-6 h-6 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary/30 transition-colors text-sm"
                      disabled={waterIntake <= 0}
                    >
                      ➖
                    </button>
                    <span
                      className={`text-2xl font-bold ${getStatusColor(
                        waterProgress
                      )}`}
                    >
                      {waterIntake} / 8
                    </span>
                    <button
                      onClick={() => updateWater(1)}
                      className="w-6 h-6 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary/30 transition-colors text-sm"
                      disabled={waterIntake >= 8}
                    >
                      ➕
                    </button>
                  </div>
                </div>
                <div className="w-full bg-base-300 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(
                      waterProgress
                    )}`}
                    style={{ width: `${Math.min(waterProgress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-base-content/60 mt-2">
                  {waterProgress >= 100
                    ? "Hydriert! 💧"
                    : `${8 - waterIntake} Gläser übrig`}
                </p>
              </div>

              {/* Makros */}
              <div className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-300">
                <h3 className="text-lg font-semibold text-base-content mb-4">
                  Makronährstoffe
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-red-600 font-medium">Protein</span>
                      <span className="text-base-content/60">
                        {Math.round(todayMacros.protein)}g / {proteinTarget}g
                      </span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(proteinProgress, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-yellow-600 font-medium">Fett</span>
                      <span className="text-base-content/60">
                        {Math.round(todayMacros.fat)}g / {fatTarget}g
                      </span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(fatProgress, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-600 font-medium">Carbs</span>
                      <span className="text-base-content/60">
                        {Math.round(todayMacros.carbs)}g / {carbsTarget}g
                      </span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(carbsProgress, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Empfohlene Nahrungsmittel */}
            {recommendations.foods.length > 0 && (
              <div className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-300 mb-6">
                <h3 className="text-lg font-semibold text-base-content mb-4">
                  Empfohlene Nahrungsmittel für dich
                </h3>
                <p className="text-sm text-base-content/60 mb-4">
                  Basierend auf deinen Allergien (
                  {userData?.allergies?.join(", ") || "Keine"}) und
                  Ernährungsweise ({userData?.dietType || "Allesesser"})
                </p>
                <FoodSearch showRecommendations={true} />
              </div>
            )}

            {/* Heute's Mahlzeiten */}
            <div className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-300">
              <h3 className="text-lg font-semibold text-base-content mb-4">
                Heute's Mahlzeiten
              </h3>
              {todayFoods.length === 0 ? (
                <div className="text-center py-8 text-base-content/60">
                  <div className="text-4xl mb-2">🍽️</div>
                  <p>Noch keine Mahlzeiten hinzugefügt</p>
                  <p className="text-sm">
                    Klicke auf "🍽️ Essen hinzufügen" um zu beginnen
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todayFoods.map((food) => (
                    <div
                      key={food.id}
                      className="flex items-center justify-between p-3 bg-base-200 rounded-lg border border-green-800/30"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{food.name}</h4>
                        <div className="flex space-x-4 text-sm text-white/80">
                          <span>{Math.round(food.calories)} kcal</span>
                          <span>P: {Math.round(food.protein * 10) / 10}g</span>
                          <span>F: {Math.round(food.fat * 10) / 10}g</span>
                          <span>C: {Math.round(food.carbs * 10) / 10}g</span>
                          <span>Menge: {food.quantity}x</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => addToFavorites(food)}
                          className="text-green-400 hover:text-green-300 transition-colors bg-green-500/20 backdrop-blur-sm border border-green-500/30 hover:bg-green-500/30 px-1.5 py-1 rounded text-xs"
                          title="Zu Favoriten hinzufügen"
                        >
                          <span className="text-sm">💚</span>
                        </button>
                        <button
                          onClick={() => removeFood(food.id)}
                          className="text-red-400 hover:text-red-300 transition-colors bg-red-500/20 backdrop-blur-sm border border-red-500/30 hover:bg-red-500/30 px-1.5 py-1 rounded text-xs"
                          title="Entfernen"
                        >
                          <span className="text-sm">❌</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Rezepte Tab */}
      {activeTab === "recipes" && (
        <section className="p-6 flex justify-center border border-base-300 rounded-lg bg-base-200 max-w-5xl mx-auto mb-6">
          <div className="w-full">
            <h3 className="text-lg font-semibold text-base-content mb-4">
              Meine Rezepte
            </h3>
            {savedRecipes.length === 0 ? (
              <div className="text-center py-8 text-base-content/60">
                <div className="text-4xl mb-2">👨‍🍳</div>
                <p>Noch keine Rezepte gespeichert</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-base-100 border border-green-800/30 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium text-white mb-2">
                      {recipe.name}
                    </h4>
                    <div className="text-sm text-white/80 space-y-1">
                      <div>{Math.round(recipe.calories)} kcal</div>
                      <div>P: {Math.round(recipe.protein * 10) / 10}g</div>
                      <div>F: {Math.round(recipe.fat * 10) / 10}g</div>
                      <div>C: {Math.round(recipe.carbs * 10) / 10}g</div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <Button
                        size="sm"
                        onClick={() => addFood(recipe)}
                        className="text-xs bg-green-500/20 backdrop-blur-sm border border-green-500/30 hover:bg-green-500/30 text-green-400 px-3 py-1"
                      >
                        <span className="text-sm">➕</span> Hinzufügen
                      </Button>
                      <button
                        onClick={() => removeRecipe(recipe.id)}
                        className="text-red-400 hover:text-red-300 transition-colors text-xs bg-red-500/20 backdrop-blur-sm border border-red-500/30 hover:bg-red-500/30 px-2 py-1 rounded"
                      >
                        <span className="text-sm">❌</span> Löschen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Favoriten Tab */}
      {activeTab === "favorites" && (
        <section className="p-6 flex justify-center border border-base-300 rounded-lg bg-base-200 max-w-5xl mx-auto mb-6">
          <div className="w-full">
            <h3 className="text-lg font-semibold text-base-content mb-4">
              Meine Favoriten
            </h3>
            {favoriteFoods.length === 0 ? (
              <div className="text-center py-8 text-base-content/60">
                <div className="text-4xl mb-2">💚</div>
                <p>Noch keine Favoriten hinzugefügt</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteFoods.map((food, index) => (
                  <div
                    key={index}
                    className="bg-base-100 border border-green-800/30 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium text-white mb-2">{food.name}</h4>
                    <div className="text-sm text-white/80 space-y-1">
                      <div>{Math.round(food.calories)} kcal</div>
                      <div>P: {Math.round(food.protein * 10) / 10}g</div>
                      <div>F: {Math.round(food.fat * 10) / 10}g</div>
                      <div>C: {Math.round(food.carbs * 10) / 10}g</div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <Button
                        size="sm"
                        onClick={() => addFood(food)}
                        className="text-xs bg-green-500/20 backdrop-blur-sm border border-green-500/30 hover:bg-green-500/30 text-green-400 px-3 py-1"
                      >
                        <span className="text-sm">➕</span> Hinzufügen
                      </Button>
                      <button
                        onClick={() => removeFromFavorites(food.name)}
                        className="text-red-400 hover:text-red-300 transition-colors text-xs bg-red-500/20 backdrop-blur-sm border border-red-500/30 hover:bg-red-500/30 px-2 py-1 rounded"
                      >
                        <span className="text-sm">❌</span> Entfernen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </DashboardLayout>
  );
};

export default FoodPage;
