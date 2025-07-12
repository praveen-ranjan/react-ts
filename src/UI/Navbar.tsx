import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../providers/cartContext';

export default function Navbar() {
  const cart = useContext(CartContext);
  if (!cart) return null;

  const { cartItems } = cart;

  // Calculate total quantity
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-semibold">Student Portal</div>
          <div className="space-x-4">
            <Link to="/students" className="hover:bg-blue-500 px-3 py-2 rounded">Students List</Link>
            <Link to="/students/add" className="hover:bg-blue-500 px-3 py-2 rounded">Add Student</Link>
            <Link to="/about" className="hover:bg-blue-500 px-3 py-2 rounded">About Us</Link>
            <Link to="/products" className="hover:bg-blue-500 px-3 py-2 rounded">Products</Link>
            {/* 🛒 Cart Link with badge */}
            <div className="relative inline-block">
              <Link to="/cart" className="hover:bg-blue-500 px-3 py-2 rounded">Cart</Link>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
