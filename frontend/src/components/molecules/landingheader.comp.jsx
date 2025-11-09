import { SectionWrapper } from "../atoms/sectionwrapper.comp";

export function LandingHeader() {
  return (
    <>
      <SectionWrapper className="md:pt-32">
        <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Ihre Gesundheit, Unser Fokus
            </h2>
            <p className="text-lg px-4  md:text-xl text-base-content/70 max-w-3xl mx-auto">
              Entdecken Sie alle Features von ProPerc und starten Sie noch heute
              Ihre persönliche Gesundheitsreise mit unserem ganzheitlichen
              Ansatz.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
