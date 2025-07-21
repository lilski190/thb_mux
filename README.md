# THB_MUX

Das ist das Frontend für unser Projekt: SustainAble aus dem Fach MUX an der THB im Sommersemester 2025.
SustainAble macht Nachhaltigkeit im Hochschulalltag sichtbar, messbar und erlebbar.
Alltags- und Verbrauchsdaten werden spielerisch visualisiert – mit Gamification, Belohnungen und einer positiven, persönlichen Dynamik.
Dadurch entsteht ein transparenter Überblick über den ökologischen Fußabdruck an der THB – und ein gemeinsamer Fortschritt.

## Team
- Verena Graf (Design, Konzeption, Koordination)
- Ella Danay (Design, Konzeption, Datenvisualisierung)
- Lilian Drabinski (Frontent Entwicklung)
- Artem Paliesika (Backend Entwicklung)

## Getting Started

- Step 1: Repo clonen
- Step 2: run npm install

```bash
npm install
```

- Step 3: Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser um das Projekt zu sehen.

## Deployment

Das Projekt ist mit Vercel deployed und kann hier aufgerufen werden:
[Deployment mit Vercel](https://thb-mux.vercel.app/)

## Frameworks und Ressourchen

In diesem Projekt wurde DaisyUI und Tailwind für das Styling benutzt.
Die verwendete Icons und Grafiken sind von Verena und Ella erstellt worden.
Das Line und das Barchart wurden mit charts.js erstellt.

- [Next.js](https://nextjs.org/) – React Framework für SSR/SSG
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS Framework
- [DaisyUI](https://daisyui.com/) – UI-Komponenten für Tailwind
- [Chart.js](https://www.chartjs.org/) – Datenvisualisierung (Line & Bar Charts)
- [Vercel](https://vercel.com/) – Deployment-Plattform

## Was ist Was

In diesem Abschitt sind Erklärungen zu den einzelen Codeteilen. Ziel ist es den einzelnen Teammitgliedern einen leichten Zugang zu der Arbeit mit Next.js zu geben und einen Überblick zu verschaffen.

### Projektstruktur (Auszug)
```
├── app/ # Routenstruktur (inkl. [lang]/ für sprachsteuerung)
│ ├── dashboard/
│ ├── login/
├── components/ # Wiederverwendbare UI-Komponenten
│ ├── buttons/
│ ├── cards/
├── lib/ # Hilfsfunktionen (z. B. getDictionary)
├── middleware.ts # Sprach- & Auth-Middleware
├── locales/ # Sprachdateien (de.json, en.json, ...)
├── public/ # Statische Assets`
```

### /app

In diesem Ordner sind die einzelen Routen und pages. Jeder Ordner in /app ist einen neu URL route, solange es in diesem Ornder die Datei page.js gibt (z.B. /login hat eine page.js)

#### /app/[lang]

Ist eine dymaische Route welche für die Sprachsteuerung zuständig ist. Hier drin sind verschachtelt die anderen Routen wie /dashboard als private Route auf die nur eingeloggte Nutzer zugrif haben oder /login in der sich Nutzer einloggen können.

### /components

Die Components sind die einzelen Bausteine der Website. Sie können auf UI Libarys wie Daisy UI basieren. (Andere Libarys sind bisher noch nicht eingerichtet) Gute Components sind Wiederverwendbar und Anpassungsfähig. Es können beliebig viele Componenten angelegt werden. Optimalerweise kann man sie in Unterordnern kategoriesieren (z.B. Buttons).

#### Beispiel eines Componenten: DefalutButton.js (mit Daisy UI):

Das ist der Code eines Button Components:

```
import React from "react";

const DefaultButton = () => {
  return <button className="btn">Default</button>;
};

export default DefaultButton;

```

Und die Verwendung in der Collection Page:

```
import { getDictionary } from "@/lib/getDictionary";
import DefaultButton from "@/app/components/buttons/defaultButton";

export default async function CollectionPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      <div>Hier ist der Default Button:</div>
      <DefaultButton />
    </div>
  );
}
```

Durch die Weitergabe von Parametern kann der Button angepasst werden. Hier machen wir z.b. eine Anpassung mit dem Text und der Farbe:

```
//In dem Button Component:

import React from "react";

const DefaultButton = ({ text, colorClass }) => {
  return (
    <button className={`btn ${colorClass ? colorClass : "btn-neutral"}`}>
      {text ? text : "Default text"}
    </button>
  );
};

export default DefaultButton;

// In der Collection Page:

import { getDictionary } from "@/lib/getDictionary";
import DefaultButton from "@/app/components/buttons/defaultButton";

export default async function CollectionPage({ params }) {
  const param = await params;
  const lang = param.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      <div>Hier ist der Default Button in Verschieden Farben:</div>
      <DefaultButton />
      <DefaultButton text="Primary" colorClass="btn-primary" />
      <DefaultButton text="Secondary" colorClass="btn-secondary" />
      <DefaultButton text="Accent" colorClass="btn-accent" />
    </div>
  );
}
```

### global.css

Diese Datei enthält die globalen CSS-Regeln für das gesamte Projekt. Dazu gehören:

- Basis-Styles (z.B. Reset, Box-Sizing)
- Farbvariablen in drei Unterschiedlichen Klassen für Light, Dark und High Contrast Modi
- Typografie-Grundlagen (Fonts, Größen)
- Utility-Klassen und responsive Breakpoints

```
.main {
  --color-base-100: oklch(100% 0 0);
  --color-base-200: oklch(93% 0 0);
  --color-base-300: oklch(86% 0 0);
  ...
}
```

Änderungen hier wirken sich auf die gesamte Anwendung aus, daher bitte vorsichtig anpassen.

### Sprachen

Die Sprachsteuerung erfolgt über das Routing in der Middleware. Im Ordner /app gibt es einen Unterordner [lang], in dem alle sprachabhängigen Routen liegen. Dadurch ist die URL z. B.
https://localhost:3000/de/login oder https://localhost:3000/en/login.

Beim ersten Laden der Website wird die Sprache auf die Systemsprache des Browsers (navigator.language) gesetzt. Dies erfolgt in der Komponente systemLang.js. Wenn der User eingeloggt ist, wird die Systemsprache mit der ausgewählten und gespeicherten Sprache der Anwendung überschrieben. Die Default- und Fallback-Sprache ist Deutsch (de).

Aktuell sind folgende Sprachen implementiert: de (Deutsch), en (Englisch), sp (Spanisch), pl (Polnisch) und ar (Arabisch).
Für Arabisch wird zusätzlich die Leserichtung auf Right-to-Left (RTL) geändert.

Besonderheiten bei Mehrsprachigkeit:
Bei Arabisch gibt es Herausforderungen mit den Zahlenformaten: Die Datenbank liefert arabische Ziffern (0-9), nicht die arabisch-indischen Ziffern, die im arabischen Sprachraum üblich sind. Die Sprache wird grundsätzlich anhand der Browsersprache erkannt, kann aber jederzeit vom User geändert werden. Standardmäßig wird Deutsch verwendet, wenn keine gültige Sprache erkannt wird.

#### Lokalisierte Inhalte

Im Ordner `locales/` liegen die JSON-Dateien für die verschiedenen Sprachen (`de.json`, `en.json` etc.). Diese JSON-Dateien enthalten die Übersetzungen für alle Seiten und werden in den Pages wie folgt genutzt:

```
import { getDictionary } from "@/lib/getDictionary";

export default async function DashboardPage({ params }) {
  const lang = params.lang || "de";
  const dict = await getDictionary(lang);

  return (
    <div>
      <h1 className="mb-5 text-5xl font-bold">{dict.dashboard.title}</h1>
      <h2>{dict.dashboard.welcome}</h2>
    </div>
  );
}
```

Die Funktion getDictionary(lang) lädt die passende Sprachdatei basierend auf dem URL-Parameter lang.

#### Struktur der JSON-Dateien

Jede Sprachdatei ist ein JSON-Objekt, in dem die Schlüssel (Keys) die Seiten und die Werte die Texte enthalten:

```
{
  "home": {
    "title": "Das ist der Deutsche Titel",
    "description": "Das ist die Deutsche Beschreibung"
  },
  "login": {
    "title": "Das ist der Deutsche Login Titel",
    "description": "Das ist die Deutsche Login Beschreibung",
    "login": "Einloggen"
  },
  "dashboard": {
    "title": "Das ist der Deutsche Dashboard Titel",
    "description": "Das ist die Deutsche Dashboard Beschreibung",
    "welcome": "Willkommen auf der Dashboard-Seite"
  }
}

```

Wichtig:
Die Keys müssen in allen Sprachdateien identisch sein, damit die Zuordnung korrekt funktioniert. Fehlt ein Key in einer Sprache, kann der Text dort nicht angezeigt werden.

#### Sprache wechseln

Die Sprache kann über die Komponente LanguageSwitcher.js umgestellt werden. Bei Änderung der Sprache wird diese auch ans Backend gesendet, um Nutzerpräferenzen zu speichern.

### Middleware für Sprach- und Zugriffskontrolle

Diese Middleware sorgt für:

- **Sprachvalidierung und Redirects**  
  Prüft, ob die erste URL-Segmentsprache (`/de`, `/en`, etc.) unterstützt wird.  
  Ist die Sprache ungültig oder fehlt, erfolgt ein Redirect zur Standardsprache `/de`.

- **Öffentliche und geschützte Routen**

  - Öffentliche Routen (z.B. `/`) sind für alle zugänglich.
  - Geschützte Routen (z.B. `/dashboard`) sind nur für eingeloggte Nutzer mit gültigem Token zugänglich.
  - Auth-Routen (z.B. `/login`) sind nur für nicht eingeloggte Nutzer zugänglich.

- **Token-Prüfung**  
  Überprüft, ob ein gültiges Authentifizierungs-Token (`token` Cookie) vorhanden ist, um Zugriff auf geschützte Bereiche zu erlauben.

- **Redirect-Logik**
  - Ungültige Sprache → Redirect zu `/de` + Pfad
  - Ungeloggte Nutzer auf geschützten Routen → Redirect zu `/[lang]/login`
  - Eingeloggte Nutzer auf Login-Seite → Redirect zu `/[lang]/dashboard`

### Accessibility (Barrierefreiheit)

Unsere Anwendung berücksichtigt verschiedene Aspekte der Barrierefreiheit, um möglichst viele Nutzer:innen einzubeziehen:

- **Farbmodi:**  
  Es gibt drei Farbmodi, die Nutzer:innen wählen können:

  - Light (Heller Modus)
  - Dark (Dunkler Modus)
  - Hoher Kontrast (für bessere Lesbarkeit und Sichtbarkeit)

- **ARIA-Attribute:**  
  Wir verwenden ARIA-Attribute (Accessible Rich Internet Applications), um Screenreadern und assistiven Technologien wichtige Zusatzinformationen zu liefern.  
  Beispielsweise sind beschreibende Texte für komplexere Elemente wie Statistiken eingebaut, damit diese für Screenreader verständlich sind.

- **Keyboard-Navigation:**  
  Alle Formularelemente und interaktiven Komponenten sind so gestaltet, dass sie vollständig mit der Tastatur bedienbar sind.  
  Damit stellen wir sicher, dass Nutzer:innen, die keine Maus verwenden können oder wollen, problemlos mit der Anwendung interagieren können.

Diese Maßnahmen helfen dabei, die Anwendung zugänglicher und nutzerfreundlicher für Menschen mit unterschiedlichen Bedürfnissen zu gestalten.

## Server-side Rendering

Die App verwendet das App-Router-Feature von Next.js mit React Server Components. 
Dadurch werden viele Seiten auf dem Server gerendert (SSR), was die Performance verbessert und SEO-freundlich ist. Componenten und Pages die mit dem User Interagieren (z.b. Forms) müssen aber weiterhin Client-Side gerendert werden. Als Schittstelle zwischen Client-Component und API werden Server Actions genutzt.

## Authentifizierung & Datenfluss

- Der Login erfolgt über ein externes Backend.
- Nach erfolgreichem Login wird ein `jwt token`-Cookie gesetzt (HttpOnly, Secure).
- Die Middleware prüft das Token bei geschützten Routen (`/dashboard` etc.).
- Das Token wird in Server Components genutzt, um geschützte Daten vom Backend zu laden.
- Ein Logout löscht den Token und redirectet zur Login-Seite.
