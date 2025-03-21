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
      <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
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
            <span className="bg-white rounded-full text-black text-[10px] px-2 py-1">
              {totalItems}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="p-5 flex justify-between">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <ul className="mt-4">
          <li className="p-3 border-b">
            <Link to="/" onClick={() => setSidebarOpen(false)}>
              Products
            </Link>
          </li>
          <li className="p-3 border-b">
            <Link to="/cart" onClick={() => setSidebarOpen(false)}>
              Cart{" "}
              <span className="bg-white rounded-full text-black text-[10px] px-2 py-1">
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
