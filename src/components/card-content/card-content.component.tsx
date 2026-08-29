import PriceRow from "../price-row/price-row.component";

export default function CardContent({
  product,
  priceColor,
}: {
  product: (typeof products)[0];
  priceColor: (v: string) => string;
}) {
  return (
    <div style={{ padding: "28px 28px 40px" }}>
      <div style={{ marginBottom: "20px" }}>
        <p
          style={{
            fontSize: "13px",
            color: "#5a6580",
            margin: "4px 0 0",
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        >
          {product.product_name}
        </p>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <PriceRow
          label="Price Vea"
          value={product.priceVea}
          color={priceColor(product.priceVea)}
        />
        <PriceRow
          label="Price Mas"
          value={product.priceMas}
          color={priceColor(product.priceMas)}
        />
        <PriceRow
          label="Price Carr"
          value={product.priceCarrefour}
          color={priceColor(product.priceCarrefour)}
        />
      </div>
    </div>
  );
}
