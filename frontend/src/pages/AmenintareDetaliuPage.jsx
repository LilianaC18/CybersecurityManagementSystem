import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAmenintare } from "../api.js";
import { codIncident, gasesteSeveritate } from "../constants.js";
import styles from "./AmenintareDetaliuPage.module.css";

// Pagina unei singure amenințări: /amenintari/:id
export default function AmenintareDetaliuPage() {
  const { id } = useParams(); // text din URL, de exemplu "3"
  const [amenintare, setAmenintare] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Se reîncarcă dacă se schimbă id-ul din adresă
  useEffect(() => {
    let ignore = false;

    fetchAmenintare(id)
      .then((data) => {
        if (!ignore) {
          setAmenintare(data);
          setError(null); // o eroare de la un id anterior nu mai este valabilă
        }
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se încarcă amenințarea...
      </p>
    );
  }

  if (error) {
    return (
      <section className={`panel ${styles.box}`}>
        <p className="error" role="alert" data-testid="error">
          {error.status === 404
            ? `Nu există nicio amenințare cu id-ul ${id}.`
            : `Amenințarea nu a putut fi încărcată: ${error.message}`}
        </p>
        <Link to="/" className={styles.back}>
          &larr; Înapoi la listă
        </Link>
      </section>
    );
  }

  const severitate = gasesteSeveritate(amenintare.severitate);
  const clasa = amenintare.severitate.toLowerCase();

  return (
    <section
      className={`panel ${styles.box} ${styles.detail} ${styles[clasa] ?? ""}`}
      data-testid="detail"
    >
      <Link to="/" className={styles.back}>
        &larr; Înapoi la listă
      </Link>

      <span className={styles.code}>{codIncident(amenintare.id)}</span>
      <h2
        className={amenintare.remediat ? `${styles.title} ${styles.done}` : styles.title}
        data-testid="detail-title"
      >
        {amenintare.titlu}
      </h2>

      <dl className={styles.fields}>
        <dt>Severitate</dt>
        <dd>
          <span className={`badge badge-${clasa}`}>
            {severitate?.label ?? amenintare.severitate}
          </span>
          {severitate && <span className={styles.muted}>{severitate.cvss}</span>}
        </dd>

        <dt>Status</dt>
        <dd>
          {amenintare.remediat ? (
            <span className="status status-resolved">✓ Remediat</span>
          ) : (
            <span className="status status-active">
              <span className="dot-indicator"></span>Activ
            </span>
          )}
        </dd>

        <dt>Sursa detecției</dt>
        <dd>{amenintare.sursa || <span className={styles.muted}>nespecificată</span>}</dd>

        <dt>Termen țintă de remediere</dt>
        <dd>
          {severitate ? severitate.termen : "-"}
          <span className={styles.muted}>
            {amenintare.remediat ? "respectat, amenințarea este remediată" : "de la detecție"}
          </span>
        </dd>

        <dt>ID în baza de date</dt>
        <dd className={styles.mono}>{amenintare.id}</dd>
      </dl>
    </section>
  );
}
