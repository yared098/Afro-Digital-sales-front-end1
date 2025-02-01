import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithProvider,
  getUserFromLocalStorage,
} from "../services/authService";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaGoogle, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const location = useLocation();
  const navigate = useNavigate();
  const [dashType, setDashType] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("dash_type");

    if (type) {
      setDashType(type);
    }
  }, [location.search]);

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading

    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      const user = await getUserFromLocalStorage();
      redirectToDashboard(user.dash_type);
    } catch (error) {
      setError("Error logging in. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleProviderLogin = async (provider) => {
    setLoading(true);
    try {
      const userCredential = await signInWithProvider(provider);
      const user = await getUserFromLocalStorage();
      redirectToDashboard(user.dash_type);
    } catch (error) {
      setError(`Error logging in with ${provider}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const redirectToDashboard = (dashType) => {
    switch (dashType) {
      case "sales_dashboard":
        navigate("/sales-dashboard", { replace: true });
        break;
      case "business_dashboard":
        navigate("/business-dashboard", { replace: true });
        break;
      default:
        navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-400 via-white to-green-200 w-full min-h-screen flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-xl"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Login
        </h2>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.05 }}
            disabled={loading}
            className={`w-full p-3 mt-4 font-semibold rounded-lg shadow transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 border-4 border-t-white border-gray-200 rounded-full"
                  viewBox="0 0 24 24"
                ></svg>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        <div className="mt-6">
          <p className="text-center mb-4 text-sm text-gray-600">Or login with</p>
          <div className="flex justify-center space-x-4 mt-4">
            {[
              ["google", "bg-red-500", FaGoogle],
              ["facebook", "bg-blue-600", FaFacebook],
              ["twitter", "bg-blue-400", FaTwitter],
              ["instagram", "bg-pink-500", FaInstagram],
            ].map(([provider, color, Icon]) => (
              <motion.button
                key={provider}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleProviderLogin(provider)}
                className={`p-3 ${color} text-white rounded-full hover:opacity-80 transition`}
              >
                <Icon size={24} />
              </motion.button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            to={`/signup?dash_type=${dashType}`}
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
