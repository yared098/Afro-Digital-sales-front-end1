import React, { useState } from 'react';
import { FaShoppingCart, FaExchangeAlt } from 'react-icons/fa';

const SalesProduct = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartSearchQuery, setCartSearchQuery] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Burger', price: 100, vendorId: 1 },
    { id: 2, name: 'Pizza', price: 200, vendorId: 1 },
    { id: 3, name: 'Electronics', price: 300, vendorId: 2 },
    { id: 4, name: 'Clibe sandwich', price: 400, vendorId: 2 },
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
    <div className="flex mt-6 h-full relative gap-6">
      {/* Products/Vendors Section */}
      <div
        className="col-span-2 bg-white p-6 shadow-lg rounded-lg flex-1 overflow-auto resize-x"
        style={{ minWidth: '250px', maxWidth: '500px' }}
      >
        <h2 className="text-lg font-bold mb-4">{showVendors ? 'Vendors' : 'Products'}</h2>

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
                className="p-4 border rounded-lg bg-white shadow-md flex flex-col items-center justify-center cursor-pointer hover:shadow-lg"
                onClick={() => handleVendorSelect(vendor)}
              >
                <h3 className="text-md font-bold mb-2">{vendor.name}</h3>
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </div>

      {/* Cart Section */}
      <div
        className="col-span-1 bg-white p-6 shadow-lg rounded-lg border-2 border-dashed border-gray-400 flex-1 overflow-auto resize-x"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ minWidth: '250px', maxWidth: '500px' }}
      >
        <h2 className="text-lg font-bold mb-4 text-center">Cart</h2>

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
          <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {filteredCart.map((item, index) => (
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

      {/* Floating Action Button (FAB) for Switch */}
      <button
        onClick={() => setShowVendors(!showVendors)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        style={{ fontSize: '24px' }}
      >
        <FaExchangeAlt />
      </button>
    </div>
  );
};

export default SalesProduct;
