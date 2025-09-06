// app/page.tsx (Next.js 13+ / app router)
"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

interface Variant {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  variants: Variant[];
  inStock: boolean;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://code-assessment-backend.onrender.com/products"
        );
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading products...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          category={product.category}
          variants={product.variants || []} // fallback to empty array
          inStock={product.inStock}
        />
      ))}
    </div>
  );
}
