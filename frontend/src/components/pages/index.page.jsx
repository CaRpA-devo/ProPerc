import { DefaultLayout } from "../layouts/default.layout";
import { LandingCard } from "../organisms/landingcard.org.jsx";
import { LandingCTA } from "../organisms/landingcta.org.jsx";

export function IndexPage() {
  return (
    <>
      {/* TODO Metatags einfügen */}

      <DefaultLayout withHero>
        <LandingCard />
        <LandingCTA />
      </DefaultLayout>
    </>
  );
}
