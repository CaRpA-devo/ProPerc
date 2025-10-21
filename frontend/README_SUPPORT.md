# Support-Seite - Quick Start

## 🚀 Schnellstart

```bash
# 1. Dependencies installieren (falls noch nicht geschehen)
cd frontend
npm install

# 2. Test-Dependencies installieren
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# 3. Dev-Server starten
npm run dev

# 4. Browser öffnen
# → http://localhost:5173/support
```

## 📁 Neue Dateien

### Components (Atomic Design)

```
src/components/
├── atoms/Support/
│   ├── input-text.comp.jsx           ✅ Text-Input mit Validierung
│   ├── text-area.comp.jsx            ✅ Textarea mit Zeichenzähler
│   ├── file-input.comp.jsx           ✅ File-Upload mit Größencheck
│   ├── label.comp.jsx                ✅ Label-Component
│   ├── error-message.comp.jsx        ✅ Error-Alert
│   ├── submit-button.comp.jsx        ✅ Submit-Button mit Loading
│   └── __tests__/
│       ├── input-text.comp.test.jsx  ✅ Unit Tests
│       └── submit-button.comp.test.jsx ✅ Unit Tests
│
├── molecules/Support/
│   ├── category-select.comp.jsx      ✅ Kategorie-Dropdown
│   ├── form-row.comp.jsx             ✅ Grid-Layout Wrapper
│   └── attachment-preview.comp.jsx   ✅ Datei-Vorschau
│
├── organisms/Support/
│   ├── support-form.comp.jsx         ✅ Haupt-Formular
│   ├── faq-list.comp.jsx             ✅ FAQ-Accordion
│   └── __tests__/
│       └── support-form.comp.test.jsx ✅ Integration Tests
│
└── templates/Support/
    └── support-template.comp.jsx     ✅ Page-Layout

src/components/pages/
├── support.page.jsx                  ✅ Support-Seite (aktualisiert)
└── support-confirmation.page.jsx     ✅ Bestätigungsseite (neu)
```

### Services & Config

```
src/services/
└── supportApi.js                     ✅ API-Service mit Mock

src/test/
└── setup.js                          ✅ Test-Setup

src/i18n/
└── support.de.json                   ✅ Deutsche Übersetzungen

vitest.config.js                      ✅ Vitest-Konfiguration
```

### Documentation

```
docs/
└── SUPPORT_PAGE.md                   ✅ Ausführliche Dokumentation

TESTING_GUIDE.md                      ✅ Testing-Anleitung
PULL_REQUEST_TEMPLATE.md              ✅ PR-Beschreibung
```

## ✨ Features

- ✅ **Support-Formular** - Vollständige Client-Validierung
- ✅ **Datei-Upload** - Max. 5MB, Multiple Files
- ✅ **FAQ-Accordion** - 6 häufige Fragen
- ✅ **Bestätigungsseite** - Mit Ticket-ID
- ✅ **Mock-API** - Entwicklung ohne Backend
- ✅ **Responsive** - Mobile-First Design
- ✅ **Accessibility** - WCAG 2.1 AA konform
- ✅ **Tests** - Unit & Integration (Vitest)
- ✅ **i18n-ready** - Deutsche Texte strukturiert

## 🧪 Tests ausführen

```bash
# Alle Tests
npm test

# Mit Coverage
npm run test:coverage

# Mit UI
npm run test:ui

# Nur Support-Tests
npm test -- Support
```

## 📝 Formular-Felder

| Feld | Type | Validierung | Pflicht |
|------|------|-------------|---------|
| E-Mail | Email | Format-Check | ✅ |
| Kategorie | Select | 6 Optionen | ✅ |
| Betreff | Text | Min. 3 Zeichen | ✅ |
| Nachricht | Textarea | Min. 20 Zeichen | ✅ |
| Anhänge | File | Max. 5MB | ❌ |
| DSGVO | Checkbox | Boolean | ✅ |

## 🔌 API-Integration

### Mock-Modus (Standard)

Automatisch aktiv. Keine Konfiguration nötig.

### Backend-Integration

Erstelle `.env`:
```env
VITE_BACKEND_URL=http://localhost:5000
```

Backend muss Endpoint bereitstellen:
```
POST /api/support/tickets
Content-Type: multipart/form-data
```

Siehe `docs/SUPPORT_PAGE.md` für Details.

## 📖 Dokumentation

- **Haupt-Doku**: [`docs/SUPPORT_PAGE.md`](./docs/SUPPORT_PAGE.md)
- **Testing**: [`TESTING_GUIDE.md`](./TESTING_GUIDE.md)
- **PR-Template**: [`PULL_REQUEST_TEMPLATE.md`](../PULL_REQUEST_TEMPLATE.md)
- **i18n-Keys**: [`src/i18n/support.de.json`](./src/i18n/support.de.json)

## 🎯 Testing-Checkliste

Manuelle Tests:

- [ ] Navigiere zu `/support`
- [ ] Formular ohne Felder absenden → Fehler sichtbar
- [ ] Ungültige E-Mail eingeben → Fehler
- [ ] Nachricht <20 Zeichen → Fehler
- [ ] Datei >5MB hochladen → Fehler
- [ ] Alle Felder korrekt ausfüllen → Success
- [ ] Bestätigungsseite zeigt Ticket-ID
- [ ] FAQ-Accordion funktioniert
- [ ] Mobile-Ansicht testen (375px)
- [ ] Keyboard-Navigation (nur TAB)

Automatische Tests:

```bash
npm test
# → Sollte 22 Tests bestehen
```

## 🐛 Troubleshooting

**Tests schlagen fehl?**
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**Formular sendet nicht?**
- Mock-API simuliert 10% Fehlerrate
- Erneut versuchen oder Mock-Fehler in `supportApi.js` auskommentieren

**E-Mail-Feld disabled?**
- User ist eingeloggt (Clerk)
- Gewolltes Verhalten: Auto-Fill mit User-E-Mail

## 📦 Dependencies

### Neue Production-Dependencies
Keine! Nutzt bereits vorhandene Libraries.

### Neue Dev-Dependencies (erforderlich)
```json
{
  "devDependencies": {
    "vitest": "latest",
    "@testing-library/react": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/user-event": "latest",
    "jsdom": "latest"
  }
}
```

## 🚀 Deployment

Keine speziellen Anforderungen. Build wie gewohnt:

```bash
npm run build
```

## 📞 Support

Bei Fragen:
1. Siehe Dokumentation (`docs/SUPPORT_PAGE.md`)
2. Siehe Test-Code für Beispiele
3. Öffne Issue mit Details

---

**Version**: 1.0.0  
**Erstellt**: 2025-10-21  
**Autor**: ProPerc Team
