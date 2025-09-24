
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import ApplicationDetailsModal from '../../components/ApplicationDetailsModal';
import { SearchIcon } from '../../components/icons';

const AdminSearchPage = () => {
    const { applications, updateApplicationStatus } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('applicantName');
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearched(true);
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const lowercasedQuery = searchQuery.toLowerCase();
        const results = applications.filter(app => {
            if (searchBy === 'applicantName') {
                return app.applicantName.toLowerCase().includes(lowercasedQuery);
            }
            if (searchBy === 'appId') {
                return app.id.toLowerCase().includes(lowercasedQuery);
            }
            if (searchBy === 'aadhar') {
                return app.aadhar.includes(searchQuery);
            }
            return false;
        });
        setSearchResults(results);
    };

    const handleViewDetails = (app) => {
        setSelectedApp(app);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedApp(null);
        // Re-run search to reflect updated status in results
        if(searchQuery.trim()){
            const e = { preventDefault: () => {} };
            handleSearch(e);
        }
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
        <DashboardLayout pageTitle="Search Applications">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Search for Applications</h2>
                <form onSubmit={handleSearch}>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-grow">
                            <label htmlFor="searchQuery" className="sr-only">Search</label>
                            <input
                                id="searchQuery"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={`Search by ${searchBy.replace('applicantName', 'Applicant Name').replace('appId', 'Application ID').replace('aadhar', 'Aadhar Number')}...`}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#E2A051] hover:bg-[#ca9045] text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors flex items-center justify-center"
                        >
                            <SearchIcon className="w-5 h-5 mr-2" />
                            Search
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-6 mb-8 text-gray-600">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="radio" name="searchBy" value="applicantName" checked={searchBy === 'applicantName'} onChange={() => setSearchBy('applicantName')} className="form-radio text-blue-600" />
                            <span>Applicant Name</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="radio" name="searchBy" value="appId" checked={searchBy === 'appId'} onChange={() => setSearchBy('appId')} className="form-radio text-blue-600" />
                            <span>Application ID</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="radio" name="searchBy" value="aadhar" checked={searchBy === 'aadhar'} onChange={() => setSearchBy('aadhar')} className="form-radio text-blue-600" />
                            <span>Aadhar Number</span>
                        </label>
                    </div>
                </form>

                {searched && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Search Results ({searchResults.length})</h3>
                        {searchResults.length > 0 ? (
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
                                        {searchResults.map(app => (
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
                        ) : (
                            <div className="text-center py-10 px-6 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No applications found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                )}
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

export default AdminSearchPage;
