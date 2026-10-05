const SEVERITATI = ["Critical", "High", "Medium", "Low"];

const amenintari = [
  {
    id: 1,
    titlu: "WannaCry.v2 Ransomware",
    remediat: false,
    severitate: "Critical",
  },
  {
    id: 2,
    titlu: "SQL Injection in Auth Endpoint",
    remediat: true,
    severitate: "High",
  },
  {
    id: 3,
    titlu: "Outdated SSL/TLS Protocol",
    remediat: false,
    severitate: "Medium",
  },
];

function listeazaTitluri(lista) {
  return lista.map((t) => t.titlu);
}

function numaraActive(lista) {
  return lista.filter((t) => !t.remediat).length;
}

function cautaDupaTitlu(lista, text) {
  const textCautat = text.toLowerCase();
  return lista.filter((t) => t.titlu.toLowerCase().includes(textCautat));
}

function nextId(lista) {
  return lista.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}

function adaugaAmenintare(lista, titlu, severitate = "Medium") {
  const titluCurat = titlu ? titlu.trim() : "";

  if (!titluCurat) {
    console.warn("Validare eșuată: Titlul nu poate fi gol.");
    return lista;
  }

  if (!SEVERITATI.includes(severitate)) {
    console.warn(`Validare eșuată: Severitate invalidă "${severitate}". Valori permise: ${SEVERITATI.join(", ")}`);
    return lista;
  }

  const nouaAmenintare = {
    id: nextId(lista),
    titlu: titluCurat,
    remediat: false,
    severitate: severitate,
  };

  return [...lista, nouaAmenintare];
}

function comutaRemediat(lista, id) {
  return lista.map((t) => (t.id === id ? { ...t, remediat: !t.remediat } : t));
}

function stergeAmenintare(lista, id) {
  return lista.filter((t) => t.id !== id);
}

console.log("--- Citire ---");
console.log("Titluri:", listeazaTitluri(amenintari).join(", "));
console.log("Active:", numaraActive(amenintari));
console.log("Căutare 'auth':", listeazaTitluri(cautaDupaTitlu(amenintari, "auth")).join(", "));

console.log("--- Adăugare ---");
let listaActualizata = adaugaAmenintare(
  amenintari,
  "Cross-Site Scripting (XSS) in Dashboard",
  "High"
);
console.log("Lista nouă:", listaActualizata.length, "amenințări");
console.log("Originalul a rămas cu:", amenintari.length, "amenințări");

console.log("--- Modificare și ștergere ---");
listaActualizata = comutaRemediat(listaActualizata, 1);
console.log("După remedierea id 1, active rămase:", numaraActive(listaActualizata));

listaActualizata = stergeAmenintare(listaActualizata, 3);
console.log("După ștergerea id 3:", listeazaTitluri(listaActualizata).join(", "));

console.log("--- Validare ---");
adaugaAmenintare(listaActualizata, "   ");
adaugaAmenintare(listaActualizata, "Zero-Day Exploit", "Urgenta");