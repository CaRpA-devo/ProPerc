# ProPerc

ProPerc ist eine ganzheitliche Gesundheits- und Fitnessplattform, die Ernährung, Training und Fortschritts-Tracking in einer Anwendung bündelt. Das Projekt besteht aus einem modernen React-Frontend (Vite) und einem Express/MongoDB-Backend.

## Überblick

- Fokus auf Ernährungsplanung, Rezeptverwaltung, Kalorientracking und persönliches Coaching.
- Benutzeroberfläche mit Komponenten-basiertem Design, Tailwind CSS und DaisyUI.
- API-gestützte Datenhaltung über Node.js, Express und Mongoose.
- Authentifizierung geplant über Clerk (React SDK ist bereits integriert).

## Kernfunktionen

- **Landing & Marketing**: Startseite mit Hero, Feature-Highlights und Call-to-Action.
- **Dashboard**: Übersicht zu Ernährungsplänen, Rezepte-Sammlung, Fortschrittsdaten und Community-Elementen.
- **Tracking**: Verwaltung von Projekten/Todos, um tägliche Aufgaben rund um Ernährung und Training zu organisieren.
- **Support & Wiki**: Seiten für Hilfestellungen sowie Wissensartikel rund um Fitness und Gesundheit.

## Architektur

- **Frontend (`frontend/`)**
  - React 19 + Vite, React Router, Tailwind CSS 4, DaisyUI.
  - Komponentenaufbau nach Atomic Design (atoms → molecules → organisms → templates → pages).
  - Clerk-Integration für geplantes User-Management und Authentifizierung.
- **Backend (`backend/`)**
  - Express 5, Mongoose 8 für die MongoDB-Anbindung, Zod für Validation.
  - Strukturierte Endpoints (z. B. `user_router`), zentrale Fehlerbehandlung und AppError-Klasse.
  - Konfigurierbare Site-Metadaten und Social Links über `config/site.js`.

## Voraussetzungen

- Node.js ≥ 20 (Frontend & Backend)
- npm ≥ 10
- Lokale oder gehostete MongoDB-Instanz
- Optional: Clerk-Projekt für Authentifizierungstests

## Installation & Entwicklung

```bash
# Abhängigkeiten installieren
cd /home/carpa/ProPerc/frontend
npm install

cd /home/carpa/ProPerc/backend
npm install

# Backend starten
npm run dev

# Frontend in neuem Terminal starten
cd /home/carpa/ProPerc/frontend
npm run dev
```

Die Frontend-App ist standardmäßig unter `http://localhost:5173` erreichbar, das Backend lauscht (entsprechend `.env`-Konfiguration) auf dem konfigurierten Port, z. B. `http://localhost:3000`.

## Umgebungsvariablen

Lege im Ordner `backend/` eine `.env`-Datei an und setze mindestens:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/properc
CLERK_SECRET_KEY=<optional für Backend>
```

Für das Frontend kann bei Bedarf eine `.env` mit Clerk-Publishable-Key und API-URLs hinterlegt werden:

```
VITE_CLERK_PUBLISHABLE_KEY=<dein_key>
VITE_API_BASE_URL=http://localhost:3000
```

## Wichtige npm-Scripts

```bash
# Frontend
npm run dev       # Entwicklungsserver
npm run build     # Produktionsbuild
npm run preview   # Vorschau des Builds

# Backend
npm run dev       # Entwicklungsserver (mit nodemon)
```

## Projektstruktur (Auszug)

```text
/home/carpa/ProPerc
├─ backend
│  ├─ config/          # Datenbank- und Seitenkonfiguration
│  ├─ endpoints/       # API-Routen (z. B. user)
│  ├─ middelwares/     # Express-Middleware
│  ├─ utils/           # Hilfsfunktionen (AppError, Logging, etc.)
│  └─ index.js         # Einstiegspunkt der API
└─ frontend
   ├─ public/          # Statische Assets
   ├─ src/
   │  ├─ components/   # Atomic-Design-Komponenten & Seiten
   │  ├─ assets/       # Bilder, Fonts
   │  ├─ styles/       # Zusätzliche CSS-Dateien
   │  └─ main.jsx      # Einstiegspunkt der SPA
   └─ vite.config.js   # Vite-Konfiguration
```

## Weiterentwicklung

- Offene Merge-Konflikte (z. B. `IndexPage`) sollten bereinigt werden, bevor neue Features entwickelt werden.
- Tests sind aktuell nicht eingerichtet – plane Unit-/Integrationstests, sobald Kernfunktionen stabil sind.
- Plane die Anbindung echter Ernährungs- und Tracking-APIs sowie die finale Authentifizierung über Clerk.

## Lizenz

Bis zur finalen Entscheidung kann der Standard ISC-Lizenztext aus den `package.json`-Dateien verwendet oder eine projektspezifische Lizenz ergänzt werden.
