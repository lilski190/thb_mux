const FLASK_BASE_URL = "https://campertour.pl";

/**
 * Führt einen GET-Request mit Token-Authentifizierung durch.
 *
 * @param {string} token - JWT-Token für Authorization-Header.
 * @param {string} path - API-Endpunkt (z.B. "home", "profile").
 * @returns {Promise<any>} Antwort-Daten als JSON-Objekt.
 * @throws {Error} Wirft bei HTTP-Fehlern mit Fehlernachricht.
 */
export async function getRequestToken(token, path) {
  const res = await fetch(`${FLASK_BASE_URL}/${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    let errorMsg = ` (${res.status})`;

    try {
      const json = JSON.parse(errorText);
      if (json.error) {
        errorMsg = json.error;
      }
    } catch (_) {}

    throw new Error(errorMsg);
  }

  const data = await res.json();
  return data;
}

/**
 * Führt einen POST-Request ohne Token durch.
 *
 * @param {string} path - API-Endpunkt.
 * @param {Object} obj - Payload als JS-Objekt, wird als JSON gesendet.
 * @returns {Promise<any>} Antwort-Daten als JSON-Objekt.
 * @throws {Error} Wirft bei HTTP-Fehlern mit Fehlernachricht.
 */
export async function postRequest(path, obj) {
  const res = await fetch(`${FLASK_BASE_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  if (!res.ok) {
    const errorText = await res.text();
    let errorMsg = `(${res.status})`;

    try {
      const json = JSON.parse(errorText);
      if (json.error) {
        errorMsg = json.error;
      }
    } catch (_) {}

    throw new Error(errorMsg);
  }

  let data;
  try {
    data = await res.json();
  } catch (jsonErr) {
    console.error("Fehler beim Parsen der Antwort als JSON:", jsonErr);
    throw new Error("Ungültige JSON-Antwort vom Server");
  }

  return data;
}

/**
 * Führt einen POST-Request mit Token-Authentifizierung durch.
 *
 * @param {string} token - JWT-Token für Authorization-Header.
 * @param {string} path - API-Endpunkt.
 * @param {Object} obj - Payload als JS-Objekt, wird als JSON gesendet.
 * @returns {Promise<any>} Antwort-Daten als JSON-Objekt.
 * @throws {Error} Wirft bei HTTP-Fehlern mit Fehlernachricht.
 */
export async function postRequestToken(token, path, obj) {
  const res = await fetch(`${FLASK_BASE_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(obj),
  });

  if (!res.ok) {
    const errorText = await res.text();
    let errorMsg = ` (${res.status})`;

    try {
      const json = JSON.parse(errorText);
      if (json.error) {
        errorMsg = json.error;
      }
    } catch (_) {}

    throw new Error(errorMsg);
  }

  const data = await res.json();
  return data;
}
