import React, { useState, useEffect } from 'react';
import { User, Mail, Briefcase, Plus, Search, Trash2, Copy, Check, Loader2, Key } from 'lucide-react';

const StudentManager = () => {
    const [students, setStudents] = useState([]);
    const [domains, setDomains] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // New Student Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        domainId: '',
        batch: '',
        password: ''
    });

    // Credential Modal State (After success)
    const [newCredentials, setNewCredentials] = useState(null);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchData();
        fetchDomains();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/v1/students/all', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) setStudents(data.students);
        } catch (error) {
            console.error("Failed to fetch students");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDomains = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/v1/domains', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) setDomains(data.domains);
        } catch (error) {
            console.error("Failed to fetch domains");
        }
    };

    const generatePassword = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let password = "";
        for (let i = 0; i < 10; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData({ ...formData, password });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/api/v1/students/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                // Success: Show Credentials Modal
                setNewCredentials({
                    email: formData.email,
                    password: formData.password
                });

                // Refresh list and close form
                fetchData();
                setShowForm(false);
                setFormData({ name: '', email: '', domainId: '', batch: '', password: '' });
                alert("Intern Created Successfully!");
            } else {
                alert(data.message || "Failed to create intern");
            }
        } catch (error) {
            console.error("Error creating student:", error);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center px-1">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Intern Management</h2>
                    <p className="text-sm text-slate-500">Create accounts and generate login credentials.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-medium shadow-sm"
                >
                    <Plus size={18} />
                    Add New Intern
                </button>
            </div>

            {/* Credential Success Modal */}
            {newCredentials && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in zoom-in-95 duration-200">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Key className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Intern Credentials Generated</h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Copy these details and send them to the intern via email.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3 mb-6">
                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="font-mono text-slate-800 text-sm">{newCredentials.email}</span>
                                    <button onClick={() => copyToClipboard(newCredentials.email)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition-colors"><Copy size={14} /></button>
                                </div>
                            </div>
                            <div className="border-t border-slate-200 pt-3">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="font-mono text-slate-800 text-sm font-bold">{newCredentials.password}</span>
                                    <button onClick={() => copyToClipboard(newCredentials.password)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition-colors"><Copy size={14} /></button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-amber-50 p-3 rounded-lg flex gap-2 mb-6">
                            <span className="text-amber-600">⚠️</span>
                            <p className="text-xs text-amber-700 leading-relaxed">
                                This password will not be shown again. The intern will be asked to change it upon first login.
                            </p>
                        </div>

                        <button
                            onClick={() => setNewCredentials(null)}
                            className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                        >
                            Done, I've Saved It
                        </button>
                    </div>
                </div>
            )}

            {/* Add Form */}
            {showForm && (
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-4">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <User size={18} className="text-slate-400" /> New Intern Details
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                                    placeholder="e.g. John Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                                    placeholder="e.g. john@university.edu"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Domain</label>
                                <select
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none bg-white"
                                    value={formData.domainId}
                                    onChange={e => setFormData({ ...formData, domainId: e.target.value })}
                                >
                                    <option value="">Select Domain...</option>
                                    {domains.map(d => (
                                        <option key={d._id} value={d._id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Batch / Cohort</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                                    placeholder="e.g. Winter-2024"
                                    value={formData.batch}
                                    onChange={e => setFormData({ ...formData, batch: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Temporary Password</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    required
                                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none font-mono"
                                    placeholder="Generate or type..."
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    autoComplete="off"
                                />
                                <button
                                    type="button"
                                    onClick={generatePassword}
                                    className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
                                >
                                    Auto-Generate
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
                            >
                                Create Intern Account
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Student List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {isLoading ? (
                    <div className="p-12 flex justify-center text-slate-500">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Domain</th>
                                    <th className="p-4">Batch</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {students.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-slate-400 italic">No interns found. Create one to get started.</td>
                                    </tr>
                                ) : students.map(student => (
                                    <tr key={student._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 font-medium text-slate-900">{student.name}</td>
                                        <td className="p-4 text-slate-500 text-sm">{student.email}</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                {student.domain?.name || 'Unassigned'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-500 text-sm">{student.batch || '-'}</td>
                                        <td className="p-4">
                                            {student.isFirstLogin ? (
                                                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">Pending Login</span>
                                            ) : (
                                                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">Active</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentManager;
