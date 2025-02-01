import React, { useEffect, useState } from "react";
import { services } from "../services/ServiceFactory";
import { FaSyncAlt } from "react-icons/fa";

const BusinessSalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productList = await services.product.getAllProducts();
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSales = async () => {
    setLoading(true);
    setError("");
    try {
      const salesData = await services.sales.getAllSales();
      setSales(salesData);
    } catch (err) {
      console.error("Failed to fetch sales: ", err);
      setError("Failed to fetch sales. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openSidebar = (sale) => {
    setSelectedSale(sale);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedSale(null), 300); // Wait for animation before clearing
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="p-6 mx-auto bg-white rounded-lg shadow-md mb-8">
        {/* <h2 className="mb-4 text-2xl font-semibold text-gray-800">Business Sales</h2> */}

        {loading ? (
          <div className="flex justify-center items-center py-6">
            <p className="text-gray-600">Loading sales...</p>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : sales.length === 0 ? (
          <p className="text-gray-600">No sales records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full overflow-hidden bg-white rounded-lg shadow-md">
              <thead className="text-white bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr
                    key={index}
                    className="transition border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => openSidebar(sale)}
                  >
                    <td className="px-4 py-3">{sale.username}</td>
                    <td className="px-4 py-3">{sale.phone}</td>
                    <td className="px-4 py-3">{sale.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={fetchSales}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
      >
        <FaSyncAlt size={24} />
      </button>

      {/* Sidebar for Sale Details */}
      <div
        className={`fixed overflow-scroll top-0 right-0 h-full w-96 bg-white shadow-2xl shadow-black p-6 transform transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
        rounded-tl-2xl rounded-bl-2xl`}
      >
        {selectedSale && (
          <>
            <button
              onClick={closeSidebar}
              className="absolute text-gray-600 transition top-4 right-4 hover:text-red-500"
            >
              ✖
            </button>
            <h3 className="mb-4 text-xl font-semibold text-gray-800">{selectedSale.username}</h3>
            <img
              src={selectedSale.logo || "https://via.placeholder.com/150"}
              alt="Product"
              className="object-cover w-full h-40 rounded-md shadow"
            />
            <p className="mt-4 text-gray-600">{selectedSale.about}</p>
            <div className="mt-4">
              <p className="font-semibold text-gray-700">Email:</p>
              <p className="text-gray-600">{selectedSale.email}</p>
            </div>
            <div className="mt-2 mb-4">
              <p className="font-semibold text-gray-700">Phone:</p>
              <p className="text-gray-600">{selectedSale.phone}</p>
            </div>

            <hr className="my-4"/>

            {/* Recent Products Section */}
            <h3 className="mb-2 text-lg font-semibold text-gray-800">Recent Products</h3>
            {products.length === 0 ? (
              <p className="text-gray-600">No recent products found.</p>
            ) : (
              <ul className="space-y-4">
                {products.map((product) => (
                  <li key={product.id} className="flex items-center h-24 p-3 bg-green-200 rounded-md shadow">
                    <img
                      src={product.p_image || "https://via.placeholder.com/100"}
                      alt="Product"
                      className="object-cover w-16 h-16 rounded-full"
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-gray-800">{product.p_name}</p>
                      <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BusinessSalesPage;
