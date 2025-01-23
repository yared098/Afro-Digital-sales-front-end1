import React, { useState } from 'react';
import { FaShoppingCart, FaExchangeAlt } from 'react-icons/fa';

const SalesProduct = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartSearchQuery, setCartSearchQuery] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Burger', price: 100, vendorId: 1 },
    { id: 2, name: 'Pizza', price: 200, vendorId: 1 },
    { id: 3, name: 'Electronics', price: 300, vendorId: 2 },
    { id: 4, name: 'Club sandwich', price: 400, vendorId: 2 },
    { id: 5, name: 'Product E', price: 500, vendorId: 3 },
    { id: 6, name: 'Product F', price: 600, vendorId: 3 },
    { id: 7, name: 'Product G', price: 700, vendorId: 1 },
    { id: 8, name: 'Product H', price: 800, vendorId: 2 },
    { id: 9, name: 'Product I', price: 900, vendorId: 1 },
    { id: 10, name: 'Product J', price: 1000, vendorId: 3 },
  ]);
  const [cart, setCart] = useState([]);
  const [showVendors, setShowVendors] = useState(false); // State to toggle between Products and Vendors
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Vendor 1' },
    { id: 2, name: 'Vendor 2' },
    { id: 3, name: 'Vendor 3' },
  ]);
  const [selectedVendor, setSelectedVendor] = useState(null); // State to track selected vendor

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCartSearch = (event) => {
    setCartSearchQuery(event.target.value);
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

  const filteredProducts = selectedVendor
    ? products.filter((product) => product.vendorId === selectedVendor.id && product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredCart = cart.filter((item) =>
    item.name.toLowerCase().includes(cartSearchQuery.toLowerCase())
  );

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor); // Set selected vendor
    setShowVendors(false); // Close the vendors list when a vendor is selected
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex h-full gap-6 mt-6">
      {/* Products/Vendors Section */}
      <div
        className="flex-1 col-span-2 p-6 overflow-auto bg-white rounded-lg shadow-lg resize-x"
        style={{ minWidth: '250px', maxWidth: '500px' }}
      >
        <h2 className="mb-4 text-lg font-bold">{showVendors ? 'Vendors' : 'Products'}</h2>

        {/* Search Form */}
        <div className="mb-4">
          <input
            type="text"
            placeholder={`Search ${showVendors ? 'vendors' : 'products'}...`}
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Show Vendors or Products List */}
        {showVendors ? (
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
            {filteredVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="flex flex-col items-center justify-center p-4 bg-white border rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                onClick={() => handleVendorSelect(vendor)}
              >
                <h3 className="mb-2 font-bold text-md">{vendor.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center justify-center p-4 bg-white border rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                draggable
                onDragStart={(event) => handleDragStart(event, product)}
              >
                <h3 className="mb-2 font-bold text-md">{product.name}</h3>
                <p className="mb-4 text-sm text-gray-600">${product.price}</p>
                <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded">
                  Drag Me
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Section */}
      <div
        className="flex-1 col-span-1 p-6 overflow-auto bg-white border-2 border-gray-400 border-dashed rounded-lg shadow-lg resize-x"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ minWidth: '250px', maxWidth: '500px' }}
      >
        <h2 className="mb-4 text-lg font-bold text-center">Cart</h2>

        {/* Search Bar for Cart */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search in cart..."
            value={cartSearchQuery}
            onChange={handleCartSearch}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {filteredCart.length > 0 ? (
          <div className="flex-1 p-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {filteredCart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 mb-2 bg-green-100 border rounded-lg"
              >
                <span>{item.name} (x{item.quantity})</span>
                <span>${item.price * item.quantity}</span>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Drag products here to add to cart
          </p>
        )}
      </div>

      {/* Floating Action Button (FAB) for Switch */}
      <button
        onClick={() => setShowVendors(!showVendors)}
        className="fixed p-4 text-white bg-blue-600 rounded-full shadow-lg bottom-6 right-6 hover:bg-blue-700 focus:outline-none"
        style={{ fontSize: '24px' }}
      >
        <FaExchangeAlt />
      </button>
    </div>
  );
};

export default SalesProduct;
