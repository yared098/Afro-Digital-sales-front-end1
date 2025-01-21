import React, { useState } from 'react';
import {
  signInWithEmailAndPasswordCustom,
  signInWithProvider,
} from '../services/auth/authService'; // Use the correct function names
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPasswordCustom(email, password); // Corrected function name
      navigate('/dashboard'); // Redirect to dashboard or homepage after login
    } catch (error) {
      setError('Error logging in. Please try again.');
    }
  };

  const handleProviderLogin = async (provider) => {
    try {
      await signInWithProvider(provider);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      setError(`Error logging in with ${provider}. Please try again.`);
    }
  };

  return (
    <div className="bg-white w-full min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full p-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600">
            Login
          </button>
        </form>
        <div className="mt-6">
          <p className="text-center mb-4 text-sm text-gray-600">Or login with</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => handleProviderLogin('google')}
              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            >
              <FaGoogle size={24} />
            </button>
            <button
              onClick={() => handleProviderLogin('facebook')}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              <FaFacebook size={24} />
            </button>
            <button
              onClick={() => handleProviderLogin('twitter')}
              className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition"
            >
              <FaTwitter size={24} />
            </button>
            <button
              onClick={() => handleProviderLogin('instagram')}
              className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
            >
              <FaInstagram size={24} />
            </button>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
