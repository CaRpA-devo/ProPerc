import { SectionWrapper } from "../atoms/sectionwrapper.comp";
import { ImageTextCard } from "../molecules/image_text_card.comp.jsx";

export function LandingCard() {
  return (
    <>
      <section className="flex bg-base-100 flex-col sm:gap-24 sm:p-8">
        {/* Card one */}
        <SectionWrapper position="center">
          <ImageTextCard
            imageSrc="/src/assets/img/rezepte.jpg"
            imageAlt="Modern building"
            category="Ernährungsplanung"
            title="Leckere Rezepte für jeden Tag"
            description="Personalisierte Ernährungspläne basierend auf Ihren Zielen und Vorlieben."
            buttonText="Mehr erfahren"
            listItems={[
              "Personalisiert für Sie",
              "Wissenschaftlich fundiert",
              "Einfach zu verwenden",
            ]}
            containerClass="md:hover:scale-105 transition-transform duration-300 "
          />
        </SectionWrapper>

        {/* Card Two */}
        <SectionWrapper position="center">
          <ImageTextCard
            imageSrc="/src/assets/img/ernährungsplan.jpg"
            imageAlt="Modern building"
            category="Fitness Tracking"
            title="Ihr Fortschritt, jederzeit im Blick"
            description="Verfolgen Sie Ihre Trainings- und Ernährungsfortschritte und bleiben Sie motiviert."
            buttonText="Mehr erfahren"
            reverse={true}
            listItems={[
              "Detailliertes Aktivitätstracking",
              "Automatische Fortschrittsanalysen",
              "Individuelle Trainingsziele",
            ]}
            containerClass="md:hover:scale-105 transition-transform duration-300"
          />
        </SectionWrapper>

        {/* Card Three */}
        <SectionWrapper position="center">
          <ImageTextCard
            imageSrc="/src/assets/img/tracking.jpg"
            imageAlt="Modern building"
            category="Gesunde Rezepte"
            title="Genuss ohne Verzicht"
            description="Entdecken Sie leckere und gesunde Rezepte für jeden Tag."
            buttonText="Mehr erfahren"
            listItems={[
              "Kalorien- und Nährwertangaben",
              "Rezepte für jede Ernährungsform",
              "Einfache Schritt-für-Schritt-Anleitungen",
            ]}
            containerClass="md:hover:scale-105 transition-transform duration-300"
          />
        </SectionWrapper>

        {/* Card Four */}
        <SectionWrapper position="center">
          <ImageTextCard
            imageSrc="/src/assets/img/community.jpg"
            imageAlt="Modern building"
            category="Community & Support"
            title="Gemeinsam zum Ziel"
            description="Verbinden Sie sich mit Gleichgesinnten und erhalten Sie Unterstützung."
            buttonText="Mehr erfahren"
            reverse={true}
            listItems={[
              "Motivation durch Austausch",
              "Tipps von erfahrenen Coaches",
              "Exklusive Challenges & Gruppen",
            ]}
            containerClass="md:hover:scale-105 transition-transform duration-300"
          />
        </SectionWrapper>

        {/* Card Five */}
        <SectionWrapper position="center">
          <ImageTextCard
            imageSrc="/src/assets/img/tippswissen.jpg"
            imageAlt="Modern building"
            category="Tipps & Wissen"
            title="Wissen, das weiterbringt"
            description="Erhalten Sie wertvolle Tipps und erweitern Sie Ihr Gesundheitswissen."
            buttonText="Mehr erfahren"
            listItems={[
              "Artikel zu Ernährung & Fitness",
              "Wissenschaftlich geprüfte Inhalte",
              "Regelmäßige Updates & Insights",
            ]}
            containerClass="md:hover:scale-105 transition-transform duration-300"
          />
        </SectionWrapper>

        {/* Card Six */}
        <SectionWrapper position="center">
          <ImageTextCard
            imageSrc="/src/assets/img/appfeatures.jpg"
            imageAlt="Modern building"
            category="App Features"
            title="Alles in einer App"
            description="Nutzen Sie alle Features unserer App für maximalen Erfolg."
            buttonText="Mehr erfahren"
            reverse={true}
            listItems={[
              "Einfache Bedienung & modernes Design",
              "Individuelle Benachrichtigungen",
              "Kompatibel mit Smartwatches",
            ]}
            containerClass="md:hover:scale-105 transition-transform duration-300"
          />
        </SectionWrapper>
      </section>
    </>
  );
}
