import axios from "axios";

const API_URL = "ecommerce-cart-system-production.up.railway.app/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
