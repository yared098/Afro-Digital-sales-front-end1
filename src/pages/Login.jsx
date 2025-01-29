import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import { motion } from 'framer-motion';
import { TbHandFingerDown } from "react-icons/tb";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/auth/login', { email, password, role });
      if (response.data.success) {
        navigate(`/${role}/dashboard`);
      } else {
        setError(response.data.message || 'Error logging in. Please try again.');
      }
    } catch (error) {
      setError('Error logging in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center bg-green-100 overflow-hidden">
      {/* Glowing circles */}
      <div className="absolute top-[-50px] right-[-50px] w-72 h-72 bg-green-600 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-72 h-72 bg-green-700 blur-3xl rounded-full animate-pulse"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6 py-8 z-10 bg-white rounded-xl shadow-xl border border-gray-200"
      >
        <div className='flex justify-center items-center gap-1'>
          <h2 className="text-3xl font-semibold text-center text-green-700">Login As </h2>
          <TbHandFingerDown size={27} color='green'/> 
        </div>
        <div className="mt-4 flex justify-center space-x-2">
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
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
            {loading ? 'Loading...' : 'Login'}
          </motion.button>
        </form>
        <div className="mt-6">
          <p className="text-center mb-4 text-sm text-green-700">Or login with</p>
          <div className="flex justify-center space-x-4 mt-4">
            {[
              { provider: 'google', color: 'bg-red-500', icon: <FaGoogle size={24} /> },
              { provider: 'facebook', color: 'bg-blue-600', icon: <FaFacebook size={24} /> },
              { provider: 'twitter', color: 'bg-blue-400', icon: <FaTwitter size={24} /> },
              { provider: 'instagram', color: 'bg-pink-500', icon: <FaInstagram size={24} /> }
            ].map(({ provider, color, icon }) => (
              <button
                key={provider}
                className={`p-3 ${color} text-white rounded-full hover:opacity-80 transition`}
                disabled={loading}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-green-700">
          Don't have an account?{' '}
          <a href="/signup" className="text-green-600 hover:underline">Sign Up</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
