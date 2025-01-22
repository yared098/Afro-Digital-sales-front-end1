import React, { useState } from 'react';

const BusinessOrder = () => {
  // State for managing orders
  const [orders, setOrders] = useState([
    { id: 1, name: 'Order 1', status: 'Pending', quantity: 1, details: 'Order 1 details' },
    { id: 2, name: 'Order 2', status: 'Accepted', quantity: 2, details: 'Order 2 details' },
    { id: 3, name: 'Order 3', status: 'Rejected', quantity: 1, details: 'Order 3 details' },
    { id: 4, name: 'Order 4', status: 'Pending', quantity: 3, details: 'Order 4 details' },
    { id: 5, name: 'Order 5', status: 'Pending', quantity: 2, details: 'Order 5 details' },
    { id: 6, name: 'Order 6', status: 'Accepted', quantity: 4, details: 'Order 6 details' },
    { id: 7, name: 'Order 7', status: 'Pending', quantity: 3, details: 'Order 7 details' },
    { id: 8, name: 'Order 8', status: 'Rejected', quantity: 1, details: 'Order 8 details' },
    { id: 9, name: 'Order 9', status: 'Pending', quantity: 1, details: 'Order 9 details' },
    { id: 10, name: 'Order 10', status: 'Accepted', quantity: 5, details: 'Order 10 details' },
    { id: 11, name: 'Order 11', status: 'Rejected', quantity: 2, details: 'Order 11 details' },
    { id: 12, name: 'Order 12', status: 'Pending', quantity: 3, details: 'Order 12 details' },
  ]);

  // State for active tab and search input
  const [activeTab, setActiveTab] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [newOrder, setNewOrder] = useState({ name: '', quantity: 1 });

  // State for managing which order is selected for details
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Handle tab change
  const handleTabChange = (status) => {
    setActiveTab(status);
  };

  // Filter orders based on active tab and search term
  const filteredOrders = orders.filter((order) => 
    order.status === activeTab && order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle order status update (Accept or Reject)
  const handleUpdateStatus = (id, status) => {
    setOrders(orders.map((order) =>
      order.id === id ? { ...order, status } : order
    ));
  };

  // Handle adding a new order
  const handleAddOrder = () => {
    if (newOrder.name.trim() === '') {
      alert('Please enter an order name');
      return;
    }
    setOrders([
      ...orders,
      { id: orders.length + 1, name: newOrder.name, status: 'Pending', quantity: newOrder.quantity, details: 'New order details' }
    ]);
    setNewOrder({ name: '', quantity: 1 }); // Reset form after adding
  };

  // Open order details in the slide panel
  const handleOpenOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  // Clear selected order
  const handleClearSelectedOrder = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="container p-6 max-w-4xl mx-auto relative">
      {/* Tabs and Search Form */}
      <div className="flex items-center mb-6 border-b">
        {/* Tabs for Order Status */}
        <div className="flex space-x-4">
          <button
            onClick={() => handleTabChange('Pending')}
            className={`px-4 py-2 ${activeTab === 'Pending' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Pending
          </button>
          <button
            onClick={() => handleTabChange('Accepted')}
            className={`px-4 py-2 ${activeTab === 'Accepted' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Accepted
          </button>
          <button
            onClick={() => handleTabChange('Rejected')}
            className={`px-4 py-2 ${activeTab === 'Rejected' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Rejected
          </button>
        </div>

        {/* Search Form */}
        <div className="ml-auto">
          <input
            type="text"
            placeholder="Search Orders"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-64"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        {filteredOrders.length === 0 ? (
          <p>No orders found in this category.</p>
        ) : (
          <div className="overflow-y-auto max-h-[400px]"> {/* Scrollable container */}
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center p-4 mb-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
                onClick={() => handleOpenOrderDetails(order)}
              >
                <div>
                  <span className="font-semibold">{order.name}</span>
                  <p className="text-gray-500">Quantity: {order.quantity}</p>
                </div>
                <div className="flex space-x-2">
                  {order.status === 'Pending' && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent closing the slide panel when clicking Accept/Reject
                          handleUpdateStatus(order.id, 'Accepted');
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateStatus(order.id, 'Rejected');
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <span className="text-gray-500">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

     

      {/* Slide-in Order Details Panel */}
      {selectedOrder && (
        <div
          className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ease-in-out"
          style={{
            transform: selectedOrder ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          <button
            onClick={handleClearSelectedOrder}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            <p><strong>Order Name:</strong> {selectedOrder.name}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Details:</strong> {selectedOrder.details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessOrder;
