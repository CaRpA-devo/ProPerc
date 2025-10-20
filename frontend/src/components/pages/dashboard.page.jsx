import { DashboardLayout } from "../layouts/dashboard.layout";
import { BentoBox } from "../molecules/bentobox.comp";
import { SectionWrapper } from "../atoms/sectionwrapper.comp";
import DebugPanel from "../molecules/debug-panel.comp";
import { Link } from "react-router-dom";

import { useUser } from "@clerk/clerk-react";

export function DashboardPage() {
  const user = useUser();
  return (
    <DashboardLayout>
      <SectionWrapper className="pb-8" position="center">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & User */}
          <div className="flex  md:flex-row items-start md:items-center justify-between gap-4 my-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-2">
                Willkommen zurück
                <span>
                  {user.user?.username
                    ? user.user.username.charAt(0).toUpperCase() +
                      user.user.username.slice(1)
                    : user.user?.firstName
                    ? user.user.firstName.charAt(0).toUpperCase() +
                      user.user.firstName.slice(1)
                    : ""}{" "}
                </span>
                !
              </h1>
              <p className="text-emerald-700 text-lg">
                Dein persönliches Gesundheits-Dashboard
              </p>
            </div>
          </div>

          {/* Dev-Links nur in Entwicklung */}
          {import.meta.env.DEV && (
            <div className="mb-6 p-3 rounded-lg border border-dashed border-emerald-300 bg-emerald-50">
              <div className="text-sm font-semibold text-emerald-800 mb-2">
                Schnelllinks (Dev)
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <Link
                  className="px-3 py-1 rounded bg-white border text-emerald-700 hover:bg-emerald-100"
                  to="/agb"
                >
                  AGB
                </Link>
                <Link
                  className="px-3 py-1 rounded bg-white border text-emerald-700 hover:bg-emerald-100"
                  to="/aboutus"
                >
                  About Us
                </Link>
                <Link
                  className="px-3 py-1 rounded bg-white border text-emerald-700 hover:bg-emerald-100"
                  to="/planer"
                >
                  Planer
                </Link>
                <Link
                  className="px-3 py-1 rounded bg-white border text-emerald-700 hover:bg-emerald-100"
                  to="/profil"
                >
                  Profil
                </Link>
                <Link
                  className="px-3 py-1 rounded bg-white border text-emerald-700 hover:bg-emerald-100"
                  to="/support"
                >
                  Support
                </Link>
                <Link
                  className="px-3 py-1 rounded bg-white border text-emerald-700 hover:bg-emerald-100"
                  to="/wiki"
                >
                  Wiki
                </Link>
              </div>
            </div>
          )}

          {/* Additional Content */}
          <div className="mt-8">
            <BentoBox className="bg-base-200 rounded-xl" />
          </div>
        </div>
      </SectionWrapper>

      {/* Debug Panel */}
      <DebugPanel />
    </DashboardLayout>
  );
}
