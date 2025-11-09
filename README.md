# ProPerc – Fullstack Health & Fitness Plattform

ProPerc vereint Ernährungsplanung, Trainingssteuerung und Fortschritts-Tracking in einer modular aufgebauten Web-Anwendung. Das Projekt besteht aus einem React-Frontend (Vite) und einem Express/MongoDB-Backend. Ziel ist eine skalierbare Plattform, die Nutzer:innen bei einem gesunden Lebensstil unterstützt.

## Inhaltsverzeichnis

1. Überblick
2. Funktionsumfang
3. Architektur
4. Installation & Entwicklung
5. Umgebungsvariablen
6. Wichtige npm-Skripte
7. Projektstruktur
8. Entwicklungs-Workflow
9. Qualitätssicherung & Ausblick
10. Lizenz

## 1. Überblick

- Ganzheitliche Fitness-App mit Fokus auf Ernährung, Rezepte, Kalorien- und Trainings-Tracking.
- Moderne UI mit Tailwind CSS, DaisyUI und Atomic-Design-Komponenten.
- API-gestützte Datenhaltung via Node.js, Express, Mongoose und Zod.
- Integration von Clerk (React SDK) für geplantes User-Management und Authentifizierung.

## 2. Funktionsumfang (Ist-Zustand & geplant)

- **Landing & Marketing**: Startseite mit Hero-Sektion, Feature-Highlights und Call-to-Action.
- **Dashboard**: Geplante Übersicht für Ernährungspläne, Rezepte, Fortschrittskennzahlen und Community-Content.
- **Projekt-/Todo-Management**: Verwaltung von Aufgaben rund um Ernährung und Training (aktuell als JSON-Dummy hinterlegt).
- **Support & Wiki**: Strukturen für Hilfeseiten und Wissensartikel.
- **User-Authentifizierung**: Clerk-Integration auf Frontendseite vorbereitet, Backend-Anbindung in Planung.

## 3. Architektur

### Frontend (`frontend/`)

- React 19 mit Vite 7 als Bundler.
- Komponentenstruktur nach Atomic Design (`atoms → molecules → organisms → templates → pages`).
- Styling mit Tailwind CSS 4 und DaisyUI; zusätzliche globale Styles in `App.css`, `index.css`.
- Routing über React Router 7.
- Authentifizierung via Clerk React SDK (noch nicht vollständig verdrahtet).

### Backend (`backend/`)

- Express 5 als HTTP-Framework.
- Mongoose 8 für die MongoDB-Anbindung.
- Zod 4 für schemabasierte Validierung.
- Globale Fehlerbehandlung per eigener `AppError`-Klasse.
- Konfigurationsobjekte für SEO/Meta-Informationen und Social Links in `config/site.js`.
- Strukturierte API-Endpunkte (z. B. `user_router`), Middleware- und Utility-Ebene vorbereitet.

## 4. Installation & Entwicklung

```bash
# Repository klonen
git clone <repo-url>
cd /home/carpa/ProPerc

# Frontend-Abhängigkeiten
cd /home/carpa/ProPerc/frontend
npm install

# Backend-Abhängigkeiten
cd /home/carpa/ProPerc/backend
npm install

# Backend-Entwicklungsserver starten
npm run dev

# Frontend in neuem Terminal starten
cd /home/carpa/ProPerc/frontend
npm run dev
```

Das Frontend läuft standardmäßig unter `http://localhost:5173`. Das Backend lauscht (via `.env` im Backend) auf dem konfigurierten Port, z. B. `http://localhost:3000`.

## 5. Umgebungsvariablen

### Backend (`/home/carpa/ProPerc/backend/.env`)

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/properc
CLERK_SECRET_KEY=<optional für Backend-Integrationen>
```

### Frontend (`/home/carpa/ProPerc/frontend/.env`)

```
VITE_CLERK_PUBLISHABLE_KEY=<dein_clerk_key>
VITE_API_BASE_URL=http://localhost:3000
```

Passe die Werte an deine lokale Umgebung oder Deployments an.

## 6. Wichtige npm-Skripte

```bash
# Frontend (im Ordner frontend/)
npm run dev        # Entwicklungsserver mit HMR
npm run build      # Produktionsbuild erstellen
npm run preview    # Build lokal ausliefern

# Backend (im Ordner backend/)
npm run dev        # Entwicklungsserver mit nodemon
```

## 7. Projektstruktur (Auszug)

```text
/home/carpa/ProPerc
├─ backend
│  ├─ config/          # DB- und Site-Konfiguration
│  ├─ endpoints/       # Express-Router (z. B. user)
│  ├─ middelwares/     # Middleware-Layer
│  ├─ utils/           # Helper wie AppError, Logger, etc.
│  └─ index.js         # Einstiegspunkt des Servers
└─ frontend
   ├─ public/          # Statische Assets
   ├─ src/
   │  ├─ assets/       # Bilder, Fonts
   │  ├─ components/   # Atomic-Design-Komponenten & Seite
   │  ├─ config/       # Frontend-spezifische Konfiguration
   │  ├─ hooks/        # Custom Hooks
   │  ├─ styles/       # Zusätzliche Stylesheets
   │  ├─ App.jsx       # App-Root
   │  └─ main.jsx      # SPA-Einstiegspunkt
   └─ vite.config.js   # Vite-Konfiguration
```

## 8. Entwicklungs-Workflow

- Arbeit auf Feature-Branches starten, regelmäßige Pulls vom Hauptbranch.
- Merge-Konflikte (z. B. in `components/pages/index.page.jsx`) frühzeitig bereinigen.
- Vor größeren Änderungen bestehende UX-/UI-Komponenten prüfen (Atomic Design).
- Backlog für Backend-Routen und Datenmodelle in `endpoints/` und `utils/` erweitern.

## 9. Qualitätssicherung & Ausblick

- Tests sind aktuell nicht implementiert. Plane Unit-, Integration- und E2E-Tests, sobald Kernfunktionen stehen.
- Datenhaltung basiert derzeit auf JSON-Dummies – reale MongoDB-Modelle sollen folgen.
- Authentifizierung & Autorisierung über Clerk finalisieren (Frontend + Backend).
- CI/CD-Pipeline und Linting/Formatting-Automatisierung einführen.
- Weitere Features: Community-Funktionen, detailliertes Tracking, Ernährungsdatenbanken, Mobile-Optimierungen.

## 10. Lizenz

Die `package.json`-Dateien führen derzeit die ISC-Lizenz. Überprüfe, ob diese Lizenz zum Projektziel passt, oder ergänze einen projektspezifischen Lizenztext.
