import { DefaultLayout } from "../layouts/default.layout";
import { Image_Text_Card } from "../molecules/image_text_card.comp.jsx";

export function IndexPage() {
  return (
    <>
      {/* TODO Metatags einfügen */}

      <DefaultLayout withHero>
        <section className="flex bg-dark-bg p-4 justify-start min-h-content">
          <Image_Text_Card
            imageSrc="/img/building.jpg"
            imageAlt="Modern building"
            category="Retreats"
            title="Incredible accommodation for your team"
            description="Was geht ab das ist doch Crazy"
            href="#"
            containerClass="bg-first-bg "
            imageClass="rounded-lg"
            categoryClass="text-indigo-800"
            titleClass="text-black"
            descriptionClass="text-gray-500"
          />
        </section>
      </DefaultLayout>
    </>
  );
}
