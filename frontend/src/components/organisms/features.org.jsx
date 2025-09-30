import { ImageTextCard } from "../molecules/image_text_card.comp.jsx";

export function Features() {
  const features = [
    {
      id: 1,
      title: "Ernährungsplanung",
      description:
        "Personalisierte Ernährungspläne basierend auf Ihren Zielen und Vorlieben.",
      image: "../src/assets/img/ernährungsplan.jpg",
      reverse: false,
    },
    {
      id: 2,
      title: "Fitness Tracking",
      description:
        "Verfolgen Sie Ihre Fortschritte und bleiben Sie motiviert auf Ihrem Weg.",
      image: "/src/assets/img/tracking.jpg",
      reverse: true,
    },
    {
      id: 3,
      title: "Gesunde Rezepte",
      description: "Entdecken Sie leckere und gesunde Rezepte für jeden Tag.",
      image: "/src/assets/img/rezepte.jpg",
      reverse: false,
    },
    {
      id: 4,
      title: "Community & Support",
      description:
        "Verbinden Sie sich mit Gleichgesinnten und erhalten Sie Unterstützung.",
      image: "/src/assets/img/community.jpg",
      reverse: true,
    },
    {
      id: 5,
      title: "Tipps & Wissen",
      description:
        "Erhalten Sie wertvolle Tipps und erweitern Sie Ihr Gesundheitswissen.",
      image: "/src/assets/img/tippswissen.jpg",
      reverse: false,
    },
    {
      id: 6,
      title: "App Features",
      description: "Nutzen Sie alle Features unserer App für maximalen Erfolg.",
      image: "/src/assets/img/appfeatures.jpg",
      reverse: true,
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Ihre Gesundheit, Unser Fokus
          </h2>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            Entdecken Sie alle Features von ProPerc und starten Sie noch heute
            Ihre persönliche Gesundheitsreise mit unserem ganzheitlichen Ansatz.
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-24">
          {features.map((feature) => (
            <ImageTextCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              reverse={feature.reverse}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="card bg-primary/5 border border-primary/20 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Bereit für Ihre Transformation?
            </h3>
            <p className="text-base-content/70 mb-6">
              Schließen Sie sich tausenden zufriedener Nutzer an und beginnen
              Sie noch heute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg">
                Kostenlos starten
              </button>
              <button className="btn btn-outline btn-lg">Mehr erfahren</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
