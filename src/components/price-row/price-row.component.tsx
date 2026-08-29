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
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "#3d4a63",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "17px",
          fontWeight: 600,
          color,
          letterSpacing: "0.01em",
        }}
      >
        {value}
      </div>
    </div>
  );
}
