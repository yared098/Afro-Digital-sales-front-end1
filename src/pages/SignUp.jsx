import React, { useState } from 'react';
import { signUpWithEmailAndPassword } from '../services/auth/authService'; // Make sure this is correct
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmailAndPassword(email, password);
      navigate('/login');  // Redirect to login after successful sign-up
    } catch (error) {
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20">
      <h2 className="text-3xl font-bold text-center">Sign Up</h2>
      <form onSubmit={handleSignUp} className="mt-6 space-y-4">
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
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <a href="/login" className="text-blue-500">Login</a>
      </p>
    </div>
  );
};

export default SignUp;
