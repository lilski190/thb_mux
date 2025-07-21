/**
 * Lädt zur Laufzeit das Sprach-Wörterbuch (Dictionary) für die angegebene Sprache.
 *
 * Die Funktion verwendet dynamisches `import()`, um eine JSON-Datei aus dem `locales`-Verzeichnis zu laden.
 * Sie unterstützt Code-Splitting und lädt nur die tatsächlich benötigte Sprachdatei.
 *
 * @async
 * @function getDictionary
 * @param {string} lang - Der Sprachcode (z. B. "de", "en", "pl").
 * @returns {Promise<Object>} Ein Promise, das das Sprach-Wörterbuch als Objekt zurückgibt.
 *
 * @example
 * const dict = await getDictionary("en");
 * console.log(dict.errors.notFound); // Zugriff auf übersetzte Strings
 *
 * @file locales/
 * Dieses Verzeichnis enthält JSON-Dateien mit Übersetzungen pro Sprache.
 * Jede Datei (z. B. `de.json`, `en.json`) exportiert ein lokales Wörterbuch als Objekt.
 *
 * Strukturbeispiel:
 * {
 *   "errors": {
 *     "notFound": "Seite nicht gefunden",
 *     "loading": "Lade..."
 *   },
 *   "buttons": {
 *     "submit": "Absenden"
 *   }
 * }
 *
 * Diese Dateien werden von der Funktion `getDictionary(lang)` dynamisch geladen.
 */

export async function getDictionary(lang) {
  return (await import(`@/locales/${lang}.json`)).default;
}
