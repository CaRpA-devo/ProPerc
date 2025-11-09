import { DashboardLayout } from "../layouts/dashboard.layout";
import { BentoBox } from "../molecules/bentobox.comp";
import { SectionWrapper } from "../atoms/sectionwrapper.comp";

import { useUser } from "@clerk/clerk-react";

export function DashboardPage() {
  const user = useUser();
  return (
    <DashboardLayout withFooter>
      <SectionWrapper className="pb-8" position="center">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & User */}
          <div className="flex  md:flex-row items-start md:items-center justify-between gap-4 my-8">
            <div>
              <h1 className="text-5xl font-bold text-primary mb-6">
                Willkommen zurück{" "}
                <span>
                  {user.user?.username
                    ? user.user.username.charAt(0).toUpperCase() +
                      user.user.username.slice(1)
                    : user.user?.firstName
                    ? user.user.firstName.charAt(0).toUpperCase() +
                      user.user.firstName.slice(1)
                    : ""}
                </span>
                !
              </h1>
              <p className="text-base-content/80 text-lg">
                Dein persönliches Gesundheits-Dashboard
              </p>
            </div>
          </div>

          {/* Additional Content */}
          <div className="mt-8">
            <BentoBox className="bg-base-200 rounded-xl" />
          </div>
        </div>
      </SectionWrapper>

      {/* Debug Panel */}
    </DashboardLayout>
  );
}
