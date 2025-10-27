import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const NEWS = [
  {
    id: "n-1",
    date: "2025-10-22",
    title: "Lebensmittelsuche verbessert",
    summary:
      "Schnellere API-Antwortzeiten und klarere Anzeige der wichtigsten Nährstoffe.",
    link: "#",
  },
  {
    id: "n-2",
    date: "2025-10-23",
    title: "Profilseite & About-Us hinzugefügt",
    summary:
      "Profiltexte (Bio, Wohnort, Beruf, Hobbys) sowie Teamvorstellung implementiert.",
    link: "#",
  },
  {
    id: "n-3",
    date: "2025-10-24",
    title: "Planer hinzugefügt",
    summary:
      "Implementierung eines Kalenders zur Planung der Mahlzeiten kommender Tage.",
    link: "#",
  },
];

export default function NewsBox() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NEWS.length);
    }, 5000); // Wechsle alle 5 Sekunden

    return () => clearInterval(interval);
  }, []);

  const currentNews = NEWS[currentIndex];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="p-3 rounded-lg h-full flex flex-col bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-800/30">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">📰</span>
        <h3 className="text-sm font-semibold text-white">News</h3>
        <span className="ml-auto text-xs text-white/60">
          {currentIndex + 1} / {NEWS.length}
        </span>
      </div>

      <div className="flex-1 bg-white/10 rounded-lg p-3 border border-white/20">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-white/70">
            {formatDate(currentNews.date)}
          </span>
          <Icon
            icon="mdi:newspaper-variant"
            className="text-white/40 text-lg"
          />
        </div>

        <h4 className="text-sm font-semibold text-white mb-2">
          {currentNews.title}
        </h4>

        <p className="text-xs text-white/80 leading-relaxed">
          {currentNews.summary}
        </p>
      </div>

      {/* Indikatoren */}
      <div className="flex gap-1 mt-2 justify-center">
        {NEWS.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentIndex ? "w-6 bg-white/80" : "w-1 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
