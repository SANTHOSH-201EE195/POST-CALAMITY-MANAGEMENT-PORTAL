
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { DonateIcon } from '../../components/icons';

const UserDonatePage = () => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
    const { addDonation, donations, user } = useAuth();
    const currentUser = user;

    const userDonations = donations.filter(d => d.userId === currentUser.id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage({ type: '', text: '' });

        const donationAmount = parseFloat(amount);
        if (isNaN(donationAmount) || donationAmount <= 0) {
            setStatusMessage({ type: 'error', text: 'Please enter a valid donation amount.' });
            return;
        }

        const success = await addDonation({ amount: donationAmount, message });
        if (success) {
            setStatusMessage({ type: 'success', text: 'Thank you for your generous donation!' });
            setAmount('');
            setMessage('');
        } else {
            setStatusMessage({ type: 'error', text: 'Failed to process donation. Please try again.' });
        }
    };

    return (
        <DashboardLayout pageTitle="Donate">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                <div className="text-center">
                    <DonateIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Make a Donation</h2>
                    <p className="text-gray-600 mb-8">Your contribution can make a difference in someone's life.</p>
                </div>
                
                {statusMessage.text && (
                    <div className={`mb-4 p-3 rounded text-center ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {statusMessage.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                            Amount (₹)
                        </label>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter amount"
                            required
                            min="1"
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Message (Optional)
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Leave a message of support..."
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-[#E2A051] hover:bg-[#ca9045] text-white font-bold py-3 px-10 rounded-full focus:outline-none focus:shadow-outline transition-colors text-lg"
                        >
                            Donate Now
                        </button>
                    </div>
                </form>

                {userDonations.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-t pt-8 text-center">Your Donation History</h3>
                        <div className="overflow-x-auto rounded-lg border">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Amount</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Message</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {userDonations.sort((a, b) => new Date(b.donationDate).getTime() - new Date(a.donationDate).getTime()).map(donation => (
                                        <tr key={donation.id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="py-3 px-4">{new Date(donation.donationDate).toLocaleString()}</td>
                                            <td className="py-3 px-4 font-semibold">₹{donation.amount.toLocaleString()}</td>
                                            <td className="py-3 px-4 italic">"{donation.message || 'N/A'}"</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default UserDonatePage;
