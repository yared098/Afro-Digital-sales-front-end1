import React, { useState } from 'react';

const SalesOrder = () => {
  // Sample cart data with customer name, order time, and status
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Burger',
      price: 100,
      customerName: 'John Doe',
      orderTime: '2025-01-22 14:30',
      status: 'Accepted',
    },
    {
      id: 2,
      name: 'Pizza',
      price: 200,
      customerName: 'Jane Smith',
      orderTime: '2025-01-22 15:00',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Electronics',
      price: 300,
      customerName: 'Samuel Green',
      orderTime: '2025-01-22 16:30',
      status: 'Accepted',
    },
    {
      id: 4,
      name: 'Club Sandwich',
      price: 400,
      customerName: 'Lucy Brown',
      orderTime: '2025-01-22 17:00',
      status: 'Pending',
    },
  ]);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOrders = cart.filter((order) =>
    order.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle opening of the order details
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  // Handle closing of the slide panel
  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="container p-6">
      <h1 className="mb-4 text-2xl font-bold">Sales Orders</h1>

      {/* Order Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for orders..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-6 mb-6">
        {filteredOrders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="w-full">
            {filteredOrders.map((item) => (
              <div
                key={item.id}
                className={`w-full mb-8 p-4 rounded-lg shadow-md cursor-pointer ${
                  item.status === 'Accepted' ? 'bg-green-100' : 'bg-yellow-100'
                }`}
                onClick={() => handleOrderClick(item)}
              >
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{item.name}</span>
                  <span
                    className={`font-bold ${
                      item.status === 'Accepted' ? 'text-green-600' : 'text-yellow-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{item.customerName}</p>
                <p className="text-xs text-gray-500">{item.orderTime}</p>
                <p className="mt-2 text-sm font-semibold">${item.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide-in Order Details Panel */}
      {selectedOrder && (
        <div
          className="fixed top-0 right-0 w-1/3 h-full p-6 transition-transform duration-300 ease-in-out transform bg-white shadow-lg"
          style={{
            transform: selectedOrder ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          <button
            onClick={handleCloseOrderDetails}
            className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
          >
            &times;
          </button>
          <h2 className="mb-4 text-2xl font-semibold">Order Details</h2>
          <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
            <p><strong>Order Name:</strong> {selectedOrder.name}</p>
            <p><strong>Price:</strong> ${selectedOrder.price}</p>
            <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
            <p><strong>Order Time:</strong> {selectedOrder.orderTime}</p>
            <p><strong>Status:</strong> 
              <span className={`font-bold ${
                selectedOrder.status === 'Accepted' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {selectedOrder.status}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesOrder;
