import Aurora from "../animations/aurora.animation.ani.jsx";
import { DashboardLayout } from "../layouts/dashboard.layout.jsx";
import { useEffect } from "react";

export default function AgbPage() {
  // Smooth scroll to section when page loads with hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, []);
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-base-200 relative overflow-hidden scroll-smooth">
        {/* Aurora BG*/}
        <div className="absolute inset-0 opacity-10 ">
          <Aurora
            colorStops={["#2eb872", "#ffd166", "#118ab2"]}
            blend={0.4}
            amplitude={1.2}
            speed={0.3}
          />
        </div>
        {/* Content*/}
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-primary mb-4">
                Rechtliches
              </h1>
              <p className="text-lg text-base-content">
                Allgemeine Geschäftsbedingungen, Datenschutz und wichtige
                Hinweise
              </p>
            </div>

            {/* Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a href="#agb" className="btn btn-outline btn-primary">
                1. AGB
              </a>
              <a href="#datenschutz" className="btn btn-outline btn-primary">
                2. Datenschutz
              </a>
              <a href="#disclaimer" className="btn btn-outline btn-primary">
                3. Medizinischer Disclaimer
              </a>
              <a href="#impressum" className="btn btn-outline btn-primary">
                4. Impressum
              </a>
            </div>

            {/* AGB Section */}
            <section id="agb" className="mb-16 scroll-mt-32">
              <div className="bg-base-100 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-primary mb-6">
                  1. Allgemeine Geschäftsbedingungen
                </h2>

                <div className="space-y-6 text-base-content">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Geltungsbereich
                    </h3>
                    <p>
                      Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für
                      die Nutzung der ProPerc-App und aller damit verbundenen
                      Dienstleistungen von Syntax-Sushi.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Leistungsbeschreibung
                    </h3>
                    <p>
                      ProPerc ist eine Gesundheits- und Ernährungs-Tracking-App,
                      die Nutzern dabei hilft, ihre Ernährungsgewohnheiten zu
                      dokumentieren und zu analysieren. Die App stellt lediglich
                      Tools und Informationen zur Verfügung.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Nutzungsbedingungen
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Die Nutzung der App erfolgt auf eigene Verantwortung
                      </li>
                      <li>
                        Alle bereitgestellten Informationen dienen nur als
                        Orientierungshilfe
                      </li>
                      <li>
                        Die App ersetzt keine professionelle medizinische
                        Beratung
                      </li>
                      <li>Nutzungsrechte werden nicht übertragen</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Haftungsausschluss
                    </h3>
                    <p>
                      Syntax-Sushi haftet nicht für Schäden, die durch die
                      Nutzung der App entstehen. Die Nutzung erfolgt auf eigene
                      Gefahr.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Datenschutz Section */}
            <section id="datenschutz" className="mb-16 scroll-mt-32">
              <div className="bg-base-100 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-primary mb-6">
                  2. Datenschutz
                </h2>

                <div className="space-y-6 text-base-content">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Datenerhebung
                    </h3>
                    <p>
                      Wir erheben nur die Daten, die für die Funktionalität der
                      App notwendig sind:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                      <li>
                        Profilinformationen (Name, E-Mail, Altersgruppe,
                        Geschlecht)
                      </li>
                      <li>Ernährungsdaten (Mahlzeiten, Nährwerte, Ziele)</li>
                      <li>App-Nutzungsdaten (für Verbesserungen)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Datenspeicherung
                    </h3>
                    <p>
                      Ihre Daten werden sicher in verschlüsselter Form
                      gespeichert und nur für die angegebenen Zwecke verwendet.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Datenweitergabe
                    </h3>
                    <p>
                      Wir geben Ihre Daten nicht an Dritte weiter, außer wenn
                      dies gesetzlich vorgeschrieben oder für die
                      App-Funktionalität erforderlich ist.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Ihre Rechte</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Recht auf Auskunft über gespeicherte Daten</li>
                      <li>Recht auf Berichtigung falscher Daten</li>
                      <li>Recht auf Löschung Ihrer Daten</li>
                      <li>Recht auf Datenübertragbarkeit</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Medizinischer Disclaimer */}
            <section id="disclaimer" className="mb-16 scroll-mt-32">
              <div className="bg-base-100 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-primary mb-6">
                  3. Medizinischer Disclaimer
                </h2>

                <div className="space-y-6 text-base-content">
                  <div className="bg-warning/20 border border-warning rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-3 text-warning">
                      ⚠️ Wichtiger Hinweis
                    </h3>
                    <p className="font-medium">
                      Wir sind keine Ärzte oder medizinischen Fachkräfte!
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Keine medizinische Beratung
                    </h3>
                    <p>
                      ProPerc und Syntax-Sushi bieten keine medizinische
                      Beratung, Diagnose oder Behandlung an. Alle
                      bereitgestellten Informationen dienen ausschließlich zur
                      allgemeinen Information und Orientierung.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Empfehlungen basieren auf Daten
                    </h3>
                    <p>
                      Alle Vorschläge, Empfehlungen oder Hinweise in der App
                      basieren auf allgemeinen Daten und Algorithmen. Sie
                      ersetzen nicht die individuelle Beratung durch
                      qualifizierte Fachkräfte.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Konsultieren Sie Fachkräfte
                    </h3>
                    <p>
                      Bei gesundheitlichen Problemen, Fragen zu Ihrer Ernährung
                      oder vor Änderungen Ihrer Lebensweise konsultieren Sie
                      bitte immer:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                      <li>Ihren Hausarzt</li>
                      <li>Einen Ernährungsberater</li>
                      <li>Einen Diätassistenten</li>
                      <li>Andere qualifizierte Fachkräfte</li>
                    </ul>
                  </div>

                  <div className="bg-error/20 border border-error rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-3 text-error">
                      🚨 Notfall
                    </h3>
                    <p>
                      Bei medizinischen Notfällen wenden Sie sich sofort an den
                      Notruf (112) oder suchen Sie die nächste Notaufnahme auf.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Impressum */}
            <section id="impressum" className="mb-16 scroll-mt-32">
              <div className="bg-base-100 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-primary mb-6">
                  4. Impressum
                </h2>

                <div className="space-y-6 text-base-content">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Firmeninformationen
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <strong>Firmenname:</strong> Syntax-Sushi
                      </p>
                      <p>
                        <strong>Produkt:</strong> ProPerc - Gesundheits- und
                        Ernährungs-Tracking-App
                      </p>
                      <p>
                        <strong>Rechtsform:</strong> [Bitte ergänzen Sie Ihre
                        Rechtsform]
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Kontakt</h3>
                    <div className="space-y-2">
                      <p>
                        <strong>E-Mail:</strong> [Bitte ergänzen Sie Ihre
                        E-Mail-Adresse]
                      </p>
                      <p>
                        <strong>Website:</strong> [Bitte ergänzen Sie Ihre
                        Website]
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Verantwortlich für den Inhalt
                    </h3>
                    <p>
                      Syntax-Sushi ist verantwortlich für den Inhalt dieser App
                      gemäß § 55 Abs. 2 RStV.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Technische Umsetzung
                    </h3>
                    <p>
                      Die ProPerc-App wurde entwickelt, um Nutzern eine
                      benutzerfreundliche Möglichkeit zu bieten, ihre
                      Ernährungsgewohnheiten zu tracken und zu analysieren.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="text-center text-base-content/70">
              <p>Stand: {new Date().toLocaleDateString("de-DE")}</p>
              <p>
                Letzte Aktualisierung: {new Date().toLocaleDateString("de-DE")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
