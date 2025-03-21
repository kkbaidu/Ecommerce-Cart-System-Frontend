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
      <h1 className="text-2xl font-bold mb-6 text-center">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? // Show Skeletons when loading
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300 rounded-md"></div>
                <div className="h-6 bg-gray-300 rounded mt-3 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded mt-2 w-1/2"></div>
                <div className="h-10 bg-gray-300 rounded mt-3 w-full"></div>
              </div>
            ))
          : // Show Products when loaded
            products.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
                <p className="text-gray-500">${product.price}</p>
                <button
                  className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition"
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
