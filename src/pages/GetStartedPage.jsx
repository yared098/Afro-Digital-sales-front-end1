import { useState } from "react";
import { motion } from "framer-motion";

export default function GetStartedPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("customer");

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md w-full p-6 shadow-lg rounded-2xl border border-gray-200 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="customer">Customer</option>
              <option value="sales">Sales</option>
              <option value="company">Company</option>
            </select>
            <input 
              placeholder="Email" 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded mb-3" 
            />
            <input 
              placeholder="Password" 
              type="password" 
              className="w-full p-2 border border-gray-300 rounded mb-4" 
            />
            <button className="w-full p-2 bg-blue-600 text-white rounded">
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <p className="text-center text-sm mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"} 
              <span 
                className="text-blue-600 cursor-pointer ml-1" 
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}