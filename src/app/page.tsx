"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "../utils/api";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await fetchProducts();
        // We now explicitly check if the data is an array before setting the state.
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          // If the data is not an array, it's an unexpected format from the API.
          console.error("API returned data in an unexpected format:", data);
          setError("Failed to load products due to a data format error.");
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(
          "Failed to fetch products. Please check the network connection and server."
        );
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading products...</p>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>Error: {error}</p>
        <p>Please check the console for more details.</p>
      </div>
    );
  }

  // If there are no products, display a message.
  if (products.length === 0) {
    return <p className="p-6 text-center text-gray-500">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          category={product.category}
          variants={product.variants || []}
          inStock={product.inStock}
        />
      ))}
    </div>
  );
}
