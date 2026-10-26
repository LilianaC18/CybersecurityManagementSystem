import ThreatCard from "./ThreatCard.jsx";

export default function ThreatList({ amenintari, onToggle, onDelete }) {
  if (amenintari.length === 0) {
    return <p className="empty">Nu există nicio amenințare înregistrată.</p>;
  }

  return (
    <ul className="item-list">
      {amenintari.map((amenintare) => (
        <ThreatCard
          key={amenintare.id}
          amenintare={amenintare}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}