import React from "react";

const PersonalizedDietBox = ({ userData }) => {
  // Personalisierte Ernährungsempfehlungen basierend auf Esser-Typ und Allergien
  const getDietaryInfo = () => {
    // Normalize incoming values because frontend and backend may use EN keys
    const rawDiet = (userData?.dietType || "omnivore").toString();
    const dietTypeKey = rawDiet.toLowerCase();

    const rawGoal = userData?.goal ?? userData?.goals ?? "maintain";
    const goalsArr = Array.isArray(rawGoal) ? rawGoal : [rawGoal];

    const mapGoal = (g) => {
      if (!g) return "";
      const s = g.toString().toLowerCase();
      if (s === "lose" || s.includes("weight") || s.includes("abnehm"))
        return "Gewichtsverlust";
      if (s === "gain" || s.includes("muscle") || s.includes("gain"))
        return "Muskelaufbau";
      if (s === "maintain" || s.includes("maintain")) return "Erhaltung";
      return g;
    };

    const goals = goalsArr.map(mapGoal).filter(Boolean);

    const allergies = userData?.allergies || [];
    const age = userData?.age;
    const gender = userData?.gender;
    const weight = userData?.weight;
    const height = userData?.height;

    // Map activityLevel keys from profile to descriptive German keys used below
    const act = (userData?.activityLevel || "").toString().toLowerCase();
    let activityLevel = "";
    if (act.includes("sedent") || act === "sedentary")
      activityLevel = "wenig aktiv";
    else if (act === "light" || act.includes("light"))
      activityLevel = "leicht aktiv";
    else if (act === "moderate") activityLevel = "mäßig aktiv";
    else if (act === "active") activityLevel = "aktiv";
    else if (
      act === "very_active" ||
      act.includes("very") ||
      act.includes("extrem")
    )
      activityLevel = "sehr aktiv";

    let info = {
      focus: [],
      avoid: [],
      ideal: [],
    };

    // Basierend auf Ernährungstyp (akzeptiere mehrere Bezeichnungen)
    if (/(vegetar|vegetarisch)/.test(dietTypeKey)) {
      info.focus = [
        "Pflanzliches Protein (Hülsenfrüchte, Quinoa)",
        "Eisen aus pflanzlichen Quellen",
        "B12 supplementieren",
      ];
      info.avoid = ["Fleisch", "Fisch"];
      info.ideal = ["Linsen", "Bohnen", "Tofu", "Nüsse", "Vollkornprodukte"];
    } else if (/vegan/.test(dietTypeKey)) {
      info.focus = [
        "Pflanzliches Protein",
        "Omega-3 aus Leinsamen/Walnüssen",
        "B12, D3 supplementieren",
        "Calcium aus grünem Gemüse",
      ];
      info.avoid = ["Alle tierischen Produkte"];
      info.ideal = ["Vegane Proteinquellen", "Hülsenfrüchte", "Avocado"];
    } else if (/keto/.test(dietTypeKey)) {
      info.focus = [
        "Hohes Fett, moderates Protein",
        "Gesunde Fette",
        "Minimale Kohlenhydrate (<50g)",
        "Elektrolyte ausgleichen",
      ];
      info.avoid = ["Brot", "Reis", "Pasta", "Früchte", "Stärke"];
      info.ideal = ["Fisch", "Eier", "Avocado", "Nüsse", "Gemüse"];
    } else if (/low[- ]?carb|lowcarb/.test(dietTypeKey)) {
      info.focus = [
        "Reduzierte Kohlenhydrate",
        "Gemüse und proteinreiche Lebensmittel",
      ];
      info.avoid = ["Zucker", "Weißmehl", "verarbeitete Lebensmittel"];
      info.ideal = ["Gemüse", "Magerprotein", "Nüsse"];
    } else if (/paleo/.test(dietTypeKey)) {
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
    } else {
      // default omnivore / allesesser
      info.focus = ["Ausgewogene Makronährstoffe", "Vielseitige Ernährung"];
      info.avoid = ["Übermäßig verarbeitete Lebensmittel"];
      info.ideal = ["Vollwertige Lebensmittel", "Vielseitige Ernährung"];
    }

    // Allergien-basierte Warnungen hinzufügen
    if (Array.isArray(allergies) && allergies.length > 0) {
      info.avoid = [...info.avoid, ...allergies.map((a) => `${a} (Allergie)`)];
    }

    // Persönliche Fokus-Empfehlungen basierend auf Goals
    if (goals.length > 0) {
      if (goals.includes("Gewichtsverlust")) {
        info.focus.unshift("Kaloriendefizit beachten");
        info.focus.unshift("Hohes Sättigungsgefühl durch Ballaststoffe");
        info.ideal.unshift("Gemüse", "Mageres Protein");
      }
      if (goals.includes("Muskelaufbau")) {
        info.focus.unshift("Hohe Proteinaufnahme (z.B. 1.6-2.2g/kg)");
        info.focus.unshift("Ausreichend Kohlenhydrate für Training");
        info.ideal.unshift("Hühnchen", "Eier", "Quinoa");
      }
      if (goals.includes("Erhaltung")) {
        info.focus.unshift("Ausgewogene Kalorienzufuhr zur Erhaltung");
      }
    }

    // Aktivitätslevel-basierte Empfehlungen
    if (activityLevel === "sehr aktiv") {
      info.focus.push("Erhöhte Kalorien- und Proteinzufuhr");
      info.focus.push("Hydration beachten (2-3L Wasser/Tag)");
    } else if (activityLevel === "aktiv" || activityLevel === "mäßig aktiv") {
      info.focus.push("Ausgewogene Makronährstoffverteilung");
    } else if (
      activityLevel === "leicht aktiv" ||
      activityLevel === "wenig aktiv"
    ) {
      info.focus.push("Moderate Kalorienzufuhr und Bewegung");
    }

    // Alters- und Gender-spezifische Empfehlungen
    if (age && age > 50) {
      info.focus.push("Calcium für Knochengesundheit");
      info.focus.push("Vitamin D und B12 beachten");
    }
    if (gender && gender.toString().toLowerCase().startsWith("m")) {
      info.focus.push("Ausreichend Protein für Muskelmasse");
    }
    if (
      gender &&
      gender.toString().toLowerCase().startsWith("w") &&
      age &&
      age < 50
    ) {
      info.focus.push("Eisen (besonders vegetarisch/vegan)");
      info.focus.push("Folsäure für Reproduktionsgesundheit");
    }

    // Maximal 5 Punkte / 3 Vermeiden / 3 Ideal für Übersichtlichkeit
    info.focus = Array.from(new Set(info.focus)).slice(0, 5);
    info.avoid = Array.from(new Set(info.avoid)).slice(0, 3);
    info.ideal = Array.from(new Set(info.ideal)).slice(0, 3);

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
