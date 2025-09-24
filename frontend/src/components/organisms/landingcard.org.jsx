import { SectionWrapper } from "../atoms/sectionwrapper.comp";
import { Image_Text_Card } from "../molecules/image_text_card.comp";

export function LandingCard() {
  return (
    <>
      <section className="flex flex-col gap-8 p-0 sm:p-8">
        <SectionWrapper position="start">
          <Image_Text_Card
            imageSrc="/src/assets/img/rezepte.jpg"
            imageAlt="Modern building"
            category="Retreats"
            title="Incredible accommodation for your team"
            description="Was geht ab das ist doch Crazy"
            href="#"
            containerClass="bg-first-bg flex justify-between"
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
            description="Was geht ab das ist doch Crazy"
            href="#"
            containerClass="bg-first-bg flex justify-between"
            imageClass="rounded-none sm:rounded-lg"
            categoryClass="text-indigo-800"
            titleClass="text-black"
            descriptionClass="text-gray-500"
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
            containerClass="bg-first-bg flex justify-between"
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
            containerClass="bg-first-bg flex justify-between"
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
            containerClass="bg-first-bg flex justify-between"
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
            containerClass="bg-first-bg flex justify-between"
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
