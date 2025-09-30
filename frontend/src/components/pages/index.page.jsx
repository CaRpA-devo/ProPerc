import { DefaultLayout } from "../layouts/default.layout";
import { LandingCard } from "../organisms/landingcard.org.jsx";
import { SectionWrapper } from "../atoms/sectionwrapper.comp";
import { Features } from "../organisms/features.org.jsx";

export function IndexPage() {
  return (
    <>
      {/* TODO Metatags einfügen */}

      <DefaultLayout withHero>
        <SectionWrapper>
          <LandingCard />
        </SectionWrapper>
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
      </DefaultLayout>
    </>
  );
}
