import { useState } from "react";
import { SEVERITATI } from "../constants.js";
import styles from "./ThreatForm.module.css";

const TITLU_MAX = 100;
const SURSA_MAX = 50;

// Formular controlat: state-ul React este sursa de adevăr pentru câmpuri
export default function ThreatForm({ onAdd }) {
  const [titlu, setTitlu] = useState("");
  const [severitate, setSeveritate] = useState("Medium");
  const [sursa, setSursa] = useState("");
  const [eroare, setEroare] = useState("");
  const [campGresit, setCampGresit] = useState(""); // "titlu" | "sursa" | ""
  const [trimite, setTrimite] = useState(false);

  // Întoarce { camp, mesaj }; mesajul gol înseamnă că datele sunt valide
  function valideaza() {
    const t = titlu.trim();
    if (t === "") {
      return { camp: "titlu", mesaj: "Numele amenințării este obligatoriu." };
    }
    if (t.length > TITLU_MAX) {
      return {
        camp: "titlu",
        mesaj: `Numele amenințării are maximum ${TITLU_MAX} de caractere.`,
      };
    }
    if (!SEVERITATI.some((s) => s.value === severitate)) {
      return { camp: "severitate", mesaj: "Alege un nivel de severitate din listă." };
    }
    if (sursa.trim().length > SURSA_MAX) {
      return { camp: "sursa", mesaj: `Sursa are maximum ${SURSA_MAX} de caractere.` };
    }
    return { camp: "", mesaj: "" };
  }

  async function handleSubmit(e) {
    e.preventDefault(); // oprește reîncărcarea paginii
    const { camp, mesaj } = valideaza();
    if (mesaj) {
      setEroare(mesaj);
      setCampGresit(camp);
      return; // nu se trimite nimic la server
    }
    setEroare("");
    setCampGresit("");
    setTrimite(true);
    try {
      await onAdd({
        titlu: titlu.trim(),
        remediat: false,
        severitate,
        sursa: sursa.trim(),
      });
      // golirea se face doar după ce serverul a confirmat salvarea
      setTitlu("");
      setSeveritate("Medium");
      setSursa("");
    } catch (err) {
      setEroare(`Nu s-a putut salva: ${err.message}`);
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      data-testid="form"
    >
      <label>
        <span>Nume amenințare</span>
        <input
          type="text"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          placeholder="Ex: WannaCry.v2 / CVE-2026-8901"
          maxLength={TITLU_MAX}
          aria-invalid={campGresit === "titlu"}
          data-testid="form-title"
        />
      </label>

      <label>
        <span>Nivel severitate</span>
        <select
          value={severitate}
          onChange={(e) => setSeveritate(e.target.value)}
          aria-invalid={campGresit === "severitate"}
          data-testid="form-severitate"
        >
          {SEVERITATI.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label} ({s.cvss})
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Sursa detecției (opțional)</span>
        <input
          type="text"
          value={sursa}
          onChange={(e) => setSursa(e.target.value)}
          placeholder="Ex: Detecție EDR, Network Scan"
          maxLength={SURSA_MAX}
          aria-invalid={campGresit === "sursa"}
          data-testid="form-sursa"
        />
      </label>

      {eroare && (
        <p className="error" role="alert" data-testid="form-error">
          {eroare}
        </p>
      )}

      <button
        type="submit"
        className={`btn ${styles.submit}`}
        disabled={trimite}
        data-testid="form-submit"
      >
        {trimite ? "Se salvează..." : "Înregistrează alertă"}
      </button>
    </form>
  );
}
