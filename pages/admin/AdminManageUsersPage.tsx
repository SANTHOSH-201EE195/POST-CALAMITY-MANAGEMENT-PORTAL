
import React, { useState, useMemo } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { XCircleIcon } from '../../components/icons';

const UserDetailsModal = ({ isOpen, onClose, user, applications, onUpdateStatus }) => {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <header className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">User Details - {user.firstName} {user.lastName}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <XCircleIcon className="w-8 h-8" />
                    </button>
                </header>
                <main className="p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div><strong className="text-gray-600">User ID:</strong> {user.id}</div>
                        <div><strong className="text-gray-600">Mobile:</strong> {user.mobile}</div>
                        <div className="md:col-span-2"><strong className="text-gray-600">Address:</strong> {user.address}</div>
                        <div><strong className="text-gray-600">Registration Date:</strong> {new Date(user.registrationDate).toLocaleString()}</div>
                         <div><strong className="text-gray-600">Status:</strong> 
                            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {user.active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 border-t pt-4">Submitted Applications ({applications.length})</h3>
                    <div className="mt-4 overflow-x-auto">
                         <table className="min-w-full bg-white">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left py-2 px-3 text-sm font-semibold">App ID</th>
                                    <th className="text-left py-2 px-3 text-sm font-semibold">Loss Type</th>
                                    <th className="text-left py-2 px-3 text-sm font-semibold">Date</th>
                                    <th className="text-left py-2 px-3 text-sm font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.length > 0 ? applications.map(app => (
                                    <tr key={app.id} className="border-b">
                                        <td className="py-2 px-3">{app.id}</td>
                                        <td className="py-2 px-3">{app.lossType}</td>
                                        <td className="py-2 px-3">{new Date(app.submissionDate).toLocaleDateString()}</td>
                                        <td className="py-2 px-3">{app.status}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={4} className="text-center py-4">No applications found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
                <footer className="flex justify-end items-center p-4 border-t bg-gray-50 space-x-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Close</button>
                    {user.active ? (
                        <button onClick={() => onUpdateStatus(user.id, false)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Deactivate User</button>
                    ) : (
                        <button onClick={() => onUpdateStatus(user.id, true)} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Activate User</button>
                    )}
                </footer>
            </div>
        </div>
    );
};


const AdminManageUsersPage = () => {
    const { users, applications, updateUserStatus } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const filteredUsers = useMemo(() => 
        users.filter(user =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.mobile.includes(searchQuery)
    ), [users, searchQuery]);

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleUpdateStatus = async (userId, active) => {
        await updateUserStatus(userId, active);
        const updatedUser = users.find(u => u.id === userId);
        if (updatedUser) {
          setSelectedUser({ ...updatedUser, active });
        }
    };

    const userApplications = useMemo(() => 
        selectedUser ? applications.filter(app => app.userId === selectedUser.id) : [], 
    [applications, selectedUser]);
    
    return (
        <DashboardLayout pageTitle="Manage Users">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Users</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name or mobile..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">User ID</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Mobile No.</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Reg. Date</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4">{user.id}</td>
                                    <td className="py-3 px-4">{user.firstName} {user.lastName}</td>
                                    <td className="py-3 px-4">{user.mobile}</td>
                                    <td className="py-3 px-4">{new Date(user.registrationDate).toLocaleDateString()}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => handleViewDetails(user)} className="text-indigo-600 hover:text-indigo-900">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <UserDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                user={selectedUser}
                applications={userApplications}
                onUpdateStatus={handleUpdateStatus}
            />
        </DashboardLayout>
    );
};

export default AdminManageUsersPage;
