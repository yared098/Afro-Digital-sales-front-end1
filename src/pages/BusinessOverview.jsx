import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const BusinessOverview = () => {
  const [stats, setStats] = useState({ sales: 0, products: 0, orders: 0 });
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const salesSnap = await getDocs(collection(db, "sales"));
        const productsSnap = await getDocs(collection(db, "products"));
        const ordersSnap = await getDocs(collection(db, "orders"));

        setStats({
          sales: salesSnap.size,
          products: productsSnap.size,
          orders: ordersSnap.size,
        });
      } catch (error) {
        console.error("Error fetching business data:", error);
      }
      setLoading(false);
    };
    fetchStats();
  }, [db]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Business Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.sales}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold">Total Products</h3>
          <p className="text-2xl font-bold text-green-600">{stats.products}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold text-red-600">{stats.orders}</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview;
