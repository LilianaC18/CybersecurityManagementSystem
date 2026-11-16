import { Link } from "react-router-dom";
import { ETICHETE_SEVERITATE, codIncident } from "../constants.js";
import styles from "./ThreatCard.module.css";

export default function ThreatCard({ amenintare, onToggle, onDelete }) {
  const clasaSeveritate = amenintare.severitate.toLowerCase();
  // o amenințare remediată nu mai are banda de severitate
  const clasaCard = amenintare.remediat
    ? `${styles.card} ${styles.done}`
    : `${styles.card} ${styles[clasaSeveritate]}`;

  return (
    <li className={clasaCard} data-testid="item" data-id={amenintare.id}>
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={amenintare.remediat}
          onChange={() => onToggle(amenintare.id)}
          aria-label={`Marchează ${amenintare.titlu} ca remediată`}
          data-testid="item-toggle"
        />
        <div className={styles.info}>
          <div className={styles.titleRow}>
            {/* titlul duce la pagina de detaliu, fără reîncărcare */}
            <Link
              to={`/amenintari/${amenintare.id}`}
              className={styles.title}
              data-testid="item-link"
            >
              {amenintare.titlu}
            </Link>
            <span className={`badge badge-${clasaSeveritate}`}>
              {ETICHETE_SEVERITATE[amenintare.severitate]}
            </span>
          </div>
          <span className={styles.incidentId}>
            {codIncident(amenintare.id)}
            {amenintare.sursa && <> &bull; {amenintare.sursa}</>}
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        {amenintare.remediat ? (
          <span className="status status-resolved">✓ Remediat</span>
        ) : (
          <span className="status status-active">
            <span className="dot-indicator"></span>Activ
          </span>
        )}

        <button
          className="btn-danger"
          onClick={() => onDelete(amenintare.id)}
          aria-label={`Șterge ${amenintare.titlu}`}
          data-testid="item-delete"
        >
          Șterge
        </button>
      </div>
    </li>
  );
}
