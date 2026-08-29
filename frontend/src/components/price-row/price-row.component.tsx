export default function PriceRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: "15px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "#677da7",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "25px",
          fontWeight: 600,
          color,
          letterSpacing: "0.01em",
        }}
      >
        ${value}
      </div>
    </div>
  );
}
