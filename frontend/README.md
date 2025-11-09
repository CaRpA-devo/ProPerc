# ProPerc Frontend

Willkommen beim Frontend von **ProPerc** – einer modernen Ernährungs- und Performance-Plattform. Die Anwendung stellt unter anderem das Wissenslexikon _PercyPedia_ bereit, mit dem Nutzer Nährstoffe, Supplements und deren Wirkung schnell finden und filtern können.

## Inhaltsverzeichnis

- [Funktionen](#funktionen)
- [Technologien](#technologien)
- [Projektstruktur](#projektstruktur)
- [Lokale Entwicklung](#lokale-entwicklung)
- [Tests](#tests)
- [Deployment-Hinweise](#deployment-hinweise)

## Funktionen

- **PercyPedia Wiki**: Kategorisierte Übersicht zu Vitaminen, Mineralien, Proteinen und Supplements mit Detailansichten, Quellen und Warnhinweisen.
- **Intelligente Suche**: Volltextsuche über Namen, Funktionen und Quellen aller Nährstoffe.
- **Filter nach Kategorien**: Schnelles Umschalten zwischen Nährstoffgruppen für fokussierte Recherche.
- **Interaktives UI**: Dashboard-Layout mit responsiven Karten, Akkordeons und Icons über DaisyUI/Tailwind.
- **Datenhaltung**: Strukturierte JSON-Daten (`src/data/nutritionData.json`) als zentrale Wissensquelle.

## Technologien

- **React 19** mit **Vite 7** als Build- und Dev-Server.
- **Tailwind CSS 4** plus **DaisyUI** für Komponentenstyling.
- **Iconify** für skalierbare Icons.
- **React Router 7** für spätere Navigationserweiterungen.
- **Vitest** als Testing-Framework.
- Weitere Bibliotheken wie **Chart.js**, **Recharts** und **OGL** stehen für Visualisierungen oder 3D-Elemente bereit.

## Projektstruktur

```
frontend/
├─ public/               # Statische Assets
├─ src/
│  ├─ components/
│  │  ├─ layouts/        # z.B. DashboardLayout
│  │  └─ pages/          # u.a. wiki.page.jsx (PercyPedia)
│  ├─ data/
│  │  └─ nutritionData.json
│  ├─ main.jsx           # Einstiegspunkt
│  └─ router/            # (falls konfiguriert) Routing-Definitionen
├─ package.json
└─ README.md
```

## Lokale Entwicklung

Voraussetzungen:

- Node.js ≥ 18
- npm ≥ 9

Schritte:

1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```
3. Anwendung unter der ausgegebenen URL (standardmäßig `http://localhost:5173`) öffnen.

## Tests

- Schnelltests ausführen:
  ```bash
  npm test
  ```
- Test-UI starten:
  ```bash
  npm run test:ui
  ```
- Testabdeckung ermitteln:
  ```bash
  npm run test:coverage
  ```

## Deployment-Hinweise

- Produktionsbuild erstellen:
  ```bash
  npm run build
  ```
- Lokale Vorschau des Build:
  ```bash
  npm run preview
  ```
- Stellen Sie sicher, dass Umgebungsvariablen (z.B. für Authentifizierung via Clerk) in Ihrem Hosting-Setup bereitgestellt werden.

---

Bei Fragen oder Erweiterungswünschen gerne im Team nachhaken – viel Spaß mit ProPerc!
