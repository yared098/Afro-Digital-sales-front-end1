import React, { useState } from 'react';

const AdminSalesPage = () => {
  const [activeTab, setActiveTab] = useState('accepted'); // Active tab state
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [isFormOpen, setIsFormOpen] = useState(false); // Toggle form visibility
  const [newSale, setNewSale] = useState({ item: '', buyer: '' }); // New sale form state

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

  // Filtered data based on the active tab and search term
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

  // Toggle form visibility
  const handleFABClick = () => {
    setIsFormOpen(true);
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`New Sale Added: ${newSale.item} by ${newSale.buyer}`);
    setNewSale({ item: '', buyer: '' }); // Reset form
    setIsFormOpen(false); // Close form
  };

  return (
    <div className="relative p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Sales Page</h1>

      {/* Tabs and Search */}
      <div className="flex space-x-4 items-center mb-4">
        {['accepted', 'rejected', 'pending'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by item"
          className="px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Item</th>
            <th className="border px-4 py-2">Buyer</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>{renderSalesList()}</tbody>
      </table>

      {/* Floating Action Button */}
      <button
        onClick={handleFABClick}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
        title="Add New Sale"
      >
        ➕
      </button>

      {/* Slide-in Form */}
      {isFormOpen && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-6 z-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Add New Sale</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Item</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={newSale.item}
                onChange={(e) => setNewSale({ ...newSale, item: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Buyer</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={newSale.buyer}
                onChange={(e) => setNewSale({ ...newSale, buyer: e.target.value })}
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
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Add Sale
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Overlay */}
      {isFormOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 rounded-lg"
          onClick={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminSalesPage;
