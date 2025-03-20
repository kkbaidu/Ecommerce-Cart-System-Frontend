import { create } from "zustand";
import { api } from "../services/api";

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  fetchCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item._id === product._id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    });
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== id),
    }));
  },

  fetchCart: async () => {
    try {
      const response = await api.get("/cart");
      set({ cart: response.data });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },
}));
