import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useCartStore } from "../store/cartStore";

interface Product {
  _id: string;
  name: string;
  price: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-3 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500">${product.price}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
