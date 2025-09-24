
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import { useAuth } from '../../context/AuthContext';

const generateChartData = () => Array.from({ length: 7 }, (_, i) => ({ name: `Day ${i + 1}`, value: Math.floor(Math.random() * 50) + 10 }));

const AdminDashboardPage = () => {
    const { applications, donations } = useAuth();

    const newApps = applications.filter(app => app.status === 'New').length;
    const verifiedApps = applications.filter(app => app.status === 'Verified').length;
    const rejectedApps = applications.filter(app => app.status === 'Rejected').length;
    const totalApps = applications.length;
    const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);

    return (
        <DashboardLayout pageTitle="Dashboard">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <StatCard 
                    title="TOTAL New Application"
                    value={newApps}
                    color="orange"
                    chartData={generateChartData()}
                />
                 <StatCard 
                    title="TOTAL Verified Application"
                    value={verifiedApps}
                    color="cyan"
                    chartData={generateChartData()}
                />
                 <StatCard 
                    title="TOTAL Rejected Application"
                    value={rejectedApps}
                    color="green"
                    chartData={generateChartData()}
                />
                 <StatCard 
                    title="TOTAL Total Application"
                    value={totalApps}
                    color="gray"
                    chartData={generateChartData()}
                />
                <StatCard 
                    title="TOTAL Donations Received"
                    value={`₹${totalDonations.toLocaleString()}`}
                    color="purple"
                    chartData={generateChartData()}
                />
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboardPage;
