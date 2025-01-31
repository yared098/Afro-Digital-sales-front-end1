import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa'; // Import close icon

const AdminBusinessPage = () => {
  const [activeTab, setActiveTab] = useState('accepted'); // Active tab state
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [isFormOpen, setIsFormOpen] = useState(false); // Toggle form visibility
  const [newBusiness, setNewBusiness] = useState({
    name: '',
    owner: '',
    email: '',
    phone: '',
    username: '',
    address: '', // Added address state
    category: '', // Added category state
  }); // New business form state
  const [selectedBusiness, setSelectedBusiness] = useState(null); // Selected business for detail view
  const [isProcessing, setIsProcessing] = useState(false); // Track if a business status change is in progress

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

  // Handle item click to show or hide details
  const handleBusinessClick = (business) => {
    if (selectedBusiness && selectedBusiness.id === business.id) {
      setSelectedBusiness(null); // Close details if clicked again
    } else {
      setSelectedBusiness(business); // Show details
    }
  };

  // Handle status change (accepted/rejected)
  const handleStatusChange = (status) => {
    if (isProcessing) return; // Prevent changes while processing
    setIsProcessing(true);
    setTimeout(() => {
      setSelectedBusiness((prev) => ({
        ...prev,
        status,
      }));
      setIsProcessing(false);
    }, 1000); // Simulating a delay for processing
  };

  // Handle form submission for new business
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`New Business Added: ${newBusiness.name} by ${newBusiness.owner}`);
    setNewBusiness({
      name: '',
      owner: '',
      email: '',
      phone: '',
      username: '',
      address: '',
      category: '', // Reset all fields
    }); // Reset form
    setIsFormOpen(false); // Close form
  };

  // Handle saving the business
  const handleSaveAsBusiness = () => {
    alert(`Business saved as: ${newBusiness.name}`);
    setNewBusiness({
      name: '',
      owner: '',
      email: '',
      phone: '',
      username: '',
      address: '',
      category: '', // Reset all fields
    }); // Reset form
  };

  // Render business list based on active tab
  const renderBusinessList = () => {
    return filteredData.map((business) => (
      <tr
        key={business.id}
        className="cursor-pointer"
        onClick={() => handleBusinessClick(business)}
      >
        <td className="border px-4 py-2">{business.id}</td>
        <td className="border px-4 py-2">{business.name}</td>
        <td className="border px-4 py-2">{business.owner}</td>
        <td className="border px-4 py-2">{business.status}</td>
      </tr>
    ));
  };

  return (
    <div className="relative p-6 min-h-screen bg-gray-50">
      {/* Tabs and Search */}
      <div className="flex space-x-4 items-center mb-6">
        {['accepted', 'rejected', 'pending'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-800 hover:bg-blue-100'
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
          className="px-4 py-2 border rounded-md w-72 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="flex">
        {/* Business List */}
        <div className="flex-1">
          <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border px-6 py-3 text-left">ID</th>
                <th className="border px-6 py-3 text-left">Business Name</th>
                <th className="border px-6 py-3 text-left">Owner</th>
                <th className="border px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>{renderBusinessList()}</tbody>
          </table>
        </div>

        {/* Business Detail (Right Sidebar) */}
        {selectedBusiness && (
          <div className="w-96 bg-white p-6 shadow-lg ml-6 fixed top-0 right-0 h-full z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Business Detail</h3>
              <button
                onClick={() => setSelectedBusiness(null)} // Close details when icon is clicked
                className="text-gray-600 hover:text-gray-800 text-xl"
                title="Close"
              >
                <FaTimes />
              </button>
            </div>
            <p><strong>ID:</strong> {selectedBusiness.id}</p>
            <p><strong>Name:</strong> {selectedBusiness.name}</p>
            <p><strong>Owner:</strong> {selectedBusiness.owner}</p>
            <p><strong>Status:</strong> {selectedBusiness.status}</p>

            {/* If pending, show Accept/Reject buttons */}
            {selectedBusiness.status === 'Pending' && !isProcessing && (
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleStatusChange('Accepted')}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  disabled={isProcessing}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange('Rejected')}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  disabled={isProcessing}
                >
                  Reject
                </button>
              </div>
            )}

            {/* Disable buttons when processing */}
            {isProcessing && <p className="mt-4 text-gray-500">Processing...</p>}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-all"
        title="Add New Business"
      >
        <FaPlus />
      </button>

      {/* Slide-in Form */}
      {isFormOpen && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl p-8 z-50 rounded-lg transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Add New Business</h2>
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
              <label className="block text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={newBusiness.name}
                onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Owner</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={newBusiness.owner}
                onChange={(e) => setNewBusiness({ ...newBusiness, owner: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={newBusiness.email}
                onChange={(e) => setNewBusiness({ ...newBusiness, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={newBusiness.phone}
                onChange={(e) => setNewBusiness({ ...newBusiness, phone: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={newBusiness.username}
                onChange={(e) => setNewBusiness({ ...newBusiness, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Address</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={newBusiness.address}
                onChange={(e) => setNewBusiness({ ...newBusiness, address: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handleSaveAsBusiness}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md text-sm hover:bg-blue-700 transition duration-200"
              >
                Save as Business
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md text-sm hover:bg-green-700 transition duration-200"
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
