/**
 * SupportTemplate - Layout-Template für die Support-Seite
 * @param {React.ReactNode} form - Support-Formular
 * @param {React.ReactNode} faq - FAQ-Liste
 */
export const SupportTemplate = ({ form, faq }) => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Header Section */}
      <section className="bg-base-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Wie können wir Ihnen helfen?
          </h1>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Wir sind hier, um Ihre Fragen zu beantworten und Probleme zu lösen.
            Nutzen Sie unser Kontaktformular oder schauen Sie in unseren FAQs nach.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formular */}
          <div className="order-2 lg:order-1">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Support-Anfrage erstellen</h2>
                {form}
              </div>
            </div>

            {/* Kontaktinformationen */}
            <div className="mt-8 p-6 bg-base-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Weitere Kontaktmöglichkeiten</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>support@properc.de</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Mo-Fr: 9:00 - 18:00 Uhr</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-4">
              {faq}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
