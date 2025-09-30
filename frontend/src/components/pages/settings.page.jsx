import { Link } from "react-router-dom";
import { Button } from "../atoms/button.comp";
import { DashboardLayout } from "../layouts/dashboard.layout";

export function SettingsPage() {
  return (
    <>
      <DashboardLayout>
        <section className="p-6 flex justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Einstellungen</h1>
          </div>
        </section>
        <section className="p-6 flex justify-center">
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
            <input type="text" placeholder="Gewicht:" className="input" />

            {/* Größe */}
            <input type="text" placeholder="Größe:" className="input" />
            {/* Geburtsdatum */}
            <label className="input">
              <span className="label">Geburtsdatum</span>
              <input type="date" />
            </label>
          </section>
          <section className="flex w-full items-center flex-col align-center gap-4">
            <h2>Account</h2>
            {/* Email */}
            <label className="floating-label">
              <span>Email-Adresse</span>
              <input
                type="email"
                placeholder="mail@site.com"
                className="input input-md"
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
            <label className="toggle text-base-content">
              <input type="checkbox" />
              <svg
                aria-label="light"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm7.071 2.929a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm-14.142 0a1 1 0 0 1 1.414 0l.707.707A1 1 0 0 1 5.636 7.05l-.707-.707a1 1 0 0 1 0-1.414zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-6 4a6 6 0 1 1 12 0 6 6 0 0 1-12 0zm-4 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm17 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1zM5.636 16.95a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707zm11.314 1.414a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707zM12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1z"
                  fill="#0D0D0D"
                />
              </svg>
              <svg
                aria-label="dark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M7.7066 0.00274765C7.50391 -0.0027381 7.31797 0.114737 7.23588 0.300147C7.15379 0.485558 7.19181 0.702186 7.33213 0.848565C8.36577 1.92686 9.00015 3.3888 9.00015 4.99996C9.00015 8.31366 6.31385 11 3.00015 11C2.5757 11 2.16207 10.956 1.76339 10.8725C1.56489 10.8309 1.36094 10.9133 1.2471 11.0812C1.13325 11.249 1.13207 11.469 1.2441 11.638C2.58602 13.663 4.88682 15 7.50012 15C11.6423 15 15.0001 11.6421 15.0001 7.49996C15.0001 3.42688 11.7534 0.112271 7.7066 0.00274765Z"
                  fill="#000000"
                />
              </svg>
            </label>
          </section>
        </section>
        <div class="flex gap-4 items-center flex-col align-center">
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
