import { Product } from "../types/product";

export async function fetchProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${category}` : "";
  const res = await fetch(
    `https://code-assessment-backend.onrender.com/products${query}`
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch products: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();
  // Ensure the data is always an array before returning.
  if (!Array.isArray(data)) {
    console.error("API returned a non-array response:", data);
    return []; // Return an empty array as a safe fallback.
  }

  return data;
}
