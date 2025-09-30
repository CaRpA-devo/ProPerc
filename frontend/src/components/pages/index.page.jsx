import { DefaultLayout } from "../layouts/default.layout";
import { LandingCard } from "../organisms/landingcard.org.jsx";
import { SectionWrapper } from "../atoms/sectionwrapper.comp";
import { Features } from "../organisms/features.org.jsx";

export function IndexPage() {
  return (
    <>
      {/* TODO Metatags einfügen */}

      <DefaultLayout withHero>
        <Features />
      </DefaultLayout>
    </>
  );
}
