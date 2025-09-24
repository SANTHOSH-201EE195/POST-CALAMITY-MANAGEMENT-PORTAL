
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '../../components/icons';

const StatusBadge = ({ status }) => {
    const baseClasses = "flex items-center space-x-2 text-sm font-semibold px-3 py-1 rounded-full";
    if (status === 'Verified') {
        return <span className={`${baseClasses} bg-green-100 text-green-700`}><CheckCircleIcon /><span>Verified</span></span>
    }
    if (status === 'Rejected') {
        return <span className={`${baseClasses} bg-red-100 text-red-700`}><XCircleIcon /><span>Rejected</span></span>
    }
    return <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}><ExclamationCircleIcon /><span>New</span></span>
};

const ViewApplicationPage = () => {
    const { applications, user } = useAuth();
    const userApplications = applications.filter(app => app.userId === user.id);

    return (
        <DashboardLayout pageTitle="View Applications">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Submitted Applications</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Application ID</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Submission Date</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Loss Type</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Remark</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {userApplications.length > 0 ? userApplications.map(app => (
                                <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4">{app.id}</td>
                                    <td className="py-3 px-4">{new Date(app.submissionDate).toLocaleDateString()}</td>
                                    <td className="py-3 px-4">{app.lossType}</td>
                                    <td className="py-3 px-4"><StatusBadge status={app.status}/></td>
                                    <td className="py-3 px-4">{app.remark || 'N/A'}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-6">You have not submitted any applications.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ViewApplicationPage;
