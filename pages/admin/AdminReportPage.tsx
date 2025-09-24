
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const AdminReportPage = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [activeTab, setActiveTab] = useState('applications');
    const { applications, donations } = useAuth();

    const downloadApplicationsCSV = (data, filename) => {
        if (data.length === 0) {
            alert('No data available for the selected criteria.');
            return;
        }

        const headers = [
            'ID', 'User ID', 'Applicant Name', 'Occurrence Date', 'Birth Date', 
            'Loss Type', 'Address', 'Zipcode', 'State', 'Aadhar', 
            'Proofs', 'Submission Date', 'Status', 'Remark'
        ];
        
        const csvRows = [
            headers.join(','),
            ...data.map(app => [
                `"${app.id}"`, `"${app.userId}"`, `"${app.applicantName}"`, `"${app.occurrenceDate}"`, `"${app.birthDate}"`,
                `"${app.lossType}"`, `"${app.address.replace(/"/g, '""')}"`, `"${app.zipcode}"`, `"${app.state}"`, `"${app.aadhar}"`,
                `"${app.proofs}"`, `"${new Date(app.submissionDate).toLocaleString()}"`, `"${app.status}"`, `"${(app.remark || '').replace(/"/g, '""')}"`
            ].join(','))
        ];

        triggerDownload(csvRows, filename);
    };

    const downloadDonationsCSV = (data, filename) => {
        if (data.length === 0) {
            alert('No data available for the selected criteria.');
            return;
        }

        const headers = ['ID', 'User ID', 'Donor Name', 'Amount (₹)', 'Donation Date', 'Message'];
        
        const csvRows = [
            headers.join(','),
            ...data.map(d => [
                `"${d.id}"`, `"${d.userId}"`, `"${d.userName}"`, `"${d.amount}"`,
                `"${new Date(d.donationDate).toLocaleString()}"`, `"${(d.message || '').replace(/"/g, '""')}"`
            ].join(','))
        ];

        triggerDownload(csvRows, filename);
    };
    
    const triggerDownload = (csvRows, filename) => {
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const startDate = fromDate ? new Date(fromDate) : null;
        if(startDate) startDate.setHours(0, 0, 0, 0);

        const endDate = toDate ? new Date(toDate) : null;
        if(endDate) endDate.setHours(23, 59, 59, 999);
        
        if (activeTab === 'applications') {
            let filteredApps = applications;
            if (startDate && endDate) {
                filteredApps = applications.filter(app => {
                    const submissionDate = new Date(app.submissionDate);
                    return submissionDate >= startDate && submissionDate <= endDate;
                });
            }
            downloadApplicationsCSV(filteredApps, `applications-report_${fromDate}_to_${toDate}.csv`);
        } else {
            let filteredDonations = donations;
            if (startDate && endDate) {
                filteredDonations = donations.filter(d => {
                    const donationDate = new Date(d.donationDate);
                    return donationDate >= startDate && donationDate <= endDate;
                });
            }
            downloadDonationsCSV(filteredDonations, `donations-report_${fromDate}_to_${toDate}.csv`);
        }
    };

    return (
        <DashboardLayout pageTitle="Generate Reports">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">GENERATE REPORTS</h2>
                
                <div className="flex border-b mb-6">
                    <button 
                        onClick={() => setActiveTab('applications')}
                        className={`py-2 px-6 font-semibold text-lg flex-1 text-center transition-colors duration-300 ${activeTab === 'applications' ? 'border-b-4 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                    >
                        Applications Report
                    </button>
                    <button 
                        onClick={() => setActiveTab('donations')}
                        className={`py-2 px-6 font-semibold text-lg flex-1 text-center transition-colors duration-300 ${activeTab === 'donations' ? 'border-b-4 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                    >
                        Donations Report
                    </button>
                </div>

                <p className="text-gray-600 mb-6 text-center">
                    Select a date range to generate a report. If no dates are selected, a full report of all {activeTab} will be generated.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromDate">From Date</label>
                        <input
                            id="fromDate"
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toDate">To Date</label>
                        <input
                            id="toDate"
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-[#E2A051] hover:bg-[#ca9045] text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline transition-colors"
                        >
                            Generate Report
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default AdminReportPage;
