import { DashboardLayout } from "../layouts/dashboard.layout";
import { BentoBox } from "../molecules/bentobox.comp";
import { SectionWrapper } from "../atoms/sectionwrapper.comp";
import { UserProfileCard } from "../molecules/user-profile-card.comp";
import { Button } from "../atoms/button.comp";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
export function DashboardPage() {
  const user = useUser();
  return (
    <DashboardLayout>
      <SectionWrapper className="pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & User */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-2">
                Willkommen zurück
                <span>{user.user?.username || user.user?.firstName} </span>!
              </h1>
              <p className="text-emerald-700 text-lg">
                Dein persönliches Gesundheits-Dashboard
              </p>
            </div>
            <div className="flex gap-3">
              <Button as={Link} to="/onboarding" variant="outline">
                Profil bearbeiten
              </Button>
              <Button as={Link} to="/planer">
                Zum Ernährungsplaner
              </Button>
            </div>
          </div>

          {/* User Profile Card */}
          <UserProfileCard />

          {/* Additional Content */}
          <div className="mt-8">
            <BentoBox className="bg-base-200 rounded-xl" />
          </div>
        </div>
      </SectionWrapper>
    </DashboardLayout>
  );
}
