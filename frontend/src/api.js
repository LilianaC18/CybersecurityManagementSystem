// Toate cererile HTTP stau aici; componentele nu apelează fetch direct.
// Resursa proprie: "amenintari" (din db.json), servită la /amenintari.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Funcție comună: trimite JSON și aruncă eroare dacă răspunsul nu este 2xx
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }
  // 204 No Content nu are corp
  return res.status === 204 ? null : res.json();
}

export function fetchAmenintari() {
  return request("/amenintari");
}

export function createAmenintare(amenintare) {
  return request("/amenintari", {
    method: "POST",
    body: JSON.stringify(amenintare),
  });
}

export function updateAmenintare(id, changes) {
  return request(`/amenintari/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deleteAmenintare(id) {
  return request(`/amenintari/${id}`, { method: "DELETE" });
}
