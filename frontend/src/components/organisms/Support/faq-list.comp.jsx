import { useState } from "react";

/**
 * FAQList Organism - Häufig gestellte Fragen
 */
export const FAQList = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Wie kann ich mein Passwort zurücksetzen?",
      answer:
        "Klicken Sie auf der Anmeldeseite auf 'Passwort vergessen' und folgen Sie den Anweisungen. Sie erhalten eine E-Mail mit einem Link zum Zurücksetzen Ihres Passworts.",
    },
    {
      question: "Wie kann ich meine Tracking-Daten exportieren?",
      answer:
        "In Ihren Einstellungen finden Sie unter 'Daten & Privatsphäre' die Option, Ihre kompletten Tracking-Daten als CSV-Datei herunterzuladen.",
    },
    {
      question: "Werden meine Daten sicher gespeichert?",
      answer:
        "Ja, wir verwenden industrieübliche Verschlüsselung und speichern alle Daten auf sicheren Servern in der EU. Ihre Daten werden niemals an Dritte weitergegeben.",
    },
    {
      question: "Kann ich mein Konto löschen?",
      answer:
        "Ja, Sie können Ihr Konto jederzeit in den Einstellungen unter 'Account' löschen. Alle Ihre Daten werden permanent entfernt.",
    },
    {
      question: "Wie kann ich meine Ernährungsziele anpassen?",
      answer:
        "Gehen Sie zu 'Einstellungen' und dann zu 'Profil bearbeiten'. Dort können Sie Ihre Ernährungsziele, Aktivitätslevel und andere Präferenzen anpassen.",
    },
    {
      question: "Wie schnell erhalte ich eine Antwort auf meine Support-Anfrage?",
      answer:
        "Wir bemühen uns, alle Support-Anfragen innerhalb von 24-48 Stunden zu beantworten. In dringenden Fällen können Sie uns auch direkt per E-Mail kontaktieren.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Häufig gestellte Fragen</h2>
      <div className="join join-vertical w-full">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow join-item border border-base-300"
          >
            <input
              type="radio"
              name="faq-accordion"
              checked={openIndex === index}
              onChange={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            />
            <div className="collapse-title text-lg font-medium">
              {faq.question}
            </div>
            <div
              id={`faq-answer-${index}`}
              className="collapse-content"
            >
              <p className="text-base-content/80">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-info mt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>
          Finden Sie Ihre Frage nicht? Nutzen Sie das Formular oben, um uns direkt zu kontaktieren.
        </span>
      </div>
    </div>
  );
};
