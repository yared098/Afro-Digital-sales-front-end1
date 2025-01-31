import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { services } from "../services/ServiceFactory";

const OrdersList = ({ filterLocation, filterName, filterPrice }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersList = await services.order.getAllOrders();
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders
    .filter(order =>
      (filterLocation ? order.location.includes(filterLocation) : true) &&
      (filterName ? order.name.includes(filterName) : true) &&
      (filterPrice ? order.price <= filterPrice : true) &&
      (search ? order.code.includes(search) || order.name.includes(search) : true) &&
      (activeTab === "All" || order.status === activeTab) &&
      (selectedStatus ? order.status === selectedStatus : true) &&
      (selectedLocation ? order.location === selectedLocation : true)
    )
    .sort((a, b) => {
      if (sortBy === "Name") return a.name.localeCompare(b.name);
      if (sortBy === "Time") return a.timeAgo.localeCompare(b.timeAgo);
      return 0;
    });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleLocationClick = (location) => {
    setSelectedLocation(location === selectedLocation ? null : location);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-2/3 p-4">
        <h2 className="text-xl font-semibold mb-3">Orders</h2>
        
        {/* Tabs */}
        <div className="flex mb-3 space-x-2">
          {["All", "Accepted", "Rejected", "Pending"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-lg ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex items-center space-x-2 mb-3">
          <input
            type="text"
            placeholder="Search by order code or name..."
            className="w-full p-2 text-sm border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setFilterMenuOpen(!filterMenuOpen)} className="p-2 bg-gray-200 rounded-lg">
            <FaFilter className="text-gray-600" />
          </button>
        </div>

        {/* Orders List */}
        <div className="overflow-auto h-[70%]">
          {paginatedOrders.map(order => (
            <div
              key={order.id}
              className="bg-white shadow p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-200 text-sm"
              onClick={() => setSelectedOrder(order)}
            >
              <p><strong>Order Code:</strong> {order.code}</p>
              <p><strong>Time Ago:</strong> {order.timeAgo}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p
                className="text-blue-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLocationClick(order.location);
                }}
              >
                <strong>Location:</strong> {order.location}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm rounded-lg ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Order Details */}
      <div className="w-1/3 p-4 bg-white shadow-lg">
        {selectedOrder ? (
          <div>
            <h2 className="text-lg font-semibold mb-3">Order Details</h2>
            <p className="text-sm"><strong>Order Code:</strong> {selectedOrder.code}</p>
            <p className="text-sm"><strong>Name:</strong> {selectedOrder.name}</p>
            <p className="text-sm"><strong>Location:</strong> {selectedOrder.location}</p>
            <p className="text-sm"><strong>Address:</strong> {selectedOrder.address}</p>
            <p className="text-sm"><strong>Price:</strong> ${selectedOrder.price}</p>
            <p className="text-sm"><strong>Status:</strong> {selectedOrder.status}</p>
            <p className="text-sm"><strong>Time Ago:</strong> {selectedOrder.timeAgo}</p>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-sm">Select an order to see details</p>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
