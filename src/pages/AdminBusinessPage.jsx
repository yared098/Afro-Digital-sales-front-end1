import React, { useState } from 'react';

const AdminBusinessPage = () => {
  const [activeTab, setActiveTab] = useState('accepted'); // Active tab state
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [isFormOpen, setIsFormOpen] = useState(false); // Toggle form visibility
  const [newBusiness, setNewBusiness] = useState({ name: '', owner: '' }); // New business form state

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
    setNewBusiness({ name: '', owner: '' }); // Reset form
    setIsFormOpen(false); // Close form
  };

  // Close the form
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="relative p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Business Page</h1>

      {/* Tabs and Search */}
      <div className="flex space-x-4 items-center mb-4">
        {['accepted', 'rejected', 'pending'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'
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
            <th className="border px-4 py-2">Business Name</th>
            <th className="border px-4 py-2">Owner</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>{renderBusinessList()}</tbody>
      </table>

      {/* Floating Action Button */}
      <button
        onClick={handleFABClick}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
        title="Add New Business"
      >
        ➕
      </button>

      {/* Slide-in Form */}
      {isFormOpen && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-6 z-50 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add New Business</h2>
            <button
              onClick={handleCloseForm}
              className="text-gray-500 hover:text-gray-700 text-xl"
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
                className="w-full px-4 py-2 border rounded-md"
                value={newBusiness.name}
                onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Owner</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={newBusiness.owner}
                onChange={(e) => setNewBusiness({ ...newBusiness, owner: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md"
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
