import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AdminSalesPage = () => {
  const [activeTab, setActiveTab] = useState('accepted');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newSale, setNewSale] = useState({
    item: '',
    buyer: '',
    email: '',
    phone: '',
    password: '',
    category: '',
  });

  // Sample data
  const salesData = {
    accepted: [
      { id: 1, item: 'Laptop', buyer: 'John', status: 'Accepted' },
      { id: 2, item: 'Phone', buyer: 'Mary', status: 'Accepted' },
    ],
    rejected: [
      { id: 3, item: 'TV', buyer: 'Steve', status: 'Rejected' },
    ],
    pending: [
      { id: 4, item: 'Watch', buyer: 'Paul', status: 'Pending' },
      { id: 5, item: 'Headphones', buyer: 'Emma', status: 'Pending' },
    ],
  };

  const filteredData = salesData[activeTab].filter((sale) =>
    sale.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSalesList = () => {
    return filteredData.map((sale) => (
      <tr key={sale.id}>
        <td className="border px-4 py-2">{sale.id}</td>
        <td className="border px-4 py-2">{sale.item}</td>
        <td className="border px-4 py-2">{sale.buyer}</td>
        <td className="border px-4 py-2">{sale.status}</td>
      </tr>
    ));
  };

  const handleFABClick = () => {
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`New Sale Added: ${newSale.item} by ${newSale.buyer}`);
    setNewSale({
      item: '',
      buyer: '',
      email: '',
      phone: '',
      password: '',
      category: '',
    });
    setIsFormOpen(false);
  };

  return (
    <div className="relative p-6 min-h-screen bg-gray-50">
      {/* <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Sales Page</h1> */}

      {/* Tabs and Search */}
      <div className="flex space-x-6 items-center mb-6">
        {['accepted', 'rejected', 'pending'].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 rounded-lg font-medium text-lg transition duration-200 ${
              activeTab === tab ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-green-100'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search by item"
          className="px-4 py-2 border rounded-md w-72 shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="border px-6 py-3 text-left">ID</th>
            <th className="border px-6 py-3 text-left">Item</th>
            <th className="border px-6 py-3 text-left">Buyer</th>
            <th className="border px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>{renderSalesList()}</tbody>
      </table>

      {/* Floating Action Button */}
      <button
        onClick={handleFABClick}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        title="Add New Sale"
      >
         <FaPlus />
      </button>
       
      

      {/* Slide-in Form */}
      {isFormOpen && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl p-8 z-50 rounded-lg transition-all duration-300 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Add New Sale</h2>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-gray-600 hover:text-gray-800 text-xl"
              title="Close"
            >
              ✖
            </button>
          </div>
          <form onSubmit={handleFormSubmit}>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Buyer</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newSale.buyer}
                onChange={(e) => setNewSale({ ...newSale, buyer: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newSale.email}
                onChange={(e) => setNewSale({ ...newSale, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newSale.phone}
                onChange={(e) => setNewSale({ ...newSale, phone: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newSale.password}
                onChange={(e) => setNewSale({ ...newSale, password: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newSale.category}
                onChange={(e) => setNewSale({ ...newSale, category: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded mr-2"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200"
              >
                Add Sale
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Overlay */}
      {isFormOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminSalesPage;
