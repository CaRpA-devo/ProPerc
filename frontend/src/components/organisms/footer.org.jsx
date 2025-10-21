import { Link } from "react-router-dom";
import Aurora from "../animations/aurora.animation.ani.jsx";

export function Footer() {
  return (
    <footer className="relative bg-base-200 text-base-content">
      {/* Aurora Background - gespiegelt am Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0  pointer-events-none z-0"
        style={{ height: "64px", transform: "scaleY(-1)" }}
      >
        <Aurora
          colorStops={["#2eb872", "#ffd166", "#2eb872"]}
          blend={0.4}
          amplitude={0.8}
          speed={0.3}
        />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/src/assets/img/logoNoBg.png"
                  alt="ProPerc Logo"
                  className="h-12 w-auto rounded-full"
                />
                <span className="text-2xl font-bold text-primary">ProPerc</span>
              </div>
              <p className="text-base-content/70 mb-6 max-w-md">
                Ihre ganzheitliche Lösung für Gesundheit, Ernährung und Fitness.
                Erreichen Sie Ihre Ziele mit unserem wissenschaftlich fundierten
                Ansatz.
              </p>

              {/* Social Media */}
              <div className="flex gap-4">
                <a href="#" className="btn btn-ghost btn-sm btn-circle">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="btn btn-ghost btn-sm btn-circle">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
                <a href="#" className="btn btn-ghost btn-sm btn-circle">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">
                Navigation
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="link link-hover">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/planer" className="link link-hover">
                    Planer
                  </Link>
                </li>
                <li>
                  <Link to="/wiki" className="link link-hover">
                    Wiki
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="link link-hover">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">
                Rechtliches
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/agb#agb" className="link link-hover">
                    AGB
                  </a>
                </li>
                <li>
                  <a href="/agb#datenschutz" className="link link-hover">
                    Datenschutz
                  </a>
                </li>
                <li>
                  <a href="/agb#disclaimer" className="link link-hover">
                    Medizinischer Disclaimer
                  </a>
                </li>
                <li>
                  <a href="/agb#impressum" className="link link-hover">
                    Impressum
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-base-300 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-base-content/70">
                © 2024 Syntax-Sushi (ProPerc). Alle Rechte vorbehalten.
              </p>
              <p className="text-sm text-base-content/70">
                Made with ❤️ for your health
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
