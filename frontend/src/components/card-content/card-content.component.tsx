import PriceRow from "../price-row/price-row.component";
import type { Product } from "../../service/product.type";

export default function CardContent({
  product,
  priceColor,
}: {
  product: Product;
  priceColor: (v: string) => string;
}) {
  return (
    <div className="py-3 px-5">
      <div className="min-[320px]:w-40 min-[375px]:w-75 w-80" style={{ marginBottom: "20px" }}>
        <p
          style={{
            fontSize: "18px",
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
          value={product.price_vea.toString()}
          color={priceColor(product.price_vea.toString())}
        />
        <PriceRow
          label="Price Mas"
          value={product.price_mas.toString()}
          color={priceColor(product.price_mas.toString())}
        />
        <PriceRow
          label="Price Carr"
          value={product.price_carrefour.toString()}
          color={priceColor(product.price_carrefour.toString())}
        />
      </div>
    </div>
  );
}
