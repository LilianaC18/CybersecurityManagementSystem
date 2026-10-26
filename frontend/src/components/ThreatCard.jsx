const ETICHETE_SEVERITATE = {
  Critical: "Critical",
  High: "High",
  Medium: "Medium",
  Low: "Low",
};

export default function ThreatCard({ amenintare, onToggle, onDelete }) {
  const clasaSeveritate = amenintare.severitate.toLowerCase();
  const clasaCard = amenintare.remediat
    ? "item-card done"
    : `item-card card-${clasaSeveritate}`;

  return (
    <li className={clasaCard}>
      <label className="item-main">
        <input
          type="checkbox"
          checked={amenintare.remediat}
          onChange={() => onToggle(amenintare.id)}
        />
        <div className="card-info">
          <div className="card-title-row">
            <h3>{amenintare.titlu}</h3>
            <span className={`badge badge-${clasaSeveritate}`}>
              {ETICHETE_SEVERITATE[amenintare.severitate]}
            </span>
          </div>
          <span className="incident-id">
            INC-{amenintare.id.toString().padStart(4, "0")} &bull; Detecție EDR
          </span>
        </div>
      </label>

      <div className="card-actions">
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
        >
          Șterge
        </button>
      </div>
    </li>
  );
}