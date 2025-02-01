import React, { useState, useEffect } from 'react';
import { FaPlus, FaFilter } from 'react-icons/fa';
import { services } from '../services/ServiceFactory'; // Import your services

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
  const [salesData, setSalesData] = useState([]); // State to hold fetched sales data

  useEffect(() => {
    const fetchSales = async () => {
      try {
        let data;
        // Fetch sales based on active tab (accepted, rejected, pending, or all)
        if (activeTab === 'accepted') {
          data = await services.sales.getSaleByStatus('accepted');
        } else if (activeTab === 'rejected') {
          data = await services.sales.getSaleByStatus('rejected');
        } else if (activeTab === 'pending') {
          data = await services.sales.getSaleByStatus('pending');
        } else if (activeTab === 'all') {
          data = await services.sales.getAllSales(); // Fetch all sales
        }
        setSalesData(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };
  
    fetchSales();
  }, [activeTab]);

  const filteredData = salesData.filter((sale) => {
    return (
      (sale.item && sale.item.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (sale.fullname && sale.fullname.toLowerCase().includes(filters.name.toLowerCase())) &&
      (sale.location && sale.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (sale.address && sale.address.toLowerCase().includes(filters.address.toLowerCase()))
    );
  });
  

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
    const updatedSalesData = [...salesData];
    const sale = updatedSalesData.find((sale) => sale.s_id === saleId); // Use `s_id` from your model
    if (sale) {
      sale.status = newStatus;
      setSalesData(updatedSalesData); // Update state
    }
  };

  const renderSalesList = () => {
    return filteredData.map((sale) => (
      <tr
        key={sale.s_id}
        onClick={() => setSelectedSale(sale)}
        className="cursor-pointer hover:bg-gray-100"
      >
        <td className="border px-6 py-2">{sale.s_id}</td>
        <td className="border px-6 py-2">{sale.item}</td>
        <td className="border px-6 py-2">{sale.fullname}</td>
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
        {['accepted', 'rejected', 'pending', 'all'].map((tab) => (
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
              <div className="text-gray-900">{selectedSale.fullname}</div>
            </div>
            <div className="mb-4">
              <div className="font-medium text-gray-700">Location:</div>
              <div className="text-gray-900">{selectedSale.location}</div>
            </div>
            <div className="mb-4">
              <div className="font-medium text-gray-700">Address:</div>
              <div className="text-gray-900">{selectedSale.address}</div>
            </div>
            <div className="mt-auto">
              <button
                onClick={() => handleStatusChange(selectedSale.s_id, 'rejected')}
                className="px-4 py-2 bg-red-500 text-white rounded-md w-full mb-2"
              >
                Reject
              </button>
              <button
                onClick={() => handleStatusChange(selectedSale.s_id, 'accepted')}
                className="px-4 py-2 bg-green-500 text-white rounded-md w-full"
              >
                Accept
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleFABClick}
          className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600"
        >
          <FaPlus className="text-2xl" />
        </button>
      </div>

      {/* New Sale Form */}
      {isFormOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-96"
          >
            <h3 className="text-xl font-semibold mb-4">Add New Sale</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Item</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={newSale.item}
                onChange={(e) =>
                  setNewSale((prev) => ({ ...prev, item: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Buyer</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={newSale.buyer}
                onChange={(e) =>
                  setNewSale((prev) => ({ ...prev, buyer: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                value={newSale.email}
                onChange={(e) =>
                  setNewSale((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={newSale.phone}
                onChange={(e) =>
                  setNewSale((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-md"
                value={newSale.password}
                onChange={(e) =>
                  setNewSale((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={newSale.category}
                onChange={(e) =>
                  setNewSale((prev) => ({ ...prev, category: e.target.value }))
                }
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="bg-gray-500 text-white rounded-md py-2 px-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md py-2 px-4"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminSalesPage;
