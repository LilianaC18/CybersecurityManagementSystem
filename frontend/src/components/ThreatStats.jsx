import { SEVERITATI } from "../constants.js";
import styles from "./ThreatStats.module.css";

// Panou de indicatori: toate valorile sunt calculate din listă, fără state propriu.
function pondere(severitate) {
  return SEVERITATI.find((s) => s.value === severitate)?.pondere ?? 0;
}

// Scorul de risc (0–100): cât din „greutatea” totală a amenințărilor e încă activă
function scorDeRisc(amenintari) {
  const total = amenintari.reduce((sum, t) => sum + pondere(t.severitate), 0);
  if (total === 0) return 0;
  const activ = amenintari
    .filter((t) => !t.remediat)
    .reduce((sum, t) => sum + pondere(t.severitate), 0);
  return Math.round((activ / total) * 100);
}

function nivelRisc(scor) {
  if (scor >= 60) return { text: "Risc ridicat", clasa: "critical" };
  if (scor >= 30) return { text: "Risc moderat", clasa: "medium" };
  return { text: "Risc scăzut", clasa: "low" };
}

function Icon({ children }) {
  return (
    <svg
      className={styles.kpiIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function ThreatStats({ amenintari }) {
  const total = amenintari.length;
  const active = amenintari.filter((t) => !t.remediat).length;
  const remediate = total - active;
  const criticeActive = amenintari.filter(
    (t) => t.severitate === "Critical" && !t.remediat
  ).length;
  const procentRemediat = total === 0 ? 0 : Math.round((remediate / total) * 100);
  const scor = scorDeRisc(amenintari);
  const nivel = nivelRisc(scor);

  const distributie = SEVERITATI.map((s) => ({
    ...s,
    numar: amenintari.filter((t) => t.severitate === s.value).length,
  }));

  return (
    <section className={styles.strip} aria-label="Indicatori de securitate">
      <div className={styles.kpiGrid}>
        <article className={`${styles.kpiCard} ${styles.brand}`}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Total incidente</span>
            <Icon>
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="4" />
              <path d="M12 3v4M21 12h-4" />
            </Icon>
          </div>
          <strong className={styles.kpiValue}>{total}</strong>
          <span className={styles.kpiSub}>{active} încă active</span>
        </article>

        <article className={`${styles.kpiCard} ${styles.critical}`}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Critice active</span>
            <Icon>
              <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
              <path d="M12 9v4M12 17h.01" />
            </Icon>
          </div>
          <strong className={styles.kpiValue}>{criticeActive}</strong>
          <span className={styles.kpiSub}>
            {criticeActive > 0 ? "necesită acțiune imediată" : "nicio amenințare critică"}
          </span>
        </article>

        <article className={`${styles.kpiCard} ${styles.low}`}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Remediate</span>
            <Icon>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </Icon>
          </div>
          <strong className={styles.kpiValue}>{remediate}</strong>
          <span className={styles.kpiSub}>{procentRemediat}% din total</span>
        </article>

        <article className={`${styles.kpiCard} ${styles[nivel.clasa]}`}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Scor de risc</span>
            <Icon>
              <path d="M3 12a9 9 0 0 1 18 0" />
              <path d="m12 12 4-4" />
              <circle cx="12" cy="12" r="1" />
            </Icon>
          </div>
          <strong className={styles.kpiValue}>
            {scor}
            <small>/100</small>
          </strong>
          <span className={styles.kpiSub}>{nivel.text}</span>
        </article>
      </div>

      <div className={styles.severityCard}>
        <div className={styles.severityHead}>
          <span className={styles.kpiLabel}>Distribuție pe severitate</span>
          <span className={styles.kpiSub}>{total} amenințări</span>
        </div>
        <div
          className={styles.severityBar}
          role="img"
          aria-label={distributie.map((s) => `${s.label}: ${s.numar}`).join(", ")}
        >
          {distributie
            .filter((s) => s.numar > 0)
            .map((s) => (
              <span
                key={s.value}
                className={`${styles.segment} ${styles[`seg-${s.clasa}`]}`}
                style={{ flexGrow: s.numar }}
              />
            ))}
        </div>
        <ul className={styles.legend}>
          {distributie.map((s) => (
            <li key={s.value}>
              <span className={`${styles.legendDot} ${styles[`seg-${s.clasa}`]}`} />
              {s.label} <strong>{s.numar}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
