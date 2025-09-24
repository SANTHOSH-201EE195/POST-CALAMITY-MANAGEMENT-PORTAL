
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const NeedRegistrationFormPage = () => {
    const { user, submitApplication } = useAuth();
    const currentUser = user;
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        occurrenceDate: new Date().toISOString().split('T')[0],
        applicantName: `${currentUser.firstName} ${currentUser.lastName}`,
        birthDate: '',
        lossType: 'Stock loss',
        address: '',
        zipcode: '',
        state: '',
        aadhar: '',
        proofs: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if(e.target.files && e.target.files.length > 0) {
            setFormData({...formData, proofs: e.target.files[0].name})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const success = await submitApplication(formData);
        if (success) {
            setMessage('Application submitted successfully!');
            // Reset form if needed
        } else {
            setMessage('Failed to submit application.');
        }
    };


    return (
        <DashboardLayout pageTitle="Need Registration Form">
             <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Need Registration Form</h2>
                {message && <p className="mb-4 text-green-600 bg-green-100 p-3 rounded">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Date of Occurence*</label>
                        <input name="occurrenceDate" type="date" value={formData.occurrenceDate} onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-red-600 mb-4">PRIMARY DETAILS</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Name of Applicant*</label>
                                <input name="applicantName" type="text" value={formData.applicantName} disabled className="w-full p-2.5 bg-gray-100 border border-gray-300 text-gray-500 rounded-lg cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth*</label>
                                <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Type of loss*</label>
                                <select name="lossType" value={formData.lossType} onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Stock loss</option>
                                    <option>Property damage</option>
                                    <option>Crop loss</option>
                                    <option>Vehicle damage</option>
                                    <option>Business interruption</option>
                                </select>
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Address*</label>
                                <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                            </div>
                             <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Zipcode*</label>
                                <input name="zipcode" type="text" value={formData.zipcode} onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">State*</label>
                                <input name="state" type="text" value={formData.state} onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Enter Adahar Number*</label>
                                <input name="aadhar" type="text" value={formData.aadhar} onChange={handleChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Proofs*</label>
                                <input name="proofs" type="file" onChange={handleFileChange} className="w-full p-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button type="submit" className="bg-[#E2A051] hover:bg-[#ca9045] text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors">ADD</button>
                    </div>
                </form>
             </div>
        </DashboardLayout>
    );
};

export default NeedRegistrationFormPage;
