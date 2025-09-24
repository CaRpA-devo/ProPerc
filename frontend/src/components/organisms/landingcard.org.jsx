import { SectionWrapper } from "../atoms/sectionwrapper.comp";
import { Image_Text_Card } from "../molecules/image_text_card.comp";
import "../../styles/landingcard.style.css";

export function LandingCard() {
  return (
    <>
      <section className="flex glass-overlay-bg flex-col gap-8  sm:p-8">
        <SectionWrapper position="start">
          <Image_Text_Card
            imageSrc="/src/assets/img/rezepte.jpg"
            imageAlt="Modern building"
            category="Gesunde Rezepte"
            title="Leckere Rezepte für jeden Tag"
            description="Finde ausgewogene Gerichte, die schnell zubereitet sind und deinem Ziel entsprechen.Finde ausgewogene Gerichte, die schnell zubereitet sind und deinem Ziel entsprechen."
            href="#"
            containerClass="glass-overlay-bg2"
            imageClass="rounded-none sm:rounded-lg"
            categoryClass="text-indigo-800"
            titleClass="text-black"
            descriptionClass="text-gray-500"
          />
        </SectionWrapper>

        <SectionWrapper position="end">
          <Image_Text_Card
            imageSrc="/src/assets/img/ernährungsplan.jpg"
            imageAlt="Modern building"
            category="Retreats"
            title="Incredible accommodation for your team"
            description="Finde ausgewogene Gerichte, die schnell zubereitet sind und deinem Ziel entsprechen."
            href="#"
            containerClass="glass-overlay-bg2"
            imageClass="rounded-none sm:rounded-lg"
            categoryClass="text-indigo-800"
            titleClass="text-black"
            descriptionClass="text-gray-500"
            reverse="false"
          />
        </SectionWrapper>

        <SectionWrapper position="start">
          <Image_Text_Card
            imageSrc="/src/assets/img/tracking.jpg"
            imageAlt="Modern building"
            category="Retreats"
            title="Incredible accommodation for your team"
            description="Was geht ab das ist doch Crazy"
            href="#"
            containerClass="glass-overlay-bg2"
            imageClass="rounded-none sm:rounded-lg"
            categoryClass="text-indigo-800"
            titleClass="text-black"
            descriptionClass="text-gray-500"
          />
        </SectionWrapper>

        <SectionWrapper position="end">
          <Image_Text_Card
            imageSrc="/src/assets/img/community.jpg"
            imageAlt="Modern building"
            category="Retreats"
            title="Incredible accommodation for your team"
            description="Was geht ab das ist doch Crazy"
            href="#"
            containerClass="glass-overlay-bg2"
            imageClass="rounded-none sm:rounded-lg"
            categoryClass="text-indigo-800"
            titleClass="text-black"
            descriptionClass="text-gray-500"
          />
        </SectionWrapper>

        <SectionWrapper position="start">
          <Image_Text_Card
            imageSrc="/src/assets/img/tippswissen.jpg"
            imageAlt="Modern building"
            category="Retreats"
            title="Incredible accommodation for your team"
            description="Was geht ab das ist doch Crazy"
            href="#"
            containerClass="glass-overlay-bg2"
            imageClass="rounded-none sm:rounded-lg"
            categoryClass="text-indigo-800"
            titleClass="text-black"
            descriptionClass="text-gray-500"
          />
        </SectionWrapper>

        <SectionWrapper position="end">
          <Image_Text_Card
            imageSrc="/src/assets/img/appfeatures.jpg"
            imageAlt="Modern building"
            category="Retreats"
            title="Incredible accommodation for your team"
            description="Was geht ab das ist doch Crazy"
            href="#"
            containerClass="glass-overlay-bg2"
            imageClass="rounded-none sm:rounded-lg"
            categoryClass="text-indigo-800"
            titleClass="text-black"
            descriptionClass="text-gray-500"
          />
        </SectionWrapper>
      </section>
    </>
  );
}
