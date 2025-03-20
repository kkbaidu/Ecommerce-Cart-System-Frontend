import { useCartStore } from "../store/cartStore";

export default function Cart() {
  const { cart, removeFromCart } = useCartStore();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-3">
          {cart.map((item) => (
            <li key={item._id} className="border p-3 rounded-md shadow">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
