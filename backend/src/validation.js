// Validare pe server: datele de la client nu sunt niciodată de încredere.
// Valorile fixe trebuie să fie identice cu SEVERITATI din frontend/src/constants.js
export const SEVERITATI = ["Critical", "High", "Medium", "Low"];
const TITLU_MAX = 100;
const SURSA_MAX = 50;

// partial = true pentru PATCH (se verifică doar câmpurile trimise)
export function valideazaAmenintare(body, { partial = false } = {}) {
  const erori = [];
  const date = {};

  // un tablou sau o valoare simplă nu este un element
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { erori: ["corpul cererii trebuie să fie un obiect JSON"], date };
  }

  if (!partial || body.titlu !== undefined) {
    if (typeof body.titlu !== "string" || body.titlu.trim() === "") {
      erori.push("titlu este obligatoriu");
    } else if (body.titlu.trim().length > TITLU_MAX) {
      erori.push(`titlu are maximum ${TITLU_MAX} de caractere`);
    } else {
      date.titlu = body.titlu.trim();
    }
  }

  if (body.remediat !== undefined) {
    if (typeof body.remediat !== "boolean") {
      erori.push("remediat trebuie să fie true sau false");
    } else {
      date.remediat = body.remediat;
    }
  } else if (!partial) {
    date.remediat = false;
  }

  if (!partial || body.severitate !== undefined) {
    const s = body.severitate ?? "Medium";
    if (!SEVERITATI.includes(s)) {
      erori.push(`severitate trebuie să fie una din: ${SEVERITATI.join(", ")}`);
    } else {
      date.severitate = s;
    }
  }

  // sursa este opțională: lipsă înseamnă text gol
  if (body.sursa !== undefined) {
    if (typeof body.sursa !== "string") {
      erori.push("sursa trebuie să fie text");
    } else if (body.sursa.trim().length > SURSA_MAX) {
      erori.push(`sursa are maximum ${SURSA_MAX} de caractere`);
    } else {
      date.sursa = body.sursa.trim();
    }
  } else if (!partial) {
    date.sursa = "";
  }

  return { erori, date };
}

// Id-urile din adresă vin ca text; se acceptă doar numere întregi pozitive
export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}
