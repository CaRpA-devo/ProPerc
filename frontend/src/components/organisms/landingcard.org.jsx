import { SectionWrapper } from "../atoms/sectionwrapper.comp";
import { ImageTextCard } from "../molecules/image_text_card.comp.jsx";
import "../../styles/landingcard.style.css";

export function LandingCard() {
  return (
    <>
      <section className="flex glass-overlay-bg flex-col sm:gap-8 sm:p-8">
        {/* Card one */}
        <SectionWrapper position="start">
          <ImageTextCard
            imageSrc="/src/assets/img/rezepte.jpg"
            imageAlt="Modern building"
            category="Gesunde Rezepte"
            title="Leckere Rezepte für jeden Tag"
            description="Finde ausgewogene Gerichte, die schnell zubereitet sind und deinem Ziel entsprechen."
            href="#"
            containerClass="glass-overlay-bg2 "
          />
        </SectionWrapper>

        {/* Card Two */}
        <SectionWrapper position="end">
          <ImageTextCard
            imageSrc="/src/assets/img/ernährungsplan.jpg"
            imageAlt="Modern building"
            category="Persönliche Ernährungspläne"
            title="Jetzt starten"
            description="Passe Mahlzeiten an deine Ziele, Vorlieben und Allergien an einfach und smart."
            href="#"
            containerClass="glass-overlay-bg2 "
            reverse={true}
          />
        </SectionWrapper>
        {/* Card Three */}
        <SectionWrapper position="start">
          <ImageTextCard
            imageSrc="/src/assets/img/tracking.jpg"
            imageAlt="Modern building"
            category="Fortschritt & Tracking"
            title="Tracken beginnen"
            description="Tracke Kalorien, Makros und Vitamine – alles auf einen Blick."
            href="#"
            containerClass="glass-overlay-bg2"
          />
        </SectionWrapper>

        {/* Card Four */}
        <SectionWrapper position="end">
          <ImageTextCard
            imageSrc="/src/assets/img/community.jpg"
            imageAlt="Modern building"
            category="Community & Challenges"
            title="Mitmachen"
            description="Tritt Challenges bei, teile Erfolge und lass dich inspirieren."
            href="#"
            containerClass="glass-overlay-bg2"
            reverse={true}
          />
        </SectionWrapper>

        {/* Card Five */}
        <SectionWrapper position="start">
          <ImageTextCard
            imageSrc="/src/assets/img/tippswissen.jpg"
            imageAlt="Modern building"
            category="Tipps & Wissen"
            title="Mehr erfahren"
            description="Lerne, wie du gesunde Entscheidungen triffst , ohne komplizierte Diätregeln."
            href="#"
            containerClass="glass-overlay-bg2"
          />
        </SectionWrapper>

        {/* Card Six */}
        <SectionWrapper position="end">
          <ImageTextCard
            imageSrc="/src/assets/img/appfeatures.jpg"
            imageAlt="Modern building"
            category="App Features"
            title="Funktionen ansehen"
            description="Entdecke smarte Features wie Barcode-Scanner, Rezeptvorschläge und Einkaufslisten."
            href="#"
            containerClass="glass-overlay-bg2"
            reverse={true}
          />
        </SectionWrapper>
      </section>
    </>
  );
}
