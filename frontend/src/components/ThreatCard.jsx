const ETICHETE_SEVERITATE = {
  Critical: "Critică",
  High: "Ridicată",
  Medium: "Medie",
  Low: "Scăzută",
};

export default function ThreatCard({ amenintare, onToggle, onDelete }) {
  const clasaSeveritate = amenintare.severitate.toLowerCase();
  const clasaCard = amenintare.remediat
    ? "item-card done"
    : `item-card card-${clasaSeveritate}`;

  return (
    <li className={clasaCard} data-testid="item" data-id={amenintare.id}>
      <label className="item-main">
        <input
          type="checkbox"
          checked={amenintare.remediat}
          onChange={() => onToggle(amenintare.id)}
          data-testid="item-toggle"
        />
        <div className="card-info">
          <div className="card-title-row">
            <h3 data-testid="item-title">{amenintare.titlu}</h3>
            <span className={`badge badge-${clasaSeveritate}`}>
              {ETICHETE_SEVERITATE[amenintare.severitate]}
            </span>
          </div>
          <span className="incident-id">
            INC-{String(amenintare.id).padStart(4, "0")}
            {amenintare.sursa && <> &bull; {amenintare.sursa}</>}
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
          data-testid="item-delete"
        >
          Șterge
        </button>
      </div>
    </li>
  );
}
