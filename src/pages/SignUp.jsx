import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signUpWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
} from "../services/authService";
import { FaGoogle, FaFacebook, FaTelegram, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userData = await signUpWithEmailAndPassword(email, password, username, phoneNumber);
      navigate("/dashboard"); // Redirect to dashboard after successful signup
    } catch (error) {
      setError(error.message || "Error signing up. Please try again.");
    }
  };

  

  return (
    <div className="bg-gradient-to-br from-green-400 to-white w-full min-h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-xl"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">Sign Up</h2>

        {/* Sign-Up Form */}
        <form onSubmit={handleSignUp} className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
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
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
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
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Sign-Up Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
          >
            Sign Up
          </motion.button>
        </form>

      

        {/* Login Redirect */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
