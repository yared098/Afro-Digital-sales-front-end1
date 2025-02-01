import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { FaShoppingCart, FaBox, FaMoneyBillWave } from "react-icons/fa";

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
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 rounded-lg bg-gradient-to-br from-green-800 to-green-500">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="mb-8 text-4xl font-bold text-white">
        Vendor Dashboard
      </motion.h2>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { title: "Total Sales", value: stats.sales, color: "text-blue-400", Icon: FaMoneyBillWave },
          { title: "Total Products", value: stats.products, color: "text-green-400", Icon: FaBox },
          { title: "Total Orders", value: stats.orders, color: "text-red-400", Icon: FaShoppingCart }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="p-6 text-center bg-white border border-gray-700 shadow-lg bg-opacity-10 backdrop-blur-lg rounded-xl"
          >
            <item.Icon className={`text-5xl mb-4 ${item.color}`} />
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="text-3xl font-bold text-white">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BusinessOverview;
