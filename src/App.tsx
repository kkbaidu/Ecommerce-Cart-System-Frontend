import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // For icons
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import { useCartStore } from "./store/cartStore";

export default function App() {
  const { cart } = useCartStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
        <Link to="/" className="text-lg">
          🛒 E-Commerce Cart System
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <Link to="/" className="mr-4">
            Products
          </Link>
          <Link to="/cart" className="relative">
            Cart{" "}
            <span className="rounded-full bg-white px-2 py-1 text-[10px] text-black">
              {totalItems}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed left-0 top-0 h-full w-64 transform bg-gray-900 text-white ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="flex justify-between p-5">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <ul className="mt-4">
          <li className="border-b p-3">
            <Link to="/" onClick={() => setSidebarOpen(false)}>
              Products
            </Link>
          </li>
          <li className="border-b p-3">
            <Link to="/cart" onClick={() => setSidebarOpen(false)}>
              Cart{" "}
              <span className="rounded-full bg-white px-2 py-1 text-[10px] text-black">
                {totalItems}
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}
