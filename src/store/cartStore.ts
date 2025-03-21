import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { api } from "../services/api";

// Interfaces
interface CartItem {
  name: string;
  quantity: number;
  image: string;
}

interface CartState {
  userId: string;
  cart: CartItem[];
  isCartSaved: boolean;
  addToCart: (item: CartItem) => void;
  updateQuantity: (name: string, quantity: number) => void;
  removeFromCart: (name: string) => void;
  saveCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
}

// Helper function: Retrieve or generate userId
const getUserId = (): string => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("userId", userId);
  }
  return userId;
};

// Helper function: Load cart from session storage
const loadCartFromSession = (): CartItem[] => {
  const storedCart = sessionStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

// Zustand store
export const useCartStore = create<CartState>((set, get) => ({
  userId: getUserId(),
  cart: loadCartFromSession(), // Load cart from session
  isCartSaved: true,

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.name === item.name);
      let updatedCart;

      if (existingItem) {
        updatedCart = state.cart.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedCart = [...state.cart, { ...item, quantity: 1 }];
      }

      // Save to session
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      sessionStorage.setItem("isCartSaved", JSON.stringify(false));
      return { cart: updatedCart, isCartSaved: false };
    }),

  updateQuantity: (name, quantity) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.name === name ? { ...item, quantity } : item
      );

      // Save to session
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      sessionStorage.setItem("isCartSaved", JSON.stringify(false));
      return { cart: updatedCart, isCartSaved: false };
    }),

  removeFromCart: (name) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.name !== name);

      // Save to session
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      sessionStorage.setItem("isCartSaved", JSON.stringify(false));
      return { cart: updatedCart, isCartSaved: false };
    }),

  saveCart: async () => {
    const { cart, userId } = get();

    try {
      // Fetch user's cart from the API
      const res = await api.get("/cart");
      const allCarts = res.data;

      // Find the user's cart
      let userCart = allCarts.find((cart: any) => cart.userId === userId);
      let cartId = userCart?._id;

      if (!userCart) {
        console.log("Cart not found, creating a new cart...");

        const newCart = {
          userId,
          items: [],
          total: 0,
        };

        const createdCartRes = await api.post("/cart", newCart);
        cartId = createdCartRes.data._id;
      }

      // Prepare the updated cart data
      const formattedCart = {
        userId,
        items: cart.map((item) => ({
          [item.name]: item.quantity,
          image: item.image,
        })),
        total: cart.reduce((sum, item) => sum + item.quantity, 0),
      };

      // Send PATCH request to update the cart
      await api.patch(`/cart/${cartId}`, formattedCart);

      // Clear session storage after saving to the database
      sessionStorage.removeItem("cart");
      sessionStorage.setItem("isCartSaved", JSON.stringify(true));

      set({ isCartSaved: true });
      alert("Cart updated successfully!");
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  },

  fetchCart: async () => {
    const { userId } = get();

    try {
      const res = await api.get("/cart");
      const allCarts = res.data;
      const userCart = allCarts.find((cart: any) => cart.userId === userId);

      if (userCart) {
        const formattedCart = userCart.items.map((item: any) => {
          const name = Object.keys(item)[0];
          return { name, quantity: item[name], image: item.image };
        });

        set({ cart: formattedCart });

        // Save to session
        sessionStorage.setItem("cart", JSON.stringify(formattedCart));
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },
}));
