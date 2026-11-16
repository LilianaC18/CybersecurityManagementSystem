import { useEffect, useState } from "react";
import ThreatList from "./components/ThreatList.jsx";
import ThreatStats from "./components/ThreatStats.jsx";
import ThreatForm from "./components/ThreatForm.jsx";
import {
  createAmenintare,
  deleteAmenintare,
  fetchAmenintari,
  updateAmenintare,
} from "./api.js";
import shieldImg from "./assets/shield.svg";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  // Lista pornește goală, datele vin de la API (db.json)
  const [amenintari, setAmenintari] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tema, setTema] = useState(temaInitiala);

  // Rulează o singură dată, după prima randare
  useEffect(() => {
    let ignore = false; // nu se setează state dacă componenta a dispărut între timp

    async function load() {
      try {
        const data = await fetchAmenintari();
        if (!ignore) setAmenintari(data);
      } catch (err) {
        if (!ignore) {
          setError(`Nu am putut încărca datele: ${err.message}. Rulează npm run api?`);
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

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  const active = amenintari.filter((t) => !t.remediat).length;

  return (
    <>
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={handleTema}
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>

        <div className="header-inner">
          <div className="brand-area">
            <span className="brand-badge">
              <span className="pulse-dot"></span> LIVE SHIELD
            </span>
            <div className="title-row">
              <img src={shieldImg} alt="" className="hero-shield" />
              <h1>Cybersecurity Management System</h1>
            </div>
            <p className="header-desc">
              Monitorizarea, prioritizarea și remedierea amenințărilor din infrastructură.
            </p>
          </div>
          <div className="stats-counter">
            <span className="counter-label">Status Incident</span>
            <span className="app-count">
              <strong>{amenintari.length}</strong> Total &bull;{" "}
              <span className="active-pill">{active} Active</span>
            </span>
          </div>
        </div>
      </header>

      {!loading && <ThreatStats amenintari={amenintari} />}

      <main className="container">
        <section className="panel">
          <div className="panel-header">
            <div className="panel-icon">+</div>
            <h2>Raportează amenințare</h2>
          </div>
          <ThreatForm onAdd={handleAdd} />
        </section>

        <section className="panel">
          <div className="panel-header">
            <div className="panel-icon shield-icon">⛨</div>
            <h2>Amenințări active &amp; tratate</h2>
          </div>

          {loading && (
            <>
              <p className="info" data-testid="loading">
                Se încarcă amenințările...
              </p>
              <ul className="item-list skeleton-list" aria-hidden="true">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="skeleton-card">
                    <span className="skeleton-line skeleton-title" />
                    <span className="skeleton-line skeleton-meta" />
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
      </main>

      <footer className="app-footer">
        <p>Proiect Tehnologii Web &bull; Inspirat de arhitectura Bitdefender</p>
      </footer>
    </>
  );
}
