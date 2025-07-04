const FLASK_BASE_URL =
  process.env.NEXT_PUBLIC_FLASK_API ||
  "http://mux-team2.th-brandenburg.de:5000";

let testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1MTU0ODgzNSwianRpIjoiMjcwZDgwMDgtYjliYS00NjQ1LTk1ZDUtMTQyMzRlNzU0MzRhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QiLCJuYmYiOjE3NTE1NDg4MzUsImNzcmYiOiI2YTRiZWUyNi01ZGZhLTQ0ZmEtYTJkMy1iMDE4ZmI2OTgzY2MiLCJleHAiOjE3NTE1NDk3MzV9.x0crUjgeKWBSKQVbiAiVfTrPenJ2KcVEsVBFME6jhQs";

export async function getRequestToken(token, path) {
  const res = await fetch(`${FLASK_BASE_URL}/${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Fehler beim Senden der Daten");
  }

  const data = await res.json();
  return data;
}

export async function postRequest(path, obj) {
  console.log("postRequest Body", JSON.stringify(obj));
  //log: postRequest Body {"username":"demo@thb.de","password":"demo2025"}
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
