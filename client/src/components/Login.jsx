import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F7F4F1]">
      <div className="w-96 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <p className="text-center text-gray-500 mb-6">
            Hey, enter your details to get signed into your account.
          </p>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <input
                type="text"
                placeholder="Enter Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Passcode"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-right text-orange-500">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-400 text-black font-semibold py-2 rounded-md hover:bg-orange-500 transition-colors"
            >
              Sign in
            </button>
          </form>
          <div className="mt-6 text-center">
            <div className="text-gray-500">— Or Sign in with —</div>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="http://localhost:5000/api/auth/facebook" className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white">
                <FaFacebook className="text-lg" />
              </a>
              <a href="http://localhost:5000/api/auth/google" className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white">
                <FaGoogle className="text-lg" />
              </a>
              <a href="http://localhost:5000/api/auth/github" className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white">
                <FaGithub className="text-lg" />
              </a>
            </div>
            <div className="mt-6 text-gray-500">
              Don't have an account? <a href="/signup" className="text-orange-500">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
