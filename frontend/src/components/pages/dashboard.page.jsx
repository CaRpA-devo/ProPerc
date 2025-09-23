import { DashboardLayout } from "../layouts/dashboard.layout";

export function DashboardPage() {
  return (
    <>
      {/* TODO MEtatags einfügen */}
      {/* TODO DEfault layout raus nur das was user angezeigt werden soll je nach login */}
      <DashboardLayout>
        <section className="p-6 flex justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Dein Dashboard</h1>
            <p className="opacity-70">Willkommen zurück 👋</p>
          </div>
        </section>
      </DashboardLayout>
    </>
  );
}
