import React, { useState } from 'react';
import { FaPlus, FaFilter } from 'react-icons/fa';

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
  const [selectedSale, setSelectedSale] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    location: '',
    address: '',
  });
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);

  // Sample data
  const salesData = {
    accepted: [
      { id: 1, item: 'Laptop', buyer: 'John', location: 'New York', address: '123 Main St', status: 'Accepted' },
      { id: 2, item: 'Phone', buyer: 'Mary', location: 'Los Angeles', address: '456 Oak St', status: 'Accepted' },
    ],
    rejected: [
      { id: 3, item: 'TV', buyer: 'Steve', location: 'Chicago', address: '789 Pine St', status: 'Rejected' },
    ],
    pending: [
      { id: 4, item: 'Watch', buyer: 'Paul', location: 'San Francisco', address: '321 Birch St', status: 'Pending' },
      { id: 5, item: 'Headphones', buyer: 'Emma', location: 'Miami', address: '654 Cedar St', status: 'Pending' },
    ],
  };

  const filteredData = salesData[activeTab].filter((sale) =>
    sale.item.toLowerCase().includes(searchTerm.toLowerCase()) &&
    sale.buyer.toLowerCase().includes(filters.name.toLowerCase()) &&
    sale.location.toLowerCase().includes(filters.location.toLowerCase()) &&
    sale.address.toLowerCase().includes(filters.address.toLowerCase())
  );

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleStatusChange = (saleId, newStatus) => {
    // Update the sale status based on the button clicked (Accept/Reject)
    const updatedSalesData = { ...salesData };
    const sale = updatedSalesData.pending.find((sale) => sale.id === saleId);
    if (sale) {
      sale.status = newStatus;
      // Move the sale to the appropriate tab (accepted/rejected)
      updatedSalesData[newStatus.toLowerCase()].push(sale);
      updatedSalesData.pending = updatedSalesData.pending.filter((sale) => sale.id !== saleId);
      setSelectedSale(null); // Deselect after action
    }
    setActiveTab(newStatus.toLowerCase());
  };

  const renderSalesList = () => {
    return filteredData.map((sale) => (
      <tr
        key={sale.id}
        onClick={() => setSelectedSale(sale)}
        className="cursor-pointer hover:bg-gray-100"
      >
        <td className="border px-6 py-2">{sale.id}</td>
        <td className="border px-6 py-2">{sale.item}</td>
        <td className="border px-6 py-2">{sale.buyer}</td>
        <td className="border px-6 py-2">{sale.location}</td>
        <td className="border px-6 py-2">{sale.address}</td>
        <td className="border px-6 py-2">{sale.status}</td>
      </tr>
    ));
  };

  return (
    <div className="relative p-6 min-h-screen bg-gray-50">
      {/* Tabs and Search */}
      <div className="flex space-x-6 items-center mb-4">
        {['accepted', 'rejected', 'pending'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition duration-200 ${
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

      {/* Filter Icon and Box */}
      <div className="flex items-center mb-6">
        <button
          className="flex items-center text-gray-700 hover:text-gray-900 mr-6"
          onClick={() => setIsFilterBoxOpen(!isFilterBoxOpen)}
        >
          <FaFilter className="text-lg" />
          <span className="ml-2">Filters</span>
        </button>

        {/* Filter Box */}
        {isFilterBoxOpen && (
          <div className="p-6 bg-white border rounded-lg shadow-lg w-80 absolute top-16 right-6">
            <button
              onClick={() => setIsFilterBoxOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
            >
              ✖
            </button>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Filter by Name</label>
              <input
                type="text"
                name="name"
                className="px-4 py-2 border rounded-md w-full shadow-md"
                value={filters.name}
                onChange={handleFilterChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Filter by Location</label>
              <input
                type="text"
                name="location"
                className="px-4 py-2 border rounded-md w-full shadow-md"
                value={filters.location}
                onChange={handleFilterChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Filter by Address</label>
              <input
                type="text"
                name="address"
                className="px-4 py-2 border rounded-md w-full shadow-md"
                value={filters.address}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        )}
      </div>

      {/* Sales Table and Detail Sidebar */}
      <div className="flex" style={{ height: 'calc(100vh - 150px)' }}>
        <div className="w-3/4 overflow-y-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="border px-6 py-3 text-left">ID</th>
                <th className="border px-6 py-3 text-left">Item</th>
                <th className="border px-6 py-3 text-left">Buyer</th>
                <th className="border px-6 py-3 text-left">Location</th>
                <th className="border px-6 py-3 text-left">Address</th>
                <th className="border px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>{renderSalesList()}</tbody>
          </table>
        </div>

        {/* Right Sidebar for Sale Details */}
        {selectedSale && (
          <div className="w-1/4 ml-6 p-6 bg-white border rounded-lg shadow-lg flex flex-col" style={{ height: '100%' }}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sale Details</h2>
            <div className="mb-4">
              <div className="font-medium text-gray-700">Item:</div>
              <div className="text-gray-900">{selectedSale.item}</div>
            </div>
            <div className="mb-4">
              <div className="font-medium text-gray-700">Buyer:</div>
              <div className="text-gray-900">{selectedSale.buyer}</div>
            </div>
            <div className="mb-4">
              <div className="font-medium text-gray-700">Location:</div>
              <div className="text-gray-900">{selectedSale.location}</div>
            </div>
            <div className="mb-4">
              <div className="font-medium text-gray-700">Address:</div>
              <div className="text-gray-900">{selectedSale.address}</div>
            </div>
            <div className="mb-4">
              <div className="font-medium text-gray-700">Status:</div>
              <div className="text-gray-900">{selectedSale.status}</div>
            </div>

            {/* Accept/Reject Buttons */}
            {selectedSale.status === 'Pending' && (
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => handleStatusChange(selectedSale.id, 'Accepted')}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(selectedSale.id, 'Rejected')}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleFABClick}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        <FaPlus />
      </button>

      {/* New Sale Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Add New Sale</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Item</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newSale.item}
                  onChange={(e) => setNewSale({ ...newSale, item: e.target.value })}
                  required
                />
              </div>
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
                <label className="block text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newSale.category}
                  onChange={(e) => setNewSale({ ...newSale, category: e.target.value })}
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
              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-800"
              >
                Add Sale
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSalesPage;
