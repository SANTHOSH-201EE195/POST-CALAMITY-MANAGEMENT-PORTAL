
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import { useAuth } from '../../context/AuthContext';

const UserLoginPage = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await login({ mobile, password }, 'user');
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid mobile number or password, or user is inactive.');
    }
  };

  return (
    <AuthLayout title="User Login" subtitle="Welcome to User panel!">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">SIGN IN</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
            Mobile Number:
          </label>
          <input
            id="mobile"
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mobile Number"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            placeholder="Password"
            required
          />
        </div>
        <Link to="/reset-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mb-6">
            Reset password
        </Link>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-[#E2A051] hover:bg-[#ca9045] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
          >
            Sign In
          </button>
        </div>
        <p className="text-center mt-6">
            <Link to="/register" className="font-bold text-sm text-blue-500 hover:text-blue-800">
                Click here for registration
            </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default UserLoginPage;
