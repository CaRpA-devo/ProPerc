import { useMemo, useState } from "react";
import { DashboardLayout } from "../layouts/dashboard.layout.jsx";
import Aurora from "../animations/aurora.animation.ani.jsx";

// --- Beispielinhalte ---
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
// --- Roadmap: ersetzt die bisherige ROADMAP ---
const ROADMAP = [
  {
    id: "r-deficiency-alert",
    title: "Benachrichtigung bei Mangel von Nährstoff",
    description:
      "Warnungen, wenn die tägliche Aufnahme unter den Referenzwerten liegt – inkl. Hinweise, wie du Lücken schließen kannst.",
    status: "planned",
    target: "2025 Q4",
  },
  {
    id: "r-specialization",
    title:
      "Ausbau der Spezialisierung je nach Zweck der Nutzung (Nur Abnehmen, Muskelaufbau, Gesundheit)",
    description:
      "Personalisierte Empfehlungen und Oberflächen je Ziel: Abnehmen, Muskelaufbau oder allgemeine Gesundheit.",
    status: "building",
    target: "2025 Q4",
  },
  {
    id: "r-intolerances",
    title:
      "Mehr Rücksicht auf Nahrungsmittelunverträglichkeiten (Allergien, Krankheiten)",
    description:
      "Filter, Warnungen und Alternativen basierend auf deinen Profilangaben zu Allergien und Unverträglichkeiten.",
    status: "building",
    target: "2025 Q4",
  },
  {
    id: "r-diet-models",
    title: "Mehr Rücksicht auf alternative Ernährungsmodelle",
    description:
      "Bessere Voreinstellungen, Filter und Vorschläge für verschiedene Ernährungsformen.",
    status: "building",
    target: "2025 Q4",
  },
  {
    id: "r-scanner",
    title: "Scanner (Nährstofftabelle oder Barcode)",
    description:
      "Lebensmittel per Barcode scannen oder Nährwerttabelle fotografieren und automatisch erkennen lassen.",
    status: "planned",
    target: "2026 Q1",
  },
  {
    id: "r-user-add-food",
    title: "User können fehlende Nahrungsmittel nachtragen",
    description:
      "Community-getriebene Ergänzungen mit Moderation & Plausibilitätschecks.",
    status: "planned",
    target: "2025 Q4",
  },
  {
    id: "r-profiles-social",
    title: "Ausbau Userprofile und Möglichkeit zum Austausch und Kommunikation",
    description:
      "Erweiterte Profile, Kommentare/Feedback zu Einträgen und optionale soziale Features.",
    status: "building",
    target: "2025 Q4",
  },
  {
    id: "r-recipes",
    title: "Rezepte / Kochbuch",
    description:
      "Kuratierte Rezepte mit Nährwerten, Filter nach Zielen/Unverträglichkeiten und einfacher Planung.",
    status: "planned",
    target: "2025 Q1",
  },
];

// --- Badge mit deutschen Labels (optional, schön clean) ---
const statusStyle = {
  shipped: "badge-success",
  building: "badge-warning",
  planned: "badge-info",
  idea: "badge-ghost",
};
const statusLabel = {
  shipped: "veröffentlicht",
  building: "in Arbeit",
  planned: "geplant",
  idea: "Idee",
};
function StatusBadge({ status }) {
  return (
    <span className={`badge ${statusStyle[status] || "badge-ghost"} uppercase`}>
      {statusLabel[status] ?? status}
    </span>
  );
}

export default function NewsPage() {
  const [tab, setTab] = useState("news");
  const [query, setQuery] = useState("");

  const filteredNews = useMemo(() => {
    const q = query.toLowerCase();
    return NEWS.filter(
      (n) =>
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q)
    ).sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [query]);

  const filteredRoadmap = useMemo(() => {
    const q = query.toLowerCase();
    return ROADMAP.filter(
      (r) =>
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    ).sort((a, b) => a.status.localeCompare(b.status));
  }, [query]);

  return (
    <DashboardLayout>
      <div className="relative min-h-[100svh] bg-base-200 overflow-hidden">
        {/* Aurora */}
        <div className="absolute inset-0 opacity-20">
          <Aurora
            colorStops={["#2eb872", "#ffd166", "#118ab2"]}
            blend={0.4}
            amplitude={1.2}
            speed={0.3}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-primary mb-2">
            Neuigkeiten & Roadmap
          </h1>
          <p className="text-base-content/80 mb-8">
            Hier findest du aktuelle Änderungen und einen Ausblick auf kommende
            Features.
          </p>

          {/* Tabs & Suche */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div role="tablist" className="tabs tabs-boxed">
              <button
                role="tab"
                className={`tab ${tab === "news" ? "tab-active" : ""}`}
                onClick={() => setTab("news")}
              >
                Neuigkeiten
              </button>
              <button
                role="tab"
                className={`tab ${tab === "roadmap" ? "tab-active" : ""}`}
                onClick={() => setTab("roadmap")}
              >
                Roadmap
              </button>
            </div>

            <input
              type="text"
              className="input input-bordered w-full md:w-64"
              placeholder="Suche nach Titel oder Beschreibung..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Inhalt */}
          {tab === "news" ? (
            <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.map((n) => (
                <a
                  key={n.id}
                  href={n.link}
                  className="card bg-base-100 shadow-md hover:shadow-xl transition-all rounded-2xl"
                >
                  <div className="card-body text-left">
                    <span className="text-xs opacity-70">
                      {new Date(n.date).toLocaleDateString()}
                    </span>
                    <h3 className="card-title mt-1">{n.title}</h3>
                    <p className="text-base-content/80">{n.summary}</p>
                  </div>
                </a>
              ))}
              {filteredNews.length === 0 && (
                <div className="opacity-70">Keine Einträge gefunden.</div>
              )}
            </section>
          ) : (
            <section className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRoadmap.map((r) => (
                <div
                  key={r.id}
                  className="card bg-base-100 shadow-md rounded-2xl hover:shadow-xl transition-all"
                >
                  <div className="card-body text-left">
                    <div className="flex items-center justify-between mb-1">
                      <StatusBadge status={r.status} />
                      <span className="text-xs opacity-70">{r.target}</span>
                    </div>
                    <h3 className="card-title">{r.title}</h3>
                    <p className="text-base-content/80">{r.description}</p>
                  </div>
                </div>
              ))}
              {filteredRoadmap.length === 0 && (
                <div className="opacity-70">Keine Features gefunden.</div>
              )}
            </section>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
