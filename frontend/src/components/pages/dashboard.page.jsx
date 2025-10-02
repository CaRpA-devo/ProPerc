import { DashboardLayout } from "../layouts/dashboard.layout";
import { BentoBox } from "../molecules/bentobox.comp";
import { SectionWrapper } from "../atoms/sectionwrapper.comp";

export function DashboardPage() {
  return (
    <DashboardLayout>
      <SectionWrapper className="pb-16">
        {/* Header & User */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 pt-8">
          <div>
            <h1 className="text-4xl font-bold text-emerald-900 mb-1">
              Willkommen zurück!
            </h1>
            <p className="text-emerald-700 text-lg">
              Dein persönliches Gesundheits-Dashboard
            </p>
          </div>
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
