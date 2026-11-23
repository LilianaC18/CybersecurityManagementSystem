import { Router } from "express";
import { parseId, valideazaAmenintare } from "../validation.js";

const router = Router();

// Etapa 9: datele stau în memorie și se pierd la repornire (Etapa 10 le mută în MariaDB)
let amenintari = [
  { id: 1, titlu: "WannaCry.v2 Ransomware", remediat: false, severitate: "Critical", sursa: "Detecție EDR" },
  { id: 2, titlu: "SQL Injection in Auth Endpoint", remediat: true, severitate: "High", sursa: "Patch aplicat" },
  { id: 3, titlu: "Outdated SSL/TLS Protocol", remediat: false, severitate: "Medium", sursa: "Network Scan" },
  { id: 4, titlu: "Phishing Campaign - Departament HR", remediat: false, severitate: "High", sursa: "Email Gateway" },
  { id: 5, titlu: "Brute-force SSH pe serverul de test", remediat: true, severitate: "Low", sursa: "Firewall" },
];
let nextId = 6;

// Validează :id și găsește elementul, sau răspunde cu 400 / 404
function gasesteIndex(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Id invalid" });
    return -1;
  }
  const index = amenintari.findIndex((a) => a.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Amenințarea nu există" });
  }
  return index;
}

// GET /amenintari
router.get("/", (req, res) => {
  res.json(amenintari);
});

// GET /amenintari/:id
router.get("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  res.json(amenintari[index]);
});

// POST /amenintari
router.post("/", (req, res) => {
  const { erori, date } = valideazaAmenintare(req.body ?? {});
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  const amenintare = { id: nextId++, ...date };
  amenintari.push(amenintare);
  res.status(201).json(amenintare);
});

// PATCH /amenintari/:id (modificare parțială)
router.patch("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  const { erori, date } = valideazaAmenintare(req.body ?? {}, { partial: true });
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  amenintari[index] = { ...amenintari[index], ...date };
  res.json(amenintari[index]);
});

// DELETE /amenintari/:id
router.delete("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  amenintari.splice(index, 1);
  res.status(204).end();
});

export default router;
