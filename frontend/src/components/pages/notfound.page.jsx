import { Link } from "react-router-dom";
import Aurora from "../animations/aurora.animation.ani.jsx";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center relative overflow-hidden">
      {/* Aurora BG*/}
      <div className="absolute inset-0 opacity-20">
        <Aurora
          colorStops={["#2eb872", "#ffd166", "#118ab2"]}
          blend={0.4}
          amplitude={1.2}
          speed={0.3}
        />
      </div>
      {/* Content*/}
      <div className="relative z-10 text-center px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>

          <h2 className="text-3xl font-bold text-base-content mb-4">
            Seite nicht gefunden
          </h2>

          <p className="text-lg text-base-content/70 mb-8">
            Die gesuchte Seite existiert nicht oder wurde verschoben. Kehren Sie
            zur Startseite zurück oder nutzen Sie die Navigation.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn btn-primary">
              Zur Startseite
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline"
            >
              Zurück
            </button>
          </div>

          <div className="mt-12">
            <div className="text-6xl mb-4">🧭</div>
            <p className="text-sm text-base-content/50">
              Verloren in der digitalen Wildnis?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
