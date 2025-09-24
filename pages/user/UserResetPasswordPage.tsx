
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';

const UserResetPasswordPage = () => {
    const [mobile, setMobile] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        // Mock password reset logic
        console.log(`Password reset requested for mobile: ${mobile}`);
        setMessage('If a user with this mobile exists, a password reset link has been sent.');
        setMobile('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <AuthLayout title="Reset Password" subtitle="Recover your user account">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">RESET YOUR PASSWORD</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {message && <p className="text-green-500 mb-4">{message}</p>}
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
                        placeholder="Your registered mobile number"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                        New Password:
                    </label>
                    <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="New Password"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm New Password:
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        placeholder="Confirm New Password"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="w-full bg-[#E2A051] hover:bg-[#ca9045] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                    >
                        Reset Password
                    </button>
                </div>
                <p className="text-center mt-6">
                    <Link to="/login" className="font-bold text-sm text-blue-500 hover:text-blue-800">
                        Back to Login
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default UserResetPasswordPage;
