import { Link } from "react-router";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { Button } from "../atoms/button.comp";

export function WikiPage() {
  return (
    <>
      <DashboardLayout>
        <section class="p-6 flex justify-center">
          <h1>PercyPedia</h1>
          <Link to="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </section>
      </DashboardLayout>
    </>
  );
}
