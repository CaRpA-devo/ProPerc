import React from "react";

const PersonalizedDietBox = ({ userData }) => {
  // Personalisierte Ernährungsempfehlungen basierend auf Esser-Typ und Allergien
  const getDietaryInfo = () => {
    const dietType = userData?.dietType || "Allesesser";
    const allergies = userData?.allergies || [];
    const goals = userData?.goals || [];
    const age = userData?.age;
    const gender = userData?.gender;
    const weight = userData?.weight;
    const height = userData?.height;
    const activityLevel = userData?.activityLevel;

    let info = {
      focus: [],
      avoid: [],
      ideal: [],
    };

    // Basierend auf Ernährungstyp
    switch (dietType) {
      case "Vegetarisch":
        info.focus = [
          "Pflanzliches Protein (Hülsenfrüchte, Quinoa)",
          "Eisen aus pflanzlichen Quellen",
          "B12 supplementieren",
        ];
        info.avoid = ["Fleisch", "Fisch"];
        info.ideal = ["Linsen", "Bohnen", "Tofu", "Nüsse", "Vollkornprodukte"];
        break;
      case "Vegan":
        info.focus = [
          "Pflanzliches Protein",
          "Omega-3 aus Leinsamen/Walnüssen",
          "B12, D3 supplementieren",
          "Calcium aus grünem Gemüse",
        ];
        info.avoid = ["Alle tierischen Produkte"];
        info.ideal = ["Vegane Proteinquellen", "Hülsenfrüchte", "Avocado"];
        break;
      case "Keto":
        info.focus = [
          "Hohes Protein",
          "Gesunde Fette",
          "Minimale Kohlenhydrate (<50g)",
          "Elektrolyte ausgleichen",
        ];
        info.avoid = ["Brot", "Reis", "Pasta", "Früchte", "Stärke"];
        info.ideal = ["Fisch", "Eier", "Avocado", "Nüsse", "Gemüse"];
        break;
      case "Low-Carb":
        info.focus = [
          "Komplexe Kohlenhydrate",
          "Gemüse und proteinreiche Lebensmittel",
        ];
        info.avoid = ["Zucker", "Weißmehl", "verarbeitete Lebensmittel"];
        info.ideal = ["Gemüse", "Magerprotein", "Vollkornprodukte"];
        break;
      case "Paleo":
        info.focus = [
          "Vollwertige Lebensmittel",
          "Reichlich Obst und Gemüse",
          "Mageres Fleisch und Fisch",
        ];
        info.avoid = [
          "Getreide",
          "Hülsenfrüchte",
          "Milchprodukte",
          "Verarbeitetes Essen",
        ];
        info.ideal = ["Mageres Fleisch", "Fisch", "Obst", "Gemüse", "Nüsse"];
        break;
      default: // Allesesser
        info.focus = ["Ausgewogene Makronährstoffe", "Vielseitige Ernährung"];
        info.avoid = ["Übermäßig verarbeitete Lebensmittel"];
        info.ideal = ["Vollwertige Lebensmittel", "Vielseitige Ernährung"];
    }

    // Allergien-basierte Warnungen hinzufügen
    if (allergies.length > 0) {
      info.avoid = [...info.avoid, ...allergies.map((a) => `${a} (Allergie)`)];
    }

    // Persönliche Fokus-Empfehlungen basierend auf Zielen und Aktivitätslevel
    if (goals.length > 0 || activityLevel) {
      if (goals.includes("Gewichtsverlust") || goals.includes("Abnehmen")) {
        info.focus.unshift("Kaloriendefizit beachten");
        info.focus.unshift("Hohes Sättigungsgefühl durch Ballaststoffe");
        info.ideal.unshift("Gemüse", "Mageres Protein");
      }
      if (goals.includes("Muskelaufbau")) {
        info.focus.unshift("Hohe Proteinaufnahme (>2g/kg Körpergewicht)");
        info.focus.unshift("Ausreichend Kohlenhydrate für Training");
        info.ideal.unshift("Hühnchen", "Eier", "Quinoa");
      }
      if (goals.includes("Ausdauer") || goals.includes("Fitness")) {
        info.focus.unshift("Komplexe Kohlenhydrate für Energie");
        info.focus.unshift("Regeneration durch ausreichend Eiweiß");
      }
    }

    // Aktivitätslevel-basierte Empfehlungen
    if (activityLevel === "sehr aktiv" || activityLevel === "extrem aktiv") {
      info.focus.push("Erhöhte Kalorien- und Proteinzufuhr");
      info.focus.push("Hydration beachten (2-3L Wasser/Tag)");
    }
    if (activityLevel === "leicht aktiv" || activityLevel === "mäßig aktiv") {
      info.focus.push("Ausgewogene Makronährstoffverteilung");
    }

    // Alters- und Gender-spezifische Empfehlungen
    if (age && age > 50) {
      info.focus.push("Calcium für Knochengesundheit");
      info.focus.push("Vitamin D und B12 beachten");
    }
    if (gender === "männlich") {
      info.focus.push("Ausreichend Protein für Muskelmasse");
    }
    if (gender === "weiblich" && age && age < 50) {
      info.focus.push("Eisen (besonders vegetarisch/vegan)");
      info.focus.push("Folsäure für Reproduktionsgesundheit");
    }

    // Maximal 4-5 Punkte für bessere Übersichtlichkeit
    info.focus = info.focus.slice(0, 5);
    info.avoid = info.avoid.slice(0, 3);
    info.ideal = info.ideal.slice(0, 3);

    return info;
  };

  const dietInfo = getDietaryInfo();

  return (
    <div className="flex-1 p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30 rounded flex flex-col overflow-y-auto">
      <h3 className="text-sm font-semibold text-white mb-3 text-center">
        🎯 Deine Ernährung
      </h3>

      <div className="space-y-3 text-xs flex-1">
        {/* Fokusbereich */}
        {dietInfo.focus.length > 0 && (
          <div>
            <p className="text-green-400 font-semibold mb-1">✓ Fokus:</p>
            <ul className="list-disc list-inside space-y-0.5 text-white/90">
              {dietInfo.focus.map((item, index) => (
                <li key={index} className="leading-tight text-xs">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Vermeiden */}
        {dietInfo.avoid.length > 0 && (
          <div className="border-t border-white/20 pt-2">
            <p className="text-red-400 font-semibold mb-1">⚠ Vermeiden:</p>
            <ul className="list-disc list-inside space-y-0.5 text-white/90">
              {dietInfo.avoid.map((item, index) => (
                <li key={index} className="leading-tight text-xs">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ideal */}
        {dietInfo.ideal.length > 0 && (
          <div className="border-t border-white/20 pt-2">
            <p className="text-yellow-400 font-semibold mb-1">⭐ Ideal:</p>
            <ul className="list-disc list-inside space-y-0.5 text-white/90">
              {dietInfo.ideal.map((item, index) => (
                <li key={index} className="leading-tight text-xs">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedDietBox;
