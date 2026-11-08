import { useEffect, useState } from "react";
import ThreatList from "./components/ThreatList.jsx";
import { fetchAmenintari } from "./api.js";
import shieldImg from "./assets/shield.svg";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  // Etapa 6: lista pornește goală, datele vin de la API (db.json)
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
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // În Etapa 6 modificările rămân locale: se pierd la refresh (rezolvat în Etapa 7)
  function handleToggle(id) {
    setAmenintari((prev) =>
      prev.map((t) => (t.id === id ? { ...t, remediat: !t.remediat } : t))
    );
  }

  function handleDelete(id) {
    setAmenintari((prev) => prev.filter((t) => t.id !== id));
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

      <main className="container">
        <section className="panel">
          <div className="panel-header">
            <div className="panel-icon shield-icon">⛨</div>
            <h2>Amenințări active &amp; tratate</h2>
          </div>

          {loading && <p className="info">Se încarcă amenințările...</p>}
          {error && (
            <p className="error">
              Nu am putut încărca datele: {error}. Rulează <code>npm run api</code>?
            </p>
          )}
          {!loading && !error && (
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
