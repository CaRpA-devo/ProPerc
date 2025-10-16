import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { SectionWrapper } from "../atoms/sectionwrapper.comp";
import { Button } from "../atoms/button.comp";
import { useFood } from "../../context/FoodContext";
import { useCalculator } from "../../hooks/useCalculator";
import { useProfile } from "../../hooks/useProfile";
import { useFoodApi } from "../../hooks/useFoodApi";
import AdvancedFoodModal from "../molecules/advanced-food-modal.comp";
import FoodSearch from "../molecules/food-search.comp";

const FoodPage = () => {
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
  } = useFood();

  const [activeTab, setActiveTab] = useState("today");
  const [showAddFood, setShowAddFood] = useState(false);
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
      <SectionWrapper className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-emerald-900 mb-2">
                Ernährung & Tracking
              </h1>
              <p className="text-emerald-700">
                Verfolge deine Mahlzeiten, Kalorien und Makronährstoffe
              </p>
            </div>
            <Button
              onClick={() => setShowAddFood(true)}
              className="mt-4 md:mt-0"
            >
              + Essen hinzufügen
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            {[
              { id: "today", label: "Heute", icon: "📅" },
              { id: "recipes", label: "Rezepte", icon: "🍳" },
              { id: "favorites", label: "Favoriten", icon: "⭐" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Heute Tab */}
          {activeTab === "today" && (
            <div className="space-y-6">
              {/* Übersicht */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Kalorien */}
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
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
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(
                        calorieProgress
                      )}`}
                      style={{ width: `${Math.min(calorieProgress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {calorieProgress >= 100
                      ? "Ziel erreicht! 🎉"
                      : `${Math.round(
                          calorieTarget - todayCalories
                        )} kcal übrig`}
                  </p>
                </div>

                {/* Wasser */}
                <div
                  className="bg-white rounded-lg p-6 shadow-sm border"
                  key={`water-section-${waterIntake}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Wasser
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateWater(-1)}
                        className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                        disabled={waterIntake <= 0}
                      >
                        -
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
                        className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                        disabled={waterIntake >= 8}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(
                        waterProgress
                      )}`}
                      style={{ width: `${Math.min(waterProgress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {waterProgress >= 100
                      ? "Hydriert! 💧"
                      : `${8 - waterIntake} Gläser übrig`}
                  </p>
                </div>

                {/* Makros */}
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Makronährstoffe
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-600 font-medium">
                          Protein
                        </span>
                        <span className="text-gray-600">
                          {Math.round(todayMacros.protein)}g / {proteinTarget}g
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
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
                        <span className="text-yellow-600 font-medium">
                          Fett
                        </span>
                        <span className="text-gray-600">
                          {Math.round(todayMacros.fat)}g / {fatTarget}g
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(fatProgress, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-blue-600 font-medium">Carbs</span>
                        <span className="text-gray-600">
                          {Math.round(todayMacros.carbs)}g / {carbsTarget}g
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
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
                <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Empfohlene Nahrungsmittel für dich
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Basierend auf deinen Allergien (
                    {userData?.allergies?.join(", ") || "Keine"}) und
                    Ernährungsweise ({userData?.dietType || "Allesesser"})
                  </p>
                  <FoodSearch showRecommendations={true} />
                </div>
              )}

              {/* Heute's Mahlzeiten */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Heute's Mahlzeiten
                </h3>
                {todayFoods.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">🍽️</div>
                    <p>Noch keine Mahlzeiten hinzugefügt</p>
                    <p className="text-sm">
                      Klicke auf "Essen hinzufügen" um zu beginnen
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {todayFoods.map((food) => (
                      <div
                        key={food.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">
                            {food.name}
                          </h4>
                          <div className="flex space-x-4 text-sm text-gray-600">
                            <span>{Math.round(food.calories)} kcal</span>
                            <span>
                              P: {Math.round(food.protein * 10) / 10}g
                            </span>
                            <span>F: {Math.round(food.fat * 10) / 10}g</span>
                            <span>C: {Math.round(food.carbs * 10) / 10}g</span>
                            <span>Menge: {food.quantity}x</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => addToFavorites(food)}
                            className="text-yellow-500 hover:text-yellow-600 transition-colors"
                            title="Zu Favoriten hinzufügen"
                          >
                            ⭐
                          </button>
                          <button
                            onClick={() => removeFood(food.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                            title="Entfernen"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Rezepte Tab */}
          {activeTab === "recipes" && (
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Meine Rezepte
              </h3>
              {savedRecipes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">🍳</div>
                  <p>Noch keine Rezepte gespeichert</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedRecipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium text-gray-800 mb-2">
                        {recipe.name}
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>{Math.round(recipe.calories)} kcal</div>
                        <div>P: {Math.round(recipe.protein * 10) / 10}g</div>
                        <div>F: {Math.round(recipe.fat * 10) / 10}g</div>
                        <div>C: {Math.round(recipe.carbs * 10) / 10}g</div>
                      </div>
                      <div className="flex justify-between mt-3">
                        <Button
                          size="sm"
                          onClick={() => addFood(recipe)}
                          className="text-xs"
                        >
                          Hinzufügen
                        </Button>
                        <button
                          onClick={() => removeRecipe(recipe.id)}
                          className="text-red-500 hover:text-red-600 transition-colors text-xs"
                        >
                          Löschen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Favoriten Tab */}
          {activeTab === "favorites" && (
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Meine Favoriten
              </h3>
              {favoriteFoods.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">⭐</div>
                  <p>Noch keine Favoriten hinzugefügt</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteFoods.map((food, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium text-gray-800 mb-2">
                        {food.name}
                      </h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>{Math.round(food.calories)} kcal</div>
                        <div>P: {Math.round(food.protein * 10) / 10}g</div>
                        <div>F: {Math.round(food.fat * 10) / 10}g</div>
                        <div>C: {Math.round(food.carbs * 10) / 10}g</div>
                      </div>
                      <div className="flex justify-between mt-3">
                        <Button
                          size="sm"
                          onClick={() => addFood(food)}
                          className="text-xs"
                        >
                          Hinzufügen
                        </Button>
                        <button
                          onClick={() => removeFromFavorites(food.name)}
                          className="text-red-500 hover:text-red-600 transition-colors text-xs"
                        >
                          Entfernen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Advanced Food Modal */}
          <AdvancedFoodModal
            isOpen={showAddFood}
            onClose={() => setShowAddFood(false)}
          />
        </div>
      </SectionWrapper>
    </DashboardLayout>
  );
};

export default FoodPage;
