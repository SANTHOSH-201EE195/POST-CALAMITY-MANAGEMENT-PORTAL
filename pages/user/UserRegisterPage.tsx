
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import { useAuth } from '../../context/AuthContext';

const UserRegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        address: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const success = await register(formData);
        if (success) {
            navigate('/dashboard');
        } else {
            setError('This mobile number is already registered.');
        }
    };

  return (
    <AuthLayout title="User Sign Up" subtitle="Welcome User!">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">User Registration</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name:</label>
          <input id="firstName" name="firstName" type="text" onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="First Name" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name:</label>
          <input id="lastName" name="lastName" type="text" onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Last Name" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">Mobile Number:</label>
          <input id="mobile" name="mobile" type="text" onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Mobile Number" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address:</label>
          <input id="address" name="address" type="text" onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Address" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" required />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="w-full bg-[#E2A051] hover:bg-[#ca9045] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">Sign Up</button>
        </div>
         <p className="text-center mt-6">
            <Link to="/login" className="font-bold text-sm text-blue-500 hover:text-blue-800">
                Do you have an account? || signin
            </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default UserRegisterPage;
