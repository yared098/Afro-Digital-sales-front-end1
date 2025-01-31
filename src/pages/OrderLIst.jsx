import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FaFilter } from "react-icons/fa";

const OrdersList = ({ filterLocation, filterName, filterPrice }) => {
  const mockOrders = [
    { id: 1, code: "ORD123", name: "Product A", location: "Addis Ababa", price: 100, status: "Accepted", timeAgo: "2 hours ago", address: "123 New York St" },
    { id: 2, code: "ORD124", name: "Product B", location: "BAhir Dar", price: 200, status: "Rejected", timeAgo: "5 hours ago", address: "456 LA Ave" },
    { id: 3, code: "ORD125", name: "Product C", location: "Gonder", price: 150, status: "Pending", timeAgo: "1 day ago", address: "789 Chicago Blvd" },
    { id: 1, code: "ORD123", name: "Product A", location: "Adama", price: 100, status: "Accepted", timeAgo: "2 hours ago", address: "123 New York St" },
    { id: 2, code: "ORD124", name: "Product B", location: "Hawasa", price: 200, status: "Rejected", timeAgo: "5 hours ago", address: "456 LA Ave" },
    { id: 3, code: "ORD125", name: "Product C", location: "Sidama", price: 150, status: "Pending", timeAgo: "1 day ago", address: "789 Chicago Blvd" },
    { id: 1, code: "ORD123", name: "Product A", location: "Arba minch", price: 100, status: "Accepted", timeAgo: "2 hours ago", address: "123 New York St" },
    { id: 2, code: "ORD124", name: "Product B", location: "Los Angeles", price: 200, status: "Rejected", timeAgo: "5 hours ago", address: "456 LA Ave" },
    { id: 3, code: "ORD125", name: "Product C", location: "Chicago", price: 150, status: "Pending", timeAgo: "1 day ago", address: "789 Chicago Blvd" }
  ];

  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const itemsPerPage = 5;
  const db = getFirestore();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersSnap = await getDocs(collection(db, "orders"));
        if (!ordersSnap.empty) {
          const ordersList = ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setOrders(ordersList);
        }
      } catch (error) {
        console.error("Error fetching orders from Firebase:", error);
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
      {/* Orders List */}
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

        {/* Filter Modal */}
        {filterMenuOpen && (
          <div className="absolute top-20 right-10 bg-white shadow-lg rounded-lg p-4 w-48">
            <p className="font-semibold text-sm">Filter By:</p>
            <select className="w-full mt-2 p-2 border rounded-lg text-sm" onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="">Status</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
            </select>
            <select className="w-full mt-2 p-2 border rounded-lg text-sm" onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Sort By</option>
              <option value="Name">Name</option>
              <option value="Time">Time</option>
            </select>
          </div>
        )}

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
