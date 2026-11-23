// Valorile fixe pentru severitate și etichetele lor, într-un singur loc.
// value: valoarea salvată pe server (aceeași listă ca în backend/src/validation.js);
// clasa: numele folosit în CSS;
// pondere: greutatea în scorul de risc; termen: termenul țintă de remediere.
export const SEVERITATI = [
  { value: "Critical", label: "Critică", cvss: "CVSS 9.0+", clasa: "critical", pondere: 10, termen: "24 de ore" },
  { value: "High", label: "Ridicată", cvss: "CVSS 7.0-8.9", clasa: "high", pondere: 6, termen: "7 zile" },
  { value: "Medium", label: "Medie", cvss: "CVSS 4.0-6.9", clasa: "medium", pondere: 3, termen: "30 de zile" },
  { value: "Low", label: "Scăzută", cvss: "CVSS 0.1-3.9", clasa: "low", pondere: 1, termen: "90 de zile" },
];

// { Critical: "Critică", High: "Ridicată", ... }, pentru afișarea etichetelor
export const ETICHETE_SEVERITATE = Object.fromEntries(
  SEVERITATI.map((s) => [s.value, s.label])
);

export function gasesteSeveritate(value) {
  return SEVERITATI.find((s) => s.value === value);
}

// Codul afișat al incidentului: 3 -> "INC-0003"
export function codIncident(id) {
  return `INC-${String(id).padStart(4, "0")}`;
}
