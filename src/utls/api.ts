// utils/api.ts
import { Product } from "../types/product";

export async function fetchProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${category}` : "";
  const res = await fetch(`http://localhost:5001/products${query}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
