// src/pages/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPasswordCustom } from '../services/auth/authService'; // Use the correct function name
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPasswordCustom(email, password);  // Corrected function name
      navigate('/dashboard');  // Redirect to dashboard or homepage after login
    } catch (error) {
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20">
      <h2 className="text-3xl font-bold text-center">Login</h2>
      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
