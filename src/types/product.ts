// types/product.ts
export type Variant = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  inStock: boolean;
  category: string;
  variants: Variant[];
};
