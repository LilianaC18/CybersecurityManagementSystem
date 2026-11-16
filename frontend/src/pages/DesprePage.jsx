import { Link } from "react-router-dom";
import styles from "./DesprePage.module.css";

// Pagina de prezentare, cu textul din README
export default function DesprePage() {
  return (
    <section className={`panel ${styles.about}`}>
      <h2>Despre Cybersecurity Management System</h2>
      <p>
        O aplicație pentru administratori de sistem și analiști de securitate,
        care urmărește amenințările identificate în infrastructură: le
        prioritizează după severitate și arată, în timp real, ce este încă activ
        și ce a fost remediat.
      </p>

      <h3>Ce poți face</h3>
      <ul>
        <li>raportezi o amenințare nouă, cu severitatea și sursa detecției;</li>
        <li>marchezi o amenințare ca remediată sau o ștergi;</li>
        <li>urmărești indicatorii: incidente critice active, scorul de risc, distribuția pe severitate;</li>
        <li>
          deschizi pagina fiecărei amenințări din <Link to="/">listă</Link>, cu
          termenul țintă de remediere.
        </li>
      </ul>

      <h3>Tehnologii</h3>
      <p className={styles.stack}>
        React, Vite, React Router, CSS Modules, json-server. În etapele
        următoare: Node.js, Express, MariaDB, Docker.
      </p>
      <p className="info">
        Proiect de semestru la Tehnologii Web, construit pas cu pas pe parcursul
        semestrului.
      </p>
    </section>
  );
}
