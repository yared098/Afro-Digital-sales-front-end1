import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { TbHandFingerDown } from "react-icons/tb";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`/api/auth/${role}`, { username, email, phoneNumber, password, role });
      if (response.data.success) {
        navigate('/login');
      } else {
        setError(response.data.message || 'Error signing up. Please try again.');
      }
    } catch (error) {
      console.error("handleSignUp error:", error)
      setError('Error signing up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center bg-green-100 overflow-hidden">
      {/* Glowing circles */}
      <div className="absolute top-[-50px] right-[-50px] w-72 h-72  bg-green-600  blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-72 h-72  bg-green-700  blur-3xl rounded-full animate-pulse"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6 py-2 z-10 bg-white rounded-xl shadow-xl border border-gray-200"
      >
        <div className='flex justify-center items-center gap-1'>
          <h2 className="text-3xl font-semibold text-center text-green-700">Sign Up As </h2>
          <TbHandFingerDown size={27} color='green'/> 
        </div>
        <div className="mt-2 flex justify-center space-x-2">
          {['customer', 'sales', 'vendor'].map((r) => (
            <motion.button
              key={r}
              onClick={() => setRole(r)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`px-4 py-2 rounded-lg shadow transition-all duration-300 ${role === r ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-900'}`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </motion.button>
          ))}
        </div>
        <form onSubmit={handleSignUp} className="mt-4 space-y-2">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium text-green-700">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 mt-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-green-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 mt-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-green-700">Phone Number</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="p-3 mt-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-green-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 mt-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full p-3 mt-4 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 flex items-center justify-center transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </motion.button>
        </form>
        <p className="mt-6 text-center text-sm text-green-700">
          Already have an account?{' '}
          <a href="/login" className="text-green-600 hover:underline">Login</a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
