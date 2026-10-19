
const ETICHETE_SEVERITATE = {
  Critical: "Critical",
  High: "High",
  Medium: "Medium",
  Low: "Low",
};

export default function ThreatCard({ amenintare }) {
  const clasaSeveritate = amenintare.severitate.toLowerCase();
  const clasaCard = amenintare.remediat
    ? "item-card done"
    : `item-card card-${clasaSeveritate}`;

  return (
    <li className={clasaCard}>
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

      {amenintare.remediat ? (
        <span className="status status-resolved">✓ Remediat</span>
      ) : (
        <span className="status status-active">
          <span className="dot-indicator"></span>Activ
        </span>
      )}
    </li>
  );
}