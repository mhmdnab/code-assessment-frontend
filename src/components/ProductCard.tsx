// components/ProductCard.tsx
import Image from "next/image";

interface Variant {
  id: number;
  name: string;
}

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  category: string;
  variants?: Variant[]; // ← make optional
  inStock: boolean;
}

export default function ProductCard({
  image,
  name,
  price,
  category,
  variants = [], // ← default empty array
  inStock,
}: ProductCardProps) {
  return (
    <div className="max-w-xs bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="rounded-lg object-cover"
      />

      <h2 className="mt-4 text-lg font-semibold text-gray-800">{name}</h2>
      <p className="text-gray-500 text-sm mb-1">{category}</p>
      <p className="text-gray-600 text-base">${price.toFixed(2)}</p>

      {variants.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 justify-center">
          {variants.map((v) => (
            <span
              key={v.id}
              className="px-2 py-1 border rounded-lg text-sm text-gray-700"
            >
              {v.name}
            </span>
          ))}
        </div>
      )}

      {inStock ? (
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
          Add to Cart
        </button>
      ) : (
        <button
          className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
          disabled
        >
          Out of Stock
        </button>
      )}
    </div>
  );
}
