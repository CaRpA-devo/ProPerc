# Testing Guide - Support-Seite

## Quick Start

```bash
# 1. Dependencies installieren
cd frontend
npm install

# Falls Test-Dependencies fehlen:
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# 2. Dev-Server starten
npm run dev

# 3. Browser öffnen
# → http://localhost:5173/support

# 4. Tests ausführen
npm test
```

## 🧪 Manuelle Tests

### Test 1: Formular-Validierung (Client-seitig)

**Schritte:**
1. Navigiere zu `/support`
2. Klicke direkt auf "Anfrage senden" (ohne Felder auszufüllen)

**Erwartetes Ergebnis:**
- ❌ Rote Fehlermeldungen unter allen Pflichtfeldern
- ❌ "Bitte korrigieren Sie die Fehler im Formular" oben
- ❌ Formular wird NICHT abgeschickt

**Fehlermeldungen:**
- E-Mail: "E-Mail-Adresse ist erforderlich" (falls nicht eingeloggt)
- Kategorie: "Bitte wählen Sie eine Kategorie aus"
- Betreff: "Betreff muss mindestens 3 Zeichen lang sein"
- Nachricht: "Nachricht muss mindestens 20 Zeichen lang sein"
- Checkbox: "Sie müssen der Datenverarbeitung zustimmen"

---

### Test 2: Erfolgreicher Submit

**Schritte:**
1. Fülle alle Felder korrekt aus:
   - Kategorie: "Technische Probleme"
   - Betreff: "Login funktioniert nicht"
   - Nachricht: "Ich kann mich seit heute nicht mehr einloggen. Passwort-Reset funktioniert auch nicht."
   - Checkbox: ✓ aktivieren
2. Klicke "Anfrage senden"

**Erwartetes Ergebnis:**
- ✅ Button zeigt "Wird gesendet..." mit Spinner
- ✅ Button ist disabled während Submit
- ✅ Nach 1-2 Sekunden: Redirect zu `/support/confirmation`
- ✅ Bestätigungsseite zeigt Ticket-ID (z.B. `TICK-1729491600000-ABC123`)
- ✅ Status: "Offen"
- ✅ Erstellt-am Datum angezeigt

---

### Test 3: E-Mail-Validierung

**Schritte:**
1. Gib ungültige E-Mail ein: `test@` oder `ungültig`
2. Fülle andere Felder korrekt aus
3. Klicke "Anfrage senden"

**Erwartetes Ergebnis:**
- ❌ Fehler unter E-Mail-Feld: "Bitte geben Sie eine gültige E-Mail-Adresse ein"
- ❌ Formular wird NICHT abgeschickt

---

### Test 4: Nachrichtenlänge

**Schritte:**
1. Gib kurze Nachricht ein: "Hilfe!"
2. Beobachte Zeichenzähler unter Textarea

**Erwartetes Ergebnis:**
- ⚠️ Zeichenzähler zeigt: "5/20 Zeichen" in Orange/Warning-Farbe
- ❌ Beim Submit: "Nachricht muss mindestens 20 Zeichen lang sein"

**Schritte (fortsetzung):**
3. Erweitere Nachricht auf >20 Zeichen

**Erwartetes Ergebnis:**
- ✅ Zeichenzähler wird grün
- ✅ Fehler verschwindet beim Tippen

---

### Test 5: Datei-Upload

**Schritte:**
1. Klicke auf "Datei auswählen"
2. Wähle eine kleine Bilddatei (<5MB)

**Erwartetes Ergebnis:**
- ✅ Datei erscheint in Vorschau-Liste
- ✅ Dateiname, Größe und Icon sichtbar
- ✅ "X"-Button zum Entfernen vorhanden

**Schritte (fortsetzung):**
3. Klicke auf "X"-Button

**Erwartetes Ergebnis:**
- ✅ Datei wird aus Liste entfernt

**Schritte (Error-Fall):**
4. Versuche Datei >5MB hochzuladen

**Erwartetes Ergebnis:**
- ❌ Fehlermeldung: "Datei(en) zu groß. Maximale Größe: 5MB"
- ❌ Datei wird NICHT zur Liste hinzugefügt

---

### Test 6: FAQ-Accordion

**Schritte:**
1. Scrolle zur FAQ-Liste (rechts auf Desktop, unten auf Mobile)
2. Klicke auf erste Frage: "Wie kann ich mein Passwort zurücksetzen?"

**Erwartetes Ergebnis:**
- ✅ Accordion öffnet sich mit Antwort
- ✅ Andere Accordions schließen sich

**Schritte (fortsetzung):**
3. Klicke auf zweite Frage

**Erwartetes Ergebnis:**
- ✅ Erste Frage schließt sich
- ✅ Zweite Frage öffnet sich

---

### Test 7: Responsive Design

**Schritte:**
1. Öffne Dev-Tools (F12)
2. Wechsle zu Mobile-Ansicht (375px)

