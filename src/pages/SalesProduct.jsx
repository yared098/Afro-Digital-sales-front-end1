import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const SalesProduct = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 200 },
    { id: 3, name: 'Product C', price: 300 },
    { id: 4, name: 'Product D', price: 400 },
    { id: 5, name: 'Product E', price: 500 },
    { id: 6, name: 'Product F', price: 600 },
    { id: 7, name: 'Product G', price: 700 },
    { id: 8, name: 'Product H', price: 800 },
    { id: 9, name: 'Product I', price: 900 },
    { id: 10, name: 'Product J', price: 1000 },
  ]);
  const [cart, setCart] = useState([]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDragStart = (event, product) => {
    event.dataTransfer.setData('product', JSON.stringify(product));
  };

  const handleDrop = (event) => {
    const product = JSON.parse(event.dataTransfer.getData('product'));
    const quantity = prompt(`Enter quantity for ${product.name}:`, 1);

    if (quantity && !isNaN(quantity) && quantity > 0) {
      setCart((prevCart) => [
        ...prevCart,
        { ...product, quantity: parseInt(quantity) },
      ]);
    } else {
      alert('Please enter a valid quantity');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex mt-6 h-full">
      {/* Products Section */}
      <div
        className="col-span-2 bg-white p-6 shadow-lg rounded-lg flex-1 overflow-auto resize-x"
        style={{ minWidth: '250px', maxWidth: '500px' }}
      >
        <h2 className="text-lg font-bold mb-4">Products</h2>

        {/* Search Form */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Scrollable Product List */}
        <div className="grid grid-cols-3 gap-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg bg-white shadow-md flex flex-col items-center justify-center cursor-pointer hover:shadow-lg"
              draggable
              onDragStart={(event) => handleDragStart(event, product)}
            >
              <h3 className="text-md font-bold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-4">${product.price}</p>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                Drag Me
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div
        className="col-span-1 bg-white p-6 shadow-lg rounded-lg border-2 border-dashed border-gray-400 flex-1 overflow-auto resize-x"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ minWidth: '250px', maxWidth: '500px' }}
      >
        <h2 className="text-lg font-bold mb-4 text-center">Cart</h2>
        {cart.length > 0 ? (
          <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {cart.map((item, index) => (
              <div
                key={index}
                className="p-3 border rounded-lg bg-green-100 mb-2 flex justify-between items-center"
              >
                <span>{item.name} (x{item.quantity})</span>
                <span>${item.price * item.quantity}</span>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Drag products here to add to cart
          </p>
        )}
      </div>
    </div>
  );
};

export default SalesProduct;
