import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <Link to="/" className="text-lg">
          🛒 E-Commerce
        </Link>
        <div>
          <Link to="/" className="mr-4">
            Products
          </Link>
          <Link to="/cart">Cart</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}
