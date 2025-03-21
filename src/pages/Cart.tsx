import { useEffect } from "react";
import { useCartStore } from "../store/cartStore";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    saveCart,
    fetchCart,
    isCartSaved,
  } = useCartStore();

  useEffect(() => {
    if (cart.length === 0) {
      fetchCart(); // Fetch only when the cart is empty
    }
  }, [fetchCart]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-3">
          {cart.map((item) => (
            <li
              key={item.name}
              className="border p-3 rounded-md shadow flex items-center gap-4"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
                <div className="mt-2">
                  <button
                    className="bg-green-500 text-white px-2 rounded mx-1"
                    onClick={() => updateQuantity(item.name, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 rounded mx-1"
                    onClick={() =>
                      updateQuantity(item.name, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </button>
                </div>
              </div>

              {/* Remove Button */}
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => removeFromCart(item.name)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Save Cart Button */}
      {cart.length > 0 && (
        <div className="mt-4 flex items-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={saveCart}
          >
            Save Cart
          </button>

          <span className="ml-3 text-sm">
            {isCartSaved ? (
              <span className="text-green-500">Cart is saved</span>
            ) : (
              <span className="text-red-500">Cart changes are not saved!</span>
            )}
          </span>
        </div>
      )}
    </div>
  );
}
