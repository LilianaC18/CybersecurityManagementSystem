//Array de obiecte (cele 3 elemente din README.md)
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

const SEVERITATI = ["Critical", "High", "Medium", "Low"];

//Functie care primeste lista si returneaza un array cu titlurile amenintarilor
function listeazaTitluri(lista) {
  return lista.map((t) => t.titlu);
}

//Functie care primeste lista si returneaza elementele care nu au fost remediate (remediat = false)
function numaraActive(lista) {
  return lista.filter((t) => !t.remediat).length;
}

//Functie care primeste lista si un text, returnand elementele care contin textul in titlu (cautare case-insensitive)
function cautaDupaTitlu(lista, text) {
  const textCautat = text.toLowerCase();
  return lista.filter((t) => t.titlu.toLowerCase().includes(textCautat));
}

//calculul ID ului = Functie care primeste lista si returneaza urmatorul id disponibil (maxim + 1)
function nextId(lista) {
  return lista.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}
//pentru fiecare element t din lista
//max retine cel mai mare id gasit pana acum, initializat cu 0, iar la final se adauga 1 pentru a obtine urmatorul id disponibil.
//Math.max(max, t.id): compară maximul curent cu t.id al elementului curent și îl păstrează pe cel mai mare.
//o folosim deoarece, cu list.length +1 , dupa stergere unui element am putea avea un id duplicat


function adaugaAmenintare(lista, titlu, severitate = "Medium") {
  //VALIDEAZA informatiile primite, CONSTRUIESTE un obiect nou si RETURNEAZA o copie actualizata a listei
  const titluCurat = titlu ? titlu.trim() : ""; //stergem spatiile goale de la inceput si sfarsit

  if (!titluCurat) {
    console.warn("Validare eșuată: Titlul nu poate fi gol.");
    return lista;
  }

  if (!SEVERITATI.includes(severitate)) {
    console.warn(`Validare eșuată: Severitate invalidă "${severitate}". Valori permise: ${SEVERITATI.join(", ")}`);
                                                                      //const SEVERITATI = ["Low", "Medium", "High", "Critical"];
                                                                      //=> Valori permise: Low, Medium, High, Critical
    return lista;
  }

  const nouaAmenintare = {
    id: nextId(lista),
    titlu: titluCurat,
    remediat: false,
    severitate: severitate,
  };

  return [...lista, nouaAmenintare]; //returneaza o copie a listei cu noul obiect adaugat la final (array spread operator)
  //nu modifica lista originala, ci creeaza o copie noua cu elementul adaugat (lista.push())
}

function comutaRemediat(lista, id) {   //{ ...t, camp    : valoare }
  return lista.map((t) => (t.id === id ? { ...t, remediat: !t.remediat } : t));
  //.map parcurge fiecare element din lista 
  //conditia t.id === id ? ... : t verifica daca pentru fieare el id ul este cel cautat
  //dacă NU (: t): fara modificari
  //dacă DA (? {...t, remediat: !t.remediat}) se creeaza o copie a obiectului t cu proprietatea remediat inversata 
}


//--!!   [...lista, nou] copie a array ului și { ...t,camp: valoare } copie a obiectului t 


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