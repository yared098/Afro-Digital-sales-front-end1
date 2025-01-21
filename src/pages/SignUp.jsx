import React, { useState } from 'react';
import { signUpWithEmailAndPassword } from '../services/auth/authService'; // Ensure this is correct
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaTelegram, FaInstagram } from 'react-icons/fa'; // Import icons

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmailAndPassword(email, password);
      navigate('/login'); // Redirect to login after successful sign-up
    } catch (error) {
      setError('Error signing up. Please try again.');
    }
  };

  const handleSocialSignUp = (platform) => {
    console.log(`Sign up with ${platform}`);
    // Add logic for the respective social media authentication
  };

  return (
    <div className="bg-white w-full min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSignUp} className="mt-8 space-y-4">
          {/* Username Field */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
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

          {/* Phone Number Field */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
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
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">Or sign up with:</p>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => handleSocialSignUp('Google')}
            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            <FaGoogle size={24} />
          </button>
          <button
            onClick={() => handleSocialSignUp('Facebook')}
            className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
          >
            <FaFacebook size={24} />
          </button>
          <button
            onClick={() => handleSocialSignUp('Telegram')}
            className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition"
          >
            <FaTelegram size={24} />
          </button>
          <button
            onClick={() => handleSocialSignUp('Instagram')}
            className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
          >
            <FaInstagram size={24} />
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
