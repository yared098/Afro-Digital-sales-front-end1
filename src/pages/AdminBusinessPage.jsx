import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AdminBusinessPage = () => {
  const [activeTab, setActiveTab] = useState('accepted'); // Active tab state
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [isFormOpen, setIsFormOpen] = useState(false); // Toggle form visibility
  const [newBusiness, setNewBusiness] = useState({
    name: '',
    owner: '',
    email: '',
    phone: '',
    category: '', // Added category state
  }); // New business form state

  // Sample data
  const businessData = {
    accepted: [
      { id: 1, name: 'Tech Solutions', owner: 'Alice', status: 'Accepted' },
      { id: 2, name: 'Green Farms', owner: 'Bob', status: 'Accepted' },
    ],
    rejected: [
      { id: 3, name: 'Sky Travels', owner: 'Charlie', status: 'Rejected' },
    ],
    pending: [
      { id: 4, name: 'Oceanic Goods', owner: 'Dave', status: 'Pending' },
      { id: 5, name: 'Urban Eats', owner: 'Eve', status: 'Pending' },
    ],
  };

  // Filtered data based on the active tab and search term
  const filteredData = businessData[activeTab].filter((business) =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderBusinessList = () => {
    return filteredData.map((business) => (
      <tr key={business.id}>
        <td className="border px-4 py-2">{business.id}</td>
        <td className="border px-4 py-2">{business.name}</td>
        <td className="border px-4 py-2">{business.owner}</td>
        <td className="border px-4 py-2">{business.status}</td>
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
    alert(`New Business Added: ${newBusiness.name} by ${newBusiness.owner}`);
    setNewBusiness({ name: '', owner: '', email: '', phone: '', category: '' }); // Reset form
    setIsFormOpen(false); // Close form
  };

  // Close the form
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="relative p-6 min-h-screen bg-gray-100">
      {/* <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Business Page</h1> */}

      {/* Tabs and Search */}
      <div className="flex space-x-6 items-center mb-6">
        {['accepted', 'rejected', 'pending'].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 rounded-lg font-medium text-lg transition duration-200 ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-100'
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name"
          className="px-4 py-2 border rounded-md w-72 shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-6 py-3 text-left">ID</th>
            <th className="border px-6 py-3 text-left">Business Name</th>
            <th className="border px-6 py-3 text-left">Owner</th>
            <th className="border px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>{renderBusinessList()}</tbody>
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
        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl p-8 z-50 rounded-lg transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Add New Business</h2>
            <button
              onClick={handleCloseForm}
              className="text-gray-600 hover:text-gray-800 text-xl"
              title="Close"
            >
              ✖
            </button>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newBusiness.name}
                onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Owner</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newBusiness.owner}
                onChange={(e) => setNewBusiness({ ...newBusiness, owner: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newBusiness.email}
                onChange={(e) => setNewBusiness({ ...newBusiness, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newBusiness.phone}
                onChange={(e) => setNewBusiness({ ...newBusiness, phone: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newBusiness.category}
                onChange={(e) => setNewBusiness({ ...newBusiness, category: e.target.value })}
                required
              >
                <option value="">Select a category</option>
                <option value="Tech">Tech</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                {/* Add more categories here */}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
              >
                Add Business
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminBusinessPage;
