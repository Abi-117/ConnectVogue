import { useEffect, useState } from "react";
import { getTrendingProducts, Product } from "@/api/products";
import { ProductCard } from "./ProductCard";

export const TrendingProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getTrendingProducts().then(setProducts);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
};
