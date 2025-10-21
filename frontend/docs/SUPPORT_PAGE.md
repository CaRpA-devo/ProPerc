# Support-Seite - Dokumentation

## Übersicht

Die Support-Seite ermöglicht es Benutzern, Support-Anfragen zu erstellen, häufig gestellte Fragen (FAQs) einzusehen und mit dem Support-Team zu kommunizieren.

## Features

- ✅ **Support-Formular** mit vollständiger Validierung
- ✅ **Datei-Upload** (bis zu 5MB, Bilder, PDFs, Logs)
- ✅ **FAQ-Liste** mit Accordion-Navigation
- ✅ **Bestätigungsseite** mit Ticket-ID
- ✅ **Responsive Design** (Mobile-First)
- ✅ **Accessibility** (WCAG 2.1 AA konform)
- ✅ **Mock-API** für Entwicklung
- ✅ **Deutsche Lokalisierung**

## Struktur (Atomic Design)

```
frontend/src/components/
├── atoms/Support/
│   ├── input-text.comp.jsx          # Text-Input mit Validierung
│   ├── text-area.comp.jsx           # Textarea mit Zeichenzähler
│   ├── file-input.comp.jsx          # Datei-Upload mit Größenprüfung
│   ├── label.comp.jsx               # Label-Komponente
│   ├── error-message.comp.jsx       # Fehlermeldungs-Alert
│   └── submit-button.comp.jsx       # Submit-Button mit Loading-State
│
├── molecules/Support/
│   ├── category-select.comp.jsx     # Kategorie-Dropdown
│   ├── form-row.comp.jsx            # Grid-Layout für Formular-Zeilen
│   └── attachment-preview.comp.jsx  # Vorschau hochgeladener Dateien
│
├── organisms/Support/
│   ├── support-form.comp.jsx        # Haupt-Formular mit Validierung
│   └── faq-list.comp.jsx            # FAQ-Accordion
│
├── templates/Support/
│   └── support-template.comp.jsx    # Seiten-Layout
│
└── pages/
    ├── support.page.jsx             # Support-Seite
    └── support-confirmation.page.jsx # Bestätigungsseite

frontend/src/services/
└── supportApi.js                    # API-Service (mit Mock)

frontend/src/i18n/
└── support.de.json                  # Deutsche Übersetzungen
```

## Installation & Setup

### 1. Test-Dependencies installieren

```bash
cd frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### 2. Package.json anpassen

Füge folgende Scripts hinzu:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## API-Endpoints

### Mock-Modus (Standard)

Die Support-API läuft standardmäßig im Mock-Modus, wenn keine `VITE_BACKEND_URL` konfiguriert ist.

**Mock-Response-Beispiel:**

```json
{
  "success": true,
  "ticket": {
    "id": "TICK-1729491600000-ABC123XYZ",
    "status": "open",
    "createdAt": "2025-10-21T04:52:00.000Z",
    "email": "user@example.com",
    "category": "technical",
    "subject": "Login-Problem",
    "estimatedResponseTime": "24-48 Stunden"
  },
  "message": "Ihr Support-Ticket wurde erfolgreich erstellt"
}
```

### Backend-Integration

Wenn ein Backend vorhanden ist, setze die `VITE_BACKEND_URL` in `.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

**Erwartete Backend-Endpoints:**

#### POST `/api/support/tickets`

**Request (FormData):**
- `email`: string
- `category`: "account" | "tracking" | "billing" | "technical" | "feature" | "other"
- `subject`: string
- `message`: string
- `userId`: string (optional)
- `attachments`: File[] (optional)

**Response:**
```json
{
  "success": true,
  "ticket": {
    "id": "string",
    "status": "open",
    "createdAt": "ISO-8601 string",
    "email": "string",
    "category": "string",
    "subject": "string",
    "estimatedResponseTime": "string"
  }
}
```

#### GET `/api/support/tickets/:id`

**Response:**
```json
{
  "id": "string",
  "status": "open" | "in_progress" | "resolved" | "closed",
  "category": "string",
  "subject": "string",
  "message": "string",
  "createdAt": "ISO-8601 string",
  "responses": []
}
```

## Formular-Validierung

### Client-seitig

- **E-Mail**: Format-Validierung (Regex)
- **Kategorie**: Pflichtfeld
- **Betreff**: Min. 3 Zeichen
- **Nachricht**: Min. 20 Zeichen
- **Datei-Upload**: Max. 5MB pro Datei
- **DSGVO-Consent**: Pflicht-Checkbox

### Fehlermeldungen

Alle Fehlermeldungen sind in deutscher Sprache und werden inline unter den Feldern angezeigt.

## Tests ausführen

### Unit Tests

```bash
npm test -- atoms/Support
npm test -- molecules/Support
```

### Integration Tests

```bash
npm test -- organisms/Support
```

### Alle Tests

```bash
npm test
```

### Coverage Report

```bash
npm run test:coverage
```

## Accessibility Features

- ✅ Alle Inputs haben `<label>` mit `htmlFor`
- ✅ Pflichtfelder mit `aria-required="true"`
- ✅ Fehlermeldungen mit `aria-invalid` und `aria-describedby`
- ✅ Fehlermeldungen mit `role="alert"` und `aria-live="polite"`
- ✅ Focus-States sichtbar (DaisyUI Standard)
- ✅ Kontrast-Ratio >4.5:1
- ✅ Keyboard-Navigation möglich

## Verwendung

### Support-Seite aufrufen

```
http://localhost:5173/support
```

### Navigation

Die Support-Seite ist bereits in der App-Routing-Konfiguration eingebunden:

```jsx
<Route element={<SupportPage />} path="/support" />
<Route element={<SupportConfirmationPage />} path="/support/confirmation" />
```

## Anpassungen

### FAQ-Einträge ändern

Bearbeite `faq-list.comp.jsx`:

```jsx
const faqs = [
  {
    question: "Ihre Frage?",
    answer: "Ihre Antwort."
  },
  // ...
];
```

### Kategorien anpassen

Bearbeite `category-select.comp.jsx`:

```jsx
const categories = [
  { value: "custom", label: "Eigene Kategorie" },
  // ...
];
```

### Datei-Upload-Limits ändern

Bearbeite `file-input.comp.jsx`:

```jsx
<FileInput
  maxSize={10} // 10MB statt 5MB
  accept="image/*,.pdf,.docx" // Custom Dateitypen
/>
```

## Troubleshooting

### Tests schlagen fehl

**Problem:** `@testing-library/jest-dom` Matchers nicht gefunden

**Lösung:**
```bash
npm install --save-dev @testing-library/jest-dom
```

### Formular sendet nicht

**Problem:** Mock-API gibt Fehler zurück

**Lösung:** Mock simuliert 10% Fehlerrate. Mehrmals versuchen oder in `supportApi.js` die Zeile auskommentieren:

```js
// if (Math.random() < 0.1) { ... }
```

### Clerk-User wird nicht geladen

**Problem:** `useUser` Hook gibt `null` zurück

**Lösung:** Stelle sicher, dass der User eingeloggt ist oder das Formular erlaubt manuelle E-Mail-Eingabe.

## Nächste Schritte

- [ ] Backend-Endpoints implementieren
- [ ] E-Mail-Benachrichtigungen einrichten
- [ ] Admin-Panel für Ticket-Verwaltung
- [ ] Ticket-Status-Tracking für User
- [ ] Multi-Language Support (EN, CZ)

## Support

Bei Fragen zur Support-Seite:
- Siehe Code-Kommentare in den Komponenten
- Siehe Unit/Integration Tests für Beispiele
- Konsultiere `i18n/support.de.json` für Texte
