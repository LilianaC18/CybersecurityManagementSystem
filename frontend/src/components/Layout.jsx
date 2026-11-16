import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import shieldImg from "../assets/shield.svg";
import styles from "./Layout.module.css";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// NavLink marchează singur pagina curentă
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

// Antetul, navigația și subsolul, scrise o singură dată pentru toate paginile
export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <button
          className={styles.themeToggle}
          onClick={handleTema}
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>

        <div className={styles.inner}>
          <span className={styles.brandBadge}>
            <span className={styles.pulseDot}></span> LIVE SHIELD
          </span>
          <div className={styles.titleRow}>
            <img src={shieldImg} alt="" className={styles.heroShield} />
            <h1 className={styles.title}>Cybersecurity Management System</h1>
          </div>
          <p className={styles.desc}>
            Monitorizarea, prioritizarea și remedierea amenințărilor din infrastructură.
          </p>

          <nav className={styles.nav} data-testid="nav">
            <NavLink to="/" end className={navClass}>
              Amenințări
            </NavLink>
            <NavLink to="/despre" className={navClass}>
              Despre
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>Proiect Tehnologii Web &bull; Inspirat de arhitectura Bitdefender</p>
      </footer>
    </div>
  );
}
