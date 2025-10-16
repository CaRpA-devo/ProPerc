import { SectionWrapper } from "../atoms/sectionwrapper.comp";
import { ImageTextCard } from "../molecules/image_text_card.comp.jsx";
import "../../styles/landingcard.style.css";

export function LandingCard() {
  return (
    <>
      <section className="flex bg-base-100 flex-col sm:gap-8 sm:p-8">
        {/* Card one */}
        <SectionWrapper position="start">
          <ImageTextCard
            imageSrc="/src/assets/img/ernährungsplan.jpg"
            imageAlt="Modern building"
            category="Ernährungsplanung"
            title="Leckere Rezepte für jeden Tag"
            description="Personalisierte Ernährungspläne basierend auf Ihren Zielen und Vorlieben."
            buttonText="Zack Zack"
            listItems={["Feature 1", "Feature 2", "Feature 3"]}
          />
        </SectionWrapper>

        {/* Card Two */}
        <SectionWrapper position="end">
          <ImageTextCard
            imageSrc="/src/assets/img/ernährungsplan.jpg"
            imageAlt="Modern building"
            category="Persönliche Ernährungspläne"
            description="Passe Mahlzeiten an deine Ziele, Vorlieben und Allergien an einfach und smart."
            buttonText="Dit und dat"
            reverse={true}
            listItems={["Feature 1", "Feature 2", "Feature 3"]}
          />
        </SectionWrapper>
        {/* Card Three */}
        <SectionWrapper position="start">
          <ImageTextCard
            imageSrc="/src/assets/img/tracking.jpg"
            imageAlt="Modern building"
            category="Fortschritt & Tracking"
            description="Tracke Kalorien, Makros und Vitamine – alles auf einen Blick."
            buttonText="Dit und dat"
            listItems={["Feature 1", "Feature 2", "Feature 3"]}
          />
        </SectionWrapper>

        {/* Card Four */}
        <SectionWrapper position="end">
          <ImageTextCard
            imageSrc="/src/assets/img/community.jpg"
            imageAlt="Modern building"
            category="Community & Challenges"
            description="Tritt Challenges bei, teile Erfolge und lass dich inspirieren."
            buttonText="Dit und dat"
            reverse={true}
            listItems={["Feature 1", "Feature 2", "Feature 3"]}
          />
        </SectionWrapper>

        {/* Card Five */}
        <SectionWrapper position="start">
          <ImageTextCard
            imageSrc="/src/assets/img/tippswissen.jpg"
            imageAlt="Modern building"
            category="Tipps & Wissen"
            description="Lerne, wie du gesunde Entscheidungen triffst , ohne komplizierte Diätregeln."
            buttonText="Dit und dat"
            listItems={["Feature 1", "Feature 2", "Feature 3"]}
          />
        </SectionWrapper>

        {/* Card Six */}
        <SectionWrapper position="end">
          <ImageTextCard
            imageSrc="/src/assets/img/appfeatures.jpg"
            imageAlt="Modern building"
            category="App Features"
            description="Entdecke smarte Features wie Barcode-Scanner, Rezeptvorschläge und Einkaufslisten."
            buttonText="Dit und dat"
            reverse={true}
            listItems={["Feature 1", "Feature 2", "Feature 3"]}
          />
        </SectionWrapper>
      </section>
    </>
  );
}
