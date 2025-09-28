import { DefaultLayout } from "../layouts/default.layout";
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
