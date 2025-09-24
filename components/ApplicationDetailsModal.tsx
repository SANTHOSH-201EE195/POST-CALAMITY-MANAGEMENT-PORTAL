
import React, { useState, useEffect } from 'react';
import { XCircleIcon } from './icons';

// FIX: Add types for component props.
const ApplicationDetailsModal = ({ isOpen, onClose, application, onApprove, onReject }: {
    isOpen: boolean;
    onClose: () => void;
    application: any | null;
    onApprove: (id: string) => void;
    onReject: (id: string, remark: string) => void;
}) => {
    const [remark, setRemark] = useState('');

    useEffect(() => {
        if (application) {
            setRemark(application.remark || '');
        }
    }, [application]);

    if (!isOpen || !application) return null;
    
    const handleReject = () => {
        if (!remark.trim()) {
            alert('A remark is required to reject the application.');
            return;
        }
        onReject(application.id, remark);
    };

    const handleApprove = () => {
        onApprove(application.id);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <header className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Application Details - {application.id}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <XCircleIcon className="w-8 h-8"/>
                    </button>
                </header>

                <main className="p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <DetailItem label="Applicant Name" value={application.applicantName} />
                        <DetailItem label="Status" value={application.status} isBadge={true} />
                        <DetailItem label="Date of Occurrence" value={new Date(application.occurrenceDate).toLocaleDateString()} />
                        <DetailItem label="Date of Birth" value={new Date(application.birthDate).toLocaleDateString()} />
                        <DetailItem label="Type of Loss" value={application.lossType} />
                        <DetailItem label="Aadhar Number" value={application.aadhar} />
                        <DetailItem label="State" value={application.state} />
                        <DetailItem label="Zipcode" value={application.zipcode} />
                        <div className="md:col-span-2">
                             <DetailItem label="Address" value={application.address} />
                        </div>
                        <div className="md:col-span-2">
                            <DetailItem label="Proofs" value={application.proofs} isLink={true} />
                        </div>
                        <DetailItem label="Submission Date" value={new Date(application.submissionDate).toLocaleString()} />
                    </div>
                     
                    {application.status === 'New' && (
                        <div className="mt-6 border-t pt-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Admin Action</h3>
                            <div>
                                <label htmlFor="remark" className="block text-sm font-medium text-gray-700">Remark</label>
                                <textarea
                                    id="remark"
                                    rows={3}
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                    className="mt-1 block w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Add a remark (required for rejection)..."
                                />
                            </div>
                        </div>
                    )}
                </main>
                
                {application.status === 'New' && (
                    <footer className="flex justify-end items-center p-4 border-t bg-gray-50 rounded-b-lg space-x-3">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">Cancel</button>
                        <button onClick={handleReject} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">Reject</button>
                        <button onClick={handleApprove} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">Approve</button>
                    </footer>
                )}
            </div>
            <style>{`
                @keyframes fade-in-scale {
                    0% {
                        transform: scale(0.95);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

// FIX: Add types for props and make isBadge and isLink optional.
const DetailItem = ({ label, value, isBadge, isLink }: { label: string; value: any; isBadge?: boolean; isLink?: boolean }) => (
    <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {isBadge ? (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                value === 'Verified' ? 'bg-green-100 text-green-800' :
                value === 'Rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
            }`}>
                {value}
            </span>
        ) : isLink ? (
             <a href="#" className="text-indigo-600 hover:underline">{value}</a>
        ) : (
            <p className="mt-1 text-md text-gray-900">{value}</p>
        )}
    </div>
);

export default ApplicationDetailsModal;
