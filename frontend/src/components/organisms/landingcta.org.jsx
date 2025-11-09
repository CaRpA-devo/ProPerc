import { ArrowButton } from "../atoms/arrowbutton.comp";

export function LandingCTA() {
  return (
    <>
      <div className="text-center md:my-16">
        <div className="card bg-primary/5 border border-primary/20 p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Bereit für Ihre Transformation?
          </h3>
          <p className="text-base-content/70 mb-6">
            Schließen Sie sich tausenden zufriedener Nutzer an und beginnen Sie
            noch heute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ArrowButton text="Mehr erfahren" className="btn-lg" />
            <button
              className="btn btn-lg btn-ghost border-0 hover:scale-105 transition-all duration-300"
              style={{
                color: "#f4f4f4",
              }}
            >
              Kostenlos Starten
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* CTA */

<div className="text-center mt-16">
  <div className="card bg-primary/5 border border-primary/20 p-8 max-w-2xl mx-auto">
    <h3 className="text-2xl font-bold text-primary mb-4">
      Bereit für Ihre Transformation?
    </h3>
    <p className="text-base-content/70 mb-6">
      Schließen Sie sich tausenden zufriedener Nutzer an und beginnen Sie noch
      heute.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="btn btn-primary btn-lg">Kostenlos starten</button>
      <button className="btn btn-outline btn-lg">Mehr erfahren</button>
    </div>
  </div>
</div>;
