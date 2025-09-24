
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const UserProfilePage = () => {
    const { user, updateUser } = useAuth();
    const currentUser = user;
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        mobile: currentUser.mobile,
        address: currentUser.address,
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await updateUser(formData);
        if (success) {
            setMessage('Profile updated successfully!');
        } else {
            setMessage('Failed to update profile.');
        }
    };

    return (
        <DashboardLayout pageTitle="User Profile">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">USER PROFILE</h2>
                {message && <p className="mb-4 text-green-600 bg-green-100 p-3 rounded">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name*</label>
                            <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name*</label>
                            <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                         <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">Mobile Number*</label>
                            <input id="mobile" name="mobile" type="text" value={formData.mobile} onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationDate">Registration Date*</label>
                            <input id="registrationDate" type="text" value={new Date(currentUser.registrationDate).toLocaleString()} disabled className="w-full p-2.5 bg-gray-100 border border-gray-300 text-gray-500 rounded-lg cursor-not-allowed" />
                        </div>
                        <div className="md:col-span-2">
                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address*</label>
                             <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={4} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button type="submit" className="bg-[#E2A051] hover:bg-[#ca9045] text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors">Update</button>
                    </div>
                </form>
                <div className="text-center mt-6 text-sm text-gray-500">
                    Post Calamity Management Portal
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserProfilePage;
