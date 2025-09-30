import { Link } from "react-router-dom";
import { Button } from "../atoms/button.comp";
import { DashboardLayout } from "../layouts/dashboard.layout";

export function SettingsPage() {
  return (
    <>
      <DashboardLayout>
        <section className="p-6 flex justify-center ">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Einstellungen</h1>
          </div>
        </section>
        <section className="p-6 flex justify-center border border-base-300 rounded-lg bg-base-200 rounded-lg max-w-5xl mx-auto">
          <section className="flex w-full items-center flex-col align-center gap-4">
            <h2>Persönliches</h2>
            {/* Geschlecht */}
            <label className="select">
              <span className="label">Geschlecht</span>
              <select>
                <option value="" disabled>
                  Bitte auswählen
                </option>
                <option>Weiblich</option>

                <option>Männlich</option>
                <option>Divers</option>
              </select>
            </label>

            {/* Gewicht */}
            <label className="input">
              <span className="label">Gewicht</span>
              <input type="text" />
            </label>

            {/* Größe */}
            <label className="input">
              <span className="label">Größe</span>
              <input type="text" />
            </label>
            {/* Geburtsdatum */}
            <label className="input">
              <span className="label">Geburtsdatum</span>
              <input type="date" />
            </label>
          </section>
          <section className="flex w-full items-center flex-col align-center gap-4">
            <h2>Account</h2>
            {/* Email */}
            <label className="input">
              <span className="label">E-Mail</span>
              <input
                type="email"
                placeholder="mail@site.com"
                className="w-full"
              />
            </label>

            {/* Sprache */}
            <label className="select">
              <span className="label">Sprache</span>
              <select>
                <option value="" disabled>
                  Wähle eine Sprache
                </option>
                <option>Deutsch</option>
                <option>Englisch</option>
                <option>Tschechisch</option>
              </select>
            </label>

            {/* Darkmode */}
            <div className="flex items-center gap-3">
              {/* Sonne */}
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-yellow-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
              </svg>

              {/* Der eigentliche Toggle */}
              <input type="checkbox" className="toggle toggle-accent" />

              {/* Mond */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </div>
          </section>
        </section>
        <div className="p-6 flex flex-row justify-center items-center gap-4">
          <Link to="/dashboard">
            <Button>Abbruch</Button>
          </Link>

          <Link to="/dashboard">
            <Button>Speichern</Button>
          </Link>
        </div>
      </DashboardLayout>
    </>
  );
}
