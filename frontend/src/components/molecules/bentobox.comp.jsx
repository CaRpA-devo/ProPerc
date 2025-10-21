import "../molecules/bentobox.style.css";
import { UserProfileCard } from "./user-profile-card.comp";
import MacroDiagram from "./macro-diagram.comp";
import MotivationBox from "./motivation-box.comp";
import TodayStatusBox from "./today-status.comp";
import { useCalculator } from "../../hooks/useCalculator";
import { useProfile } from "../../hooks/useProfile";
import { useEffect, useRef, useState } from "react";

export function BentoBox() {
  const { userData } = useProfile();
  const { calculateMacros, calculations, loading, error } = useCalculator();
  const hasCalculatedRef = useRef(false);
  const [motivationQuote, setMotivationQuote] = useState({
    text: "",
    author: "",
  });

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

  // Wähle einen zufälligen Spruch beim Laden der Komponente
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * nutritionMotivations.length);
    setMotivationQuote(nutritionMotivations[randomIndex]);
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
    <>
      <section className="p-2 hero-section bg-base-200 border border-green-800/30">
        {/* User Profile - Links (großer Bereich) */}
        <div className="col-left col">
          <div>
            <UserProfileCard />
          </div>
          <div>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="loading loading-spinner loading-md"></div>
                <span className="ml-2">Berechne Makros...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full text-error">
                <span>Fehler beim Laden</span>
              </div>
            ) : (
              <MacroDiagram calculations={calculations} />
            )}
          </div>
        </div>

        {/* Rechte Spalte - 4 Boxen (2 oben, 2 unten) */}
        <div className="col-right col">
          {/* Obere Reihe - 2 Boxen */}
          <div className="flex gap-1 h-full mb-1">
            <div className="flex-1 p-2 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30 rounded flex flex-col items-center justify-center text-center">
              <h3 className="text-xs font-semibold text-white mb-1">
                💚 Motivation
              </h3>
              <blockquote className="text-xs text-white/90 italic mb-1">
                "{motivationQuote.text}"
              </blockquote>
              <cite className="text-xs text-white/70">
                — {motivationQuote.author}
              </cite>
            </div>
            <div className="flex-1 p-2 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30 rounded flex flex-col items-center justify-center text-center">
              <h3 className="text-xs font-semibold text-white mb-1">
                💪 Muskelaufbau
              </h3>
              <p className="text-xs text-white/80">Kraft & Masse aufbauen</p>
            </div>
          </div>

          {/* Untere Reihe - 2 Boxen */}
          <div className="flex gap-1 h-full">
            <div className="flex-1">
              <TodayStatusBox calculations={calculations} userData={userData} />
            </div>
            <div className="flex-1">
              <MotivationBox userData={userData} calculations={calculations} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
