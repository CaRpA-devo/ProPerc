import { UserProfileCard } from "./user-profile-card.comp";
import MacroDiagram from "./macro-diagram.comp";
import MotivationBox from "./motivation-box.comp";
import TodayStatusBox from "./today-status.comp";
import PersonalizedDietBox from "./personalized-diet-box.comp";
import WeekGoals from "./week-goals.comp";
import TodayMeals from "./today-meals.comp";
import NewsBox from "./news-box.comp";
import { useCalculator } from "../../hooks/useCalculator";
import { useProfile } from "../../hooks/useProfile";
import { useEffect, useRef, useState } from "react";

export function BentoBox() {
  const { userData } = useProfile();
  const { calculateMacros, calculations, loading, error } = useCalculator();
  const hasCalculatedRef = useRef(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Motivationssprüche für die Ernährungsplan-Box
  const nutritionMotivations = [
    {
      text: "Gesunde Ernährung ist die beste Medizin.",
      author: "Hippokrates",
    },
    {
      text: "Du bist, was du isst. Wähle weise.",
      author: "Ludwig Feuerbach",
    },
    {
      text: "Investiere in deine Gesundheit - sie ist dein wertvollstes Gut.",
      author: "Unbekannt",
    },
    {
      text: "Jede Mahlzeit ist eine Gelegenheit, deinem Körper etwas Gutes zu tun.",
      author: "Ernährung",
    },
    {
      text: "Gesunde Ernährung ist keine Strafe, sondern ein Geschenk an dich selbst.",
      author: "Wellness",
    },
    {
      text: "Dein Körper ist dein Zuhause. Mach es zu einem schönen Ort.",
      author: "Wellness",
    },
    {
      text: "Kleine Schritte führen zu großen Veränderungen.",
      author: "Motivation",
    },
    {
      text: "Heute ist der perfekte Tag, um gesünder zu werden.",
      author: "Wellness",
    },
    {
      text: "Gesundheit ist ein Zustand vollkommener Harmonie.",
      author: "Mahatma Gandhi",
    },
    {
      text: "Jeder Tag ist ein neuer Anfang. Nutze ihn weise.",
      author: "Motivation",
    },
    {
      text: "Deine Gesundheit ist dein Reichtum. Investiere täglich in sie.",
      author: "Gesundheit",
    },
    {
      text: "Fortschritt, nicht Perfektion, ist das Ziel.",
      author: "Motivation",
    },
    {
      text: "Du bist stärker, als du denkst. Du schaffst das!",
      author: "Motivation",
    },
    {
      text: "Gesunde Gewohnheiten sind der Schlüssel zu einem gesunden Leben.",
      author: "Wellness",
    },
    {
      text: "Jede gesunde Entscheidung bringt dich deinem Ziel näher.",
      author: "Motivation",
    },
  ];

  // Rotiere Motivationssprüche alle 5 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % nutritionMotivations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Automatische Berechnung der Makros wenn Benutzerdaten verfügbar sind
  useEffect(() => {
    if (
      userData &&
      userData.weight &&
      userData.height &&
      userData.age &&
      userData.gender &&
      userData.activityLevel &&
      !loading && // Verhindere Berechnung während Loading
      !hasCalculatedRef.current // Nur einmal berechnen
    ) {
      hasCalculatedRef.current = true;
      calculateMacros(userData).catch((err) => {
        console.error("BentoBox - Calculation failed:", err);
        hasCalculatedRef.current = false; // Reset bei Fehler
      });
    }
  }, [
    userData?.weight,
    userData?.height,
    userData?.age,
    userData?.gender,
    userData?.activityLevel,
    calculateMacros,
    loading,
  ]);

  return (
    <section className="w-full max-w-[1920px] mx-auto p-4 space-y-4">
      {/* Main grid with glass effect wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 rounded-2xl bg-gradient-to-b from-black/90 to-gray-950/95 backdrop-blur-md border border-white/5 shadow-xl">
        {/* Left column (66%) - Profile & Macros */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card with glass effect */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl">
            <UserProfileCard />
          </div>

          {/* Macro Diagram with glass effect */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl">
            {loading ? (
              <div className="flex items-center justify-center p-4">
                <div className="loading loading-spinner loading-md"></div>
                <span className="ml-3">Berechne Makros...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center p-4 text-error">
                <span>Fehler beim Laden</span>
              </div>
            ) : (
              <MacroDiagram calculations={calculations} />
            )}
          </div>

          {/* Week Goals with glass effect */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl h-[400px]">
            <WeekGoals />
          </div>

          {/* Today Meals with glass effect */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl h-[400px]">
            <TodayMeals />
          </div>
        </div>

        {/* Right column (33%) - Info Cards */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upper grid row */}
          <div className="grid grid-cols-1 gap-6">
            {/* Diet Plan with glass effect - Full width */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl">
              <PersonalizedDietBox userData={userData} />
            </div>

            {/* Motivation Quote with dark gradient - Full width */}
            <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl flex flex-col justify-center items-center text-center">
              <h3 className="text-base font-semibold mb-4">💚 Motivation</h3>
              <blockquote className="text-sm italic mb-3">
                "{nutritionMotivations[currentQuoteIndex].text}"
              </blockquote>
              <cite className="text-xs text-gray-400">
                — {nutritionMotivations[currentQuoteIndex].author}
              </cite>
            </div>
          </div>{" "}
          {/* Lower grid row - Full width boxes */}
          <div className="grid grid-cols-1 gap-6 min-h-[200px]">
            {/* Today Status - Full width */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl">
              <TodayStatusBox calculations={calculations} userData={userData} />
            </div>
            {/* Weight Maintenance Box - Full width */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl">
              <MotivationBox userData={userData} calculations={calculations} />
            </div>
            {/* News Box - Full width */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl h-[250px]">
              <NewsBox />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
