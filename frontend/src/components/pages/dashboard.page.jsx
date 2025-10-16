import { DashboardLayout } from "../layouts/dashboard.layout";
import { BentoBox } from "../molecules/bentobox.comp";
import { SectionWrapper } from "../atoms/sectionwrapper.comp";
import { useUser } from "@clerk/clerk-react";

export function DashboardPage() {
  const user = useUser();
  return (
    <DashboardLayout>
      <SectionWrapper className="p-8 ">
        <div className="  flex flex-col items-start text-start ">
          <h1 className="text-4xl mt-8 font-bold text-emerald-900 mb-1">
            Willkommen zurück
            <span>{user.user?.username || user.user?.firstName} </span>!
          </h1>
          <p className="text-emerald-700 text-lg">
            Dein persönliches Gesundheits-Dashboard
          </p>
        </div>
      </SectionWrapper>
      <SectionWrapper
        className="pb-16 "
        position="center
      "
      >
        <BentoBox className="cbg-base-200" />
      </SectionWrapper>
    </DashboardLayout>
  );
}
