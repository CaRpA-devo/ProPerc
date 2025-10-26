import { useState, useEffect } from "react";
import { DashboardLayout } from "../layouts/dashboard.layout.jsx";
import { WeekPlanner } from "../organisms/Planner/week-planner.comp.jsx";
import { ShoppingList } from "../organisms/Planner/shopping-list.comp.jsx";
import { FoodSelectionModal } from "../molecules/Planner/food-selection-modal.comp.jsx";
import { useBackendFood } from "../../context/BackendFoodContext.jsx";
import { useCalculator } from "../../hooks/useCalculator.js";
import { Button } from "../atoms/button.comp.jsx";
import { useMealPlanner } from "../../hooks/useMealPlanner.js";

export default function PlanerPage() {
  const { favoriteFoods, savedRecipes } = useBackendFood();
  const { calculations } = useCalculator();
  const calorieTarget = calculations?.calorieTarget || 2000;
  const {
    loading,
    getMealPlan,
    addMealToPlan,
    updateMealPlan,
    deleteMealPlan,
  } = useMealPlanner();

  const [activeTab, setActiveTab] = useState("week");
  const [weekDays, setWeekDays] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);

  // Initialisiere Woche und lade Mahlzeiten
  useEffect(() => {
    const initWeek = async () => {
      const today = new Date();
      const week = [];

      // Erstelle Wochenstruktur
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        week.push({
          date: date.toISOString().split("T")[0],
          meals: [],
        });
      }

      // Lade geplante Mahlzeiten vom Backend
      try {
        const startDate = week[0].date;
        const endDate = week[week.length - 1].date;
        const plannedMeals = await getMealPlan(startDate, endDate);

        // Füge geladene Mahlzeiten in die Wochenstruktur ein
        const weekWithMeals = week.map((day) => ({
          ...day,
          meals: plannedMeals
            .filter((meal) => meal.date.split("T")[0] === day.date)
            .map((meal) => ({
              id: meal._id,
              name: meal.food.name,
              calories: meal.food.calories,
              protein: meal.food.protein,
              carbs: meal.food.carbs,
              fat: meal.food.fat,
              mealType: meal.mealType,
              servings: meal.food.portion || 1,
            })),
        }));

        setWeekDays(weekWithMeals);
      } catch (err) {
        console.error("Fehler beim Laden der geplanten Mahlzeiten:", err);
        setWeekDays(week);
      }
    };

    initWeek();
  }, [getMealPlan]);

  // Generiere Shopping List aus Wochenplan
  useEffect(() => {
    const generateShoppingList = () => {
      const items = [];
      const itemMap = new Map();

      weekDays.forEach((day) => {
        day.meals.forEach((meal) => {
          const key = meal.name.toLowerCase();
          if (itemMap.has(key)) {
            itemMap.get(key).amount += 1;
          } else {
            itemMap.set(key, {
              id: `${meal.id}-${Date.now()}`,
              name: meal.name,
              amount: 1,
              unit: "Portion",
              checked: false,
              category: getCategoryFromMealType(meal.mealType),
            });
          }
        });
      });

      setShoppingList(Array.from(itemMap.values()));
    };

    generateShoppingList();
  }, [weekDays]);

  const getCategoryFromMealType = (mealType) => {
    const categoryMap = {
      breakfast: "grains",
      lunch: "protein",
      dinner: "protein",
      snack: "other",
    };
    return categoryMap[mealType] || "other";
  };

  const handleAddMeal = (date, mealType) => {
    setSelectedDate(date);
    setSelectedMealType(mealType);
    setModalOpen(true);
  };

  const handleSelectMeal = async (meal) => {
    try {
      // Füge die Mahlzeit zum Backend hinzu
      const savedMeal = await addMealToPlan({
        date: selectedDate,
        mealType: selectedMealType,
        food: {
          name: meal.name,
          portion: meal.servings || 1,
          calories: meal.calories,
          protein: meal.protein,
          carbs: meal.carbs,
          fat: meal.fat,
          source: meal.source || "favorite",
        },
      });

      // Aktualisiere die UI mit der gespeicherten Mahlzeit
      setWeekDays((prev) =>
        prev.map((day) =>
          day.date === selectedDate
            ? {
                ...day,
                meals: [
                  ...day.meals,
                  {
                    id: savedMeal._id,
                    name: meal.name,
                    calories: meal.calories,
                    protein: meal.protein,
                    carbs: meal.carbs,
                    fat: meal.fat,
                    mealType: selectedMealType,
                    servings: meal.servings || 1,
                  },
                ],
              }
            : day
        )
      );
    } catch (err) {
      console.error("Fehler beim Hinzufügen der Mahlzeit:", err);
      // Hier könnte eine Fehlermeldung für den Benutzer angezeigt werden
    }
  };

  const handleRemoveMeal = async (date, mealId, mealType) => {
    try {
      // Lösche die Mahlzeit im Backend
      await deleteMealPlan(mealId);

      // Aktualisiere die UI
      setWeekDays((prev) =>
        prev.map((day) =>
          day.date === date
            ? {
                ...day,
                meals: day.meals.filter((m) => m.id !== mealId),
              }
            : day
        )
      );
    } catch (err) {
      console.error("Fehler beim Löschen der Mahlzeit:", err);
      // Hier könnte eine Fehlermeldung für den Benutzer angezeigt werden
    }
  };

  const handleToggleShoppingItem = (itemId) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveShoppingItem = (itemId) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleAddShoppingItem = (item) => {
    setShoppingList((prev) => [...prev, item]);
  };

  const handleClearWeek = async () => {
    if (confirm("Möchtest du wirklich alle Mahlzeiten dieser Woche löschen?")) {
      try {
        // Lösche jede Mahlzeit der Woche im Backend
        const deletionPromises = weekDays
          .flatMap((day) => day.meals)
          .map((meal) => deleteMealPlan(meal.id));

        await Promise.all(deletionPromises);

        // Aktualisiere die UI
        setWeekDays((prev) => prev.map((day) => ({ ...day, meals: [] })));
      } catch (err) {
        console.error("Fehler beim Löschen der Woche:", err);
        // Hier könnte eine Fehlermeldung für den Benutzer angezeigt werden
      }
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <section className="p-6 flex justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary mb-6">Meal Planner</h1>
          <p className="text-base-content/80 text-lg mb-4">
            Plane deine Woche im Voraus und behalte den Überblick
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="p-6 flex justify-center border border-base-300 rounded-lg bg-base-200 max-w-7xl mx-auto mb-6">
        <div className="flex space-x-1 bg-base-100 p-1 rounded-lg w-full">
          {[
            { id: "week", label: "Wochenplan", icon: "📅" },
            { id: "shopping", label: "Einkaufsliste", icon: "🛒" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-200"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-12 max-w-7xl mx-auto">
        {activeTab === "week" && (
          <div className="space-y-4">
            <div className="flex justify-end gap-2">
              <Button onClick={handleClearWeek} variant="ghost" size="sm">
                Woche leeren
              </Button>
            </div>
            <WeekPlanner
              weekDays={weekDays}
              calorieTarget={calorieTarget}
              onAddMeal={handleAddMeal}
              onRemoveMeal={handleRemoveMeal}
            />
          </div>
        )}

        {activeTab === "shopping" && (
          <ShoppingList
            items={shoppingList}
            onToggleItem={handleToggleShoppingItem}
            onRemoveItem={handleRemoveShoppingItem}
            onAddItem={handleAddShoppingItem}
          />
        )}
      </section>

      {/* Food Selection Modal */}
      <FoodSelectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelectMeal}
        favorites={favoriteFoods}
        recipes={savedRecipes}
        selectedDate={selectedDate}
        selectedMealType={selectedMealType}
      />
    </DashboardLayout>
  );
}
