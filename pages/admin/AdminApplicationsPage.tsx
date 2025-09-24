
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import ApplicationDetailsModal from '../../components/ApplicationDetailsModal';

const AdminApplicationsPage = () => {
    const { status } = useParams();
    const { applications, updateApplicationStatus } = useAuth();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);

    const filteredApps = status === 'all' 
        ? applications 
        : applications.filter(app => app.status.toLowerCase() === status?.toLowerCase());

    const title = status ? `${status.charAt(0).toUpperCase() + status.slice(1)} Applications` : 'All Applications';

    const handleViewDetails = (app) => {
        setSelectedApp(app);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedApp(null);
    };

    const handleApprove = async (appId) => {
        await updateApplicationStatus(appId, 'Verified', 'Verified by Admin');
        handleCloseModal();
    };

    const handleReject = async (appId, remark) => {
        await updateApplicationStatus(appId, 'Rejected', remark);
        handleCloseModal();
    };

    return (
        <DashboardLayout pageTitle={title}>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">App ID</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Applicant Name</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Submission Date</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Loss Type</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filteredApps.map(app => (
                                <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4">{app.id}</td>
                                    <td className="py-3 px-4">{app.applicantName}</td>
                                    <td className="py-3 px-4">{new Date(app.submissionDate).toLocaleDateString()}</td>
                                    <td className="py-3 px-4">{app.lossType}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            app.status === 'Verified' ? 'bg-green-100 text-green-800' :
                                            app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => handleViewDetails(app)} className="text-indigo-600 hover:text-indigo-900">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ApplicationDetailsModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                application={selectedApp}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </DashboardLayout>
    );
};

export default AdminApplicationsPage;
