import { useEffect, useState } from "react";
import ThreatList from "../components/ThreatList.jsx";
import ThreatStats from "../components/ThreatStats.jsx";
import ThreatForm from "../components/ThreatForm.jsx";
import {
  createAmenintare,
  deleteAmenintare,
  fetchAmenintari,
  updateAmenintare,
} from "../api.js";
import styles from "./AmenintariPage.module.css";

// Pagina principală: indicatorii, formularul și lista (fostul App.jsx din Etapa 7)
export default function AmenintariPage() {
  // Lista pornește goală, datele vin de la API-ul Express (backend/)
  const [amenintari, setAmenintari] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Rulează o singură dată, după prima randare
  useEffect(() => {
    let ignore = false; // nu se setează state dacă pagina a dispărut între timp

    async function load() {
      try {
        const data = await fetchAmenintari();
        if (!ignore) setAmenintari(data);
      } catch (err) {
        if (!ignore) {
          setError(`Nu am putut încărca datele: ${err.message}. Rulează npm run dev în backend/?`);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Întâi serverul, apoi state-ul: pe ecran ajunge doar ce s-a salvat.
  // Fără try: eroarea ajunge înapoi în formular, care o afișează.
  async function handleAdd(amenintare) {
    const creata = await createAmenintare(amenintare); // serverul întoarce elementul cu id
    setAmenintari((prev) => [...prev, creata]);
    setError(null);
  }

  async function handleToggle(id) {
    const amenintare = amenintari.find((t) => t.id === id);
    try {
      const actualizata = await updateAmenintare(id, {
        remediat: !amenintare.remediat,
      });
      setAmenintari((prev) => prev.map((t) => (t.id === id ? actualizata : t)));
      setError(null);
    } catch (err) {
      setError(`Nu am putut salva modificarea: ${err.message}`);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteAmenintare(id);
      setAmenintari((prev) => prev.filter((t) => t.id !== id));
      setError(null);
    } catch (err) {
      setError(`Nu am putut șterge amenințarea: ${err.message}`);
    }
  }

  const active = amenintari.filter((t) => !t.remediat).length;

  return (
    <div className={styles.page}>
      {!loading && <ThreatStats amenintari={amenintari} />}

      <div className={styles.grid}>
        <section className="panel">
          <div className="panel-header">
            <div className="panel-icon">+</div>
            <h2>Raportează amenințare</h2>
          </div>
          <ThreatForm onAdd={handleAdd} />
        </section>

        <section className="panel">
          <div className="panel-header">
            <div className="panel-icon">⛨</div>
            <h2>Amenințări active &amp; tratate</h2>
          </div>

          {/* contorul a coborât din antet, care este acum comun tuturor paginilor */}
          {!loading && (
            <p className={styles.summary}>
              <strong>{amenintari.length}</strong> total &bull;{" "}
              <span className={styles.activeCount}>{active} active</span>
            </p>
          )}

          {loading && (
            <>
              <p className="info" data-testid="loading">
                Se încarcă amenințările...
              </p>
              <ul className={styles.skeletonList} aria-hidden="true">
                {[1, 2, 3].map((n) => (
                  <li key={n} className={styles.skeletonCard}>
                    <span className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
                    <span className={`${styles.skeletonLine} ${styles.skeletonMeta}`} />
                  </li>
                ))}
              </ul>
            </>
          )}
          {error && (
            <p className="error" role="alert" data-testid="error">
              {error}
            </p>
          )}
          {/* !loading, fără !error: dacă o bifare eșuează, lista rămâne pe ecran */}
          {!loading && (
            <ThreatList
              amenintari={amenintari}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </div>
  );
}
