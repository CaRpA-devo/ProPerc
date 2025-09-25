import { DefaultLayout } from "../layouts/default.layout";
import { LandingCard } from "../organisms/landingcard.org.jsx";
import { SectionWrapper } from "../atoms/sectionwrapper.comp";

export function IndexPage() {
  return (
    <>
      {/* TODO Metatags einfügen */}

      <DefaultLayout withHero>
        <SectionWrapper
          className="bg-first-bg p-8 text-center "
          position="center"
        >
          <div className="gap-8 flex flex-col  max-w-240 ">
            <h2 className="text-4xl">
              Deine Ernährung. Dein Fortschritt. Deine App.
            </h2>
            <p className="text-xl">
              Starte mit ProPerc in eine gesunde und motivierende Zukunft. Ob
              Rezepte, persönliche Ernährungspläne oder smartes Tracking hier
              bekommst du alles, was du für einen nachhaltigen Lifestyle
              brauchst. Klar, einfach und individuell auf dich zugeschnitten.
            </p>
          </div>
        </SectionWrapper>

        <LandingCard />
      </DefaultLayout>
    </>
  );
}
