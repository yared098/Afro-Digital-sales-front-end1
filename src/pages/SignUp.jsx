import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signUpWithEmailAndPassword, getUserFromLocalStorage } from "../services/authService";
import { motion } from "framer-motion";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const [dashType, setDashType] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('dash_type');
    if (type) {
      setDashType(type);
    }
  }, [location.search]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signUpWithEmailAndPassword(email, password, username, phoneNumber, dashType);
      const user = await getUserFromLocalStorage();
      redirectToDashboard(user.dash_type);
    } catch (error) {
      setError(error.message || "Error signing up. Please try again.");
    }
    setLoading(false);
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
    <div className="bg-gradient-to-br from-green-400 to-white w-full min-h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-xl"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">Sign Up</h2>

        <form onSubmit={handleSignUp} className="mt-6 space-y-4">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="p-3 w-full border rounded-lg" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-3 w-full border rounded-lg" required />
          <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="p-3 w-full border rounded-lg" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-3 w-full border rounded-lg" required />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 mt-4 flex justify-center items-center bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span> : "Sign Up"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;