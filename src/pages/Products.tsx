import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useCartStore } from "../store/cartStore";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-5">
      <h1 className="mb-6 text-center text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? // Show Skeletons when loading
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-lg border p-4 shadow-md"
              >
                <div className="h-48 w-full rounded-md bg-gray-300"></div>
                <div className="mt-3 h-6 w-3/4 rounded bg-gray-300"></div>
                <div className="mt-2 h-4 w-1/2 rounded bg-gray-300"></div>
                <div className="mt-3 h-10 w-full rounded bg-gray-300"></div>
              </div>
            ))
          : // Show Products when loaded
            products.map((product) => (
              <div
                key={product._id}
                className="rounded-lg border p-4 shadow-md transition-shadow hover:shadow-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full rounded-md object-cover"
                />
                <h2 className="mt-3 text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500">${product.price}</p>
                <button
                  className="mt-3 w-full rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                >
                  Add to Cart
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}
