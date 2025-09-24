
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import { useAuth } from '../../context/AuthContext';

const AdminLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      const success = await login({ username, password }, 'admin');
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password.');
      }
    };

    return (
        <AuthLayout title="Admin Login" subtitle="Welcome to Admin panel!">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign in</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                User Name:
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                placeholder="password"
                required
              />
            </div>
            <div className="mb-6 flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-600">
                    <input className="mr-2 leading-tight" type="checkbox" />
                    <span className="text-sm">Remember me</span>
                </label>
                 <Link to="/admin-reset-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                    Reset password
                </Link>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-[#E2A051] hover:bg-[#ca9045] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>
        </AuthLayout>
    );
};

export default AdminLoginPage;
