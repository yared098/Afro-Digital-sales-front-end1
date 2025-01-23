

// import React, { useState } from 'react';
// import { signInWithEmailAndPasswordCustom, signInWithProvider } from '../services/auth/authService'; // Use the correct function names
// import { useNavigate } from 'react-router-dom';
// import { FaGoogle, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPasswordCustom(email, password); // Corrected function name
//       navigate('/dashboard'); // Redirect to dashboard or homepage after login
//     } catch (error) {
//       setError('Error logging in. Please try again.');
//     }
//   };

//   const handleProviderLogin = async (provider) => {
//     try {
//       await signInWithProvider(provider);
//       navigate('/dashboard'); // Redirect to dashboard after successful login
//     } catch (error) {
//       setError(`Error logging in with ${provider}. Please try again.`);
//     }
//   };

//   return (
//     <div className="bg-white w-full min-h-screen flex justify-center items-center">
//       <div className="w-full max-w-md p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-xl">
//         <h2 className="text-3xl font-semibold text-center text-gray-800">Login</h2>
//         <form onSubmit={handleLogin} className="mt-8 space-y-4">
//           <div className="flex flex-col">
//             <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button type="submit" className="w-full p-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600">
//             Login
//           </button>
//         </form>
//         <div className="mt-6">
//           <p className="text-center mb-4 text-sm text-gray-600">Or login with</p>
//           <div className="flex justify-center space-x-4 mt-4">
//             <button
//               onClick={() => handleProviderLogin('google')}
//               className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
//             >
//               <FaGoogle size={24} />
//             </button>
//             <button
//               onClick={() => handleProviderLogin('facebook')}
//               className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
//             >
//               <FaFacebook size={24} />
//             </button>
//             <button
//               onClick={() => handleProviderLogin('twitter')}
//               className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition"
//             >
//               <FaTwitter size={24} />
//             </button>
//             <button
//               onClick={() => handleProviderLogin('instagram')}
//               className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
//             >
//               <FaInstagram size={24} />
//             </button>
//           </div>
//         </div>
//         <p className="mt-6 text-center text-sm text-gray-600">
//           Don't have an account?{' '}
//           <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { signInWithEmailAndPasswordCustom, signInWithProvider } from '../services/auth/authService'; // Correct function names
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading indicator
    setError(''); // Reset error message
    try {
      await signInWithEmailAndPasswordCustom(email, password); // Corrected function name
      navigate('/dashboard'); // Redirect to dashboard or homepage after login
    } catch (error) {
      setError('Error logging in. Please try again.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleProviderLogin = async (provider) => {
    setLoading(true); // Show loading indicator
    setError(''); // Reset error message
    try {
      await signInWithProvider(provider);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      setError(`Error logging in with ${provider}. Please try again.`);
    } finally {
      setLoading(false); // Hide loading indicator
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
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 flex items-center justify-center"
            disabled={loading} // Disable button during loading
          >
            {loading ? (
              <svg
                className="w-5 h-5 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className="mt-6">
          <p className="text-center mb-4 text-sm text-gray-600">Or login with</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => handleProviderLogin('google')}
              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              disabled={loading} // Disable during loading
            >
              <FaGoogle size={24} />
            </button>
            <button
              onClick={() => handleProviderLogin('facebook')}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              disabled={loading} // Disable during loading
            >
              <FaFacebook size={24} />
            </button>
            <button
              onClick={() => handleProviderLogin('twitter')}
              className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition"
              disabled={loading} // Disable during loading
            >
              <FaTwitter size={24} />
            </button>
            <button
              onClick={() => handleProviderLogin('instagram')}
              className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
              disabled={loading} // Disable during loading
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

