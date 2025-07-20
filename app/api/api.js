const FLASK_BASE_URL = "https://campertour.pl"; //"http://192.168.178.44:5000";

//process.env.NEXT_PUBLIC_FLASK_API ||
// "http://mux-team2.th-brandenburg.de:5000";

export async function getRequestToken(token, path) {
  const res = await fetch(`${FLASK_BASE_URL}/${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Res fehler", res);
    throw new Error("Fehler beim Senden der Daten");
  }

  const data = await res.json();
  return data;
}

export async function postRequest(path, obj) {
  console.log("postRequest Body", JSON.stringify(obj));
  const res = await fetch(`${FLASK_BASE_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  if (!res.ok) {
    const errorText = await res.text(); // manchmal ist die Antwort kein JSON
    console.error("HTTP-Fehler:", res.status, errorText);
    throw new Error(`HTTP-Fehler: ${res.status} - ${errorText}`);
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
    throw new Error("Fehler beim Senden der Daten");
  }

  const data = await res.json();
  return data;
}
