import { Link } from "react-router";
import { DefaultLayout } from "../layouts/default.layout";
import { StandardCard } from "../molecules/standardCard.com";
import { Loader } from "../atoms/loader.comp";

export function DashboardPage() {
  return (
    <>
      <DefaultLayout>
        <section className="p-6 flex justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Dein Dashboard</h1>
            <p className="opacity-70">Willkommen zurück 👋</p>
          </div>
        </section>
      </DefaultLayout>
    </>
  );
}
