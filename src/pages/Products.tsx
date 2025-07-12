import { useProducts } from "../hooks/useProducts";
import { CartContext } from '../providers/cartContext';
import { useContext, useState } from 'react';

const Products = () => {

  // Track quantity per product ID
  const [quantities, setQuantities] = useState<{ [productId: number]: number }>({});
  const { products, loading, error } = useProducts();
  const cart = useContext(CartContext);
  if (!cart) return null; // or show a fallback

  const { addToCart, cartItems } = cart;

  const handleQtyChange = (productId: number, qty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: qty,
    }));
  };

  const getQty = (productId: number) => {
    // Check if item is already in the cart
    const itemInCart = cartItems.find(item => item.id === productId);
    if (itemInCart) {
        return itemInCart.quantity;
    }

    // Otherwise, fallback to local state or default
    return quantities[productId] || 1;
  };
 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center mt-10">{error}</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(item => (
          <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500 mb-1">{item.category}</p>
              <p className="text-sm text-gray-700 mb-2">{item.description}</p>
             <div className="flex items-center justify-between mb-3">
                <p className="text-md font-bold text-blue-600">₹{item.price}</p>
                <div className="flex items-center gap-2">
                    <label htmlFor={`qty-${item.id}`} className="text-sm text-gray-600">Qty:</label>
                   <select
                    id={`qty-${item.id}`}
                    name="quantity"
                    className="border rounded px-2 py-1 text-sm"
                    value={getQty(item.id)}
                    onChange={(e) => handleQtyChange(item.id, Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map(qty => (
                      <option key={qty} value={qty}>{qty}</option>
                    ))}
                  </select>
                </div>
                </div>
              <button onClick={() => addToCart(item, getQty(item.id))}
               className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
