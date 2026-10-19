
import ThreatList from "./components/ThreatList.jsx";

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

export default function App() {
  const active = amenintari.filter((t) => !t.remediat).length;

  return (
    <>
      <header className="app-header">
        <div className="header-inner">
          <div className="brand-area">
            <span className="brand-badge">
              <span className="pulse-dot"></span> LIVE SHIELD
            </span>
            <h1>Cybersecurity Management System</h1>
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

          <ThreatList amenintari={amenintari} />
        </section>
      </main>

      <footer className="app-footer">
        <p>Proiect Tehnologii Web &bull; Inspirat de arhitectura Bitdefender</p>
      </footer>
    </>
  );
}