**Erwartetes Ergebnis:**
- ✅ Formular und FAQ untereinander (1 Spalte)
- ✅ Buttons stapeln sich vertikal
- ✅ Alle Texte lesbar
- ✅ Keine horizontale Scrollbar

**Schritte (fortsetzung):**
3. Wechsle zu Tablet (768px)

**Erwartetes Ergebnis:**
- ✅ Formular und FAQ nebeneinander (2 Spalten)
- ✅ FAQ ist sticky (bleibt beim Scrollen sichtbar)

---

### Test 8: Zurücksetzen-Button

**Schritte:**
1. Fülle Formular aus
2. Klicke "Zurücksetzen"

**Erwartetes Ergebnis:**
- ✅ Alle Felder werden geleert
- ✅ Kategorie zurück auf "Bitte auswählen"
- ✅ Checkbox deaktiviert
- ✅ Fehler verschwinden
- ✅ Anhänge entfernt

---

### Test 9: Eingeloggter User

**Voraussetzung:** Mit Clerk anmelden

**Erwartetes Ergebnis:**
- ✅ E-Mail-Feld ist vorausgefüllt mit User-E-Mail
- ✅ E-Mail-Feld ist disabled (nicht änderbar)
- ✅ userId wird automatisch mitgesendet

---

### Test 10: Accessibility (Keyboard)

**Schritte:**
1. Navigiere mit TAB-Taste durch Formular
2. Nutze ENTER/SPACE für Checkbox/Select

**Erwartetes Ergebnis:**
- ✅ Alle Felder sind mit TAB erreichbar
- ✅ Focus-Ring ist sichtbar (blauer Rand)
- ✅ Formular kann komplett ohne Maus bedient werden
- ✅ ENTER sendet Formular ab

---

## 🤖 Automatisierte Tests

### Alle Tests ausführen

```bash
npm test
```

**Erwartete Ausgabe:**
```
✓ src/components/atoms/Support/__tests__/input-text.comp.test.jsx (7)
✓ src/components/atoms/Support/__tests__/submit-button.comp.test.jsx (6)
✓ src/components/organisms/Support/__tests__/support-form.comp.test.jsx (9)

Test Files  3 passed (3)
Tests  22 passed (22)
```

### Einzelne Test-Suites

```bash
# Nur InputText Tests
npm test -- input-text

# Nur SupportForm Tests
npm test -- support-form

# Alle Support-Tests
npm test -- Support
```

### Coverage Report

```bash
npm run test:coverage
```

**Erwartete Coverage:**
- Atoms: >90%
- Molecules: >80%
- Organisms: >75%

### Watch-Modus (während Entwicklung)

```bash
npm test -- --watch
```

---

## 🐛 Troubleshooting

### Problem: "Cannot find module '@testing-library/react'"

**Lösung:**
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Problem: Formular sendet nicht / stuck bei "Wird gesendet..."

**Ursache:** Mock-API simuliert gelegentlich Fehler (10%)

**Lösung:** Erneut versuchen oder in `supportApi.js` Zeile 42-44 auskommentieren:
```js
// if (Math.random() < 0.1) {
//   throw new Error("Netzwerkfehler: Bitte versuchen Sie es erneut");
// }
```

### Problem: E-Mail-Feld ist disabled

**Ursache:** User ist eingeloggt (Clerk)

**Lösung:** Das ist gewolltes Verhalten. Zum Testen ausloggen oder Mock in `support-form.comp.jsx` anpassen.

### Problem: Tests schlagen fehl mit "ReferenceError: global is not defined"

**Lösung:** Stelle sicher, dass `vitest.config.js` vorhanden ist und `globals: true` gesetzt ist.

### Problem: Navigation-Links fehlen zur Support-Seite

**Lösung:** Support-Seite ist unter `/support` direkt erreichbar. Optional Link in `NavbarLink` Component hinzufügen.

---

## ✅ Acceptance Criteria

Alle folgenden Punkte sollten erfüllt sein:

- [x] `/support` Route ist erreichbar
- [x] Formular validiert alle Pflichtfelder
- [x] E-Mail-Format wird geprüft
- [x] Datei-Upload funktioniert mit Größen-Check
- [x] Submit erzeugt Ticket-ID
- [x] Bestätigungsseite zeigt Ticket-Details
- [x] FAQ-Accordion funktioniert
- [x] Responsive auf Mobile/Tablet/Desktop
- [x] Accessibility: Keyboard-Navigation möglich
- [x] Alle automatisierten Tests bestehen
- [x] Keine Console-Errors im Browser
- [x] Mock-API liefert realistische Responses

---

## 📞 Support bei Problemen

Bei Fragen oder Problemen:
1. Siehe `docs/SUPPORT_PAGE.md` für ausführliche Dokumentation
2. Prüfe Test-Code für Beispiele: `__tests__/*.test.jsx`
3. Siehe Code-Kommentare in Komponenten
4. Öffne Issue mit Fehlerbeschreibung + Console-Logs
