
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import { useAuth } from '../../context/AuthContext';

const AdminDonationsPage = () => {
    const { donations } = useAuth();
    
    const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);

    const generateChartData = () => {
        if (donations.length === 0) return Array(7).fill({ name: '', value: 0 });
        const sortedDonations = [...donations].sort((a, b) => new Date(a.donationDate).getTime() - new Date(b.donationDate).getTime());
        return sortedDonations.slice(-7).map((d, i) => ({ name: `Don. ${i + 1}`, value: d.amount }));
    };

    return (
        <DashboardLayout pageTitle="Incoming Donations">
            <div className="mb-6">
                <StatCard 
                    title="TOTAL Donations Received"
                    value={`₹${totalDonations.toLocaleString()}`}
                    color="purple"
                    chartData={generateChartData()}
                />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Donations</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Donation ID</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Donor Name</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Amount</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Message</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {donations.length > 0 ? donations.map(donation => (
                                <tr key={donation.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4">{donation.id}</td>
                                    <td className="py-3 px-4">{donation.userName}</td>
                                    <td className="py-3 px-4 font-semibold">₹{donation.amount.toLocaleString()}</td>
                                    <td className="py-3 px-4">{new Date(donation.donationDate).toLocaleString()}</td>
                                    <td className="py-3 px-4 italic">"{donation.message || 'N/A'}"</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-10">
                                        <p className="text-gray-500">No donations have been received yet.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDonationsPage;
