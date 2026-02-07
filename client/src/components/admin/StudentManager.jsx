import React, { useState, useEffect, useMemo } from 'react';
import { User, Mail, Briefcase, Plus, Search, Trash2, Copy, Check, Loader2, Key, Users, School, RefreshCw, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const StudentManager = () => {
    // Data States
    const [students, setStudents] = useState([]);
    const [domains, setDomains] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // UI States
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'form'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('All');
    const [showPassword, setShowPassword] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        domainId: '',
        batch: '',
        password: ''
    });

    // Credential Modal State
    const [generatedCredentials, setGeneratedCredentials] = useState(null);

    // Derived Data
    const uniqueBatches = useMemo(() => {
        const batches = students.map(s => s.batch).filter(Boolean);
        return [...new Set(batches)].sort();
    }, [students]);

    const filteredStudents = useMemo(() => {
        return students.filter(student => {
            const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesBatch = selectedBatch === 'All' || student.batch === selectedBatch;
            return matchesSearch && matchesBatch;
        });
    }, [students, searchTerm, selectedBatch]);

    useEffect(() => {
        fetchData();
        fetchDomains();
    }, []);

    const fetchData = async () => {
        try {
            const res = await api.get('/students/all');
            setStudents(res.data.students || []);
        } catch (error) {
            console.error("Failed to fetch students", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Clear potential intern session conflicts on mount
    useEffect(() => {
        localStorage.removeItem('intern_user');
        // If we were storing intern token separately, clear it too.
        // This ensures only the Admin 'accessToken' is active.
    }, []);

    const fetchDomains = async () => {
        try {
            const res = await api.get('/domains');
            // Handle both legacy (array) and new (object) API responses for robustness
            const domainList = Array.isArray(res.data) ? res.data : (res.data.domains || []);
            setDomains(domainList);
        } catch (error) {
            console.error("Failed to fetch domains", error);
        }
    };

    const generatePassword = () => {
        const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowers = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const special = "!@#$%^&*";
        const chars = uppers + lowers + numbers + special;

        let password = "";
        // Ensure at least one of each type
        password += uppers.charAt(Math.floor(Math.random() * uppers.length));
        password += lowers.charAt(Math.floor(Math.random() * lowers.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += special.charAt(Math.floor(Math.random() * special.length));

        for (let i = 0; i < 8; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Shuffle
        password = password.split('').sort(() => 0.5 - Math.random()).join('');
        setFormData(prev => ({ ...prev, password }));
    };

    const handleOpenForm = () => {
        setFormData({
            name: '',
            email: '',
            domainId: '',
            batch: '',
            password: ''
        });
        generatePassword();
        setViewMode('form');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await api.post('/students/create', formData);

            // Success: Store credentials to show to admin
            setGeneratedCredentials({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                domain: domains.find(d => d._id === formData.domainId)?.name,
                batch: formData.batch
            });

            // Refresh list and close form
            await fetchData();
            setViewMode('list');
        } catch (error) {
            console.error("Error creating student:", error);
            alert(error.response?.data?.message || "Failed to create intern account. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) return;
        try {
            await api.delete(`/students/${id}`);
            setStudents(prev => prev.filter(s => s._id !== id));
        } catch (error) {
            console.error("Delete failed", error);
            alert("Failed to delete student");
        }
    };

    const copyCredentials = () => {
        const text = `
Welcome to VelSphere Technologies!

Here are your login credentials:
URL: ${window.location.origin}/intern/login
Email: ${generatedCredentials.email}
Password: ${generatedCredentials.password}

Please log in and change your password immediately.
        `.trim();

        navigator.clipboard.writeText(text);
        alert("Credentials copied to clipboard!");
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <p>Loading Intern Data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Users className="text-blue-600" />
                        Intern Management
                    </h2>
                    <p className="text-slate-500 mt-1">Manage intern accounts, domains, and credentials.</p>
                </div>

                {!generatedCredentials && viewMode === 'list' && (
                    <button
                        onClick={handleOpenForm}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md font-medium"
                    >
                        <Plus size={18} />
                        Add New Intern
                    </button>
                )}
            </div>

            {/* Credential Success Card */}
            {generatedCredentials && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 relative overflow-hidden animate-in slide-in-from-top-4 shadow-lg">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ShieldCheck size={120} className="text-green-600" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Check size={24} className="text-green-600 font-bold" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-green-900">Intern Account Created Successfully!</h3>
                                <p className="text-green-700 text-sm">The temporary password has been set. Share these details securely.</p>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-green-100 p-5 grid md:grid-cols-2 gap-6 shadow-sm">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Intern Name</label>
                                    <div className="font-medium text-slate-900">{generatedCredentials.name}</div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email (Login ID)</label>
                                    <div className="font-mono text-slate-900 bg-slate-50 px-2 py-1 rounded inline-block mt-1 border border-slate-200">
                                        {generatedCredentials.email}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Temporary Password</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="font-mono text-xl font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-100 tracking-wide">
                                            {generatedCredentials.password}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm text-slate-500 flex items-center gap-1.5 bg-slate-50 p-2 rounded">
                                    <AlertCircle size={14} className="text-amber-500" />
                                    Intern must change this on first login.
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={copyCredentials}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg font-medium transition-colors shadow-sm"
                            >
                                <Copy size={16} />
                                Copy Credentials
                            </button>
                            <button
                                onClick={() => setGeneratedCredentials(null)}
                                className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg font-medium transition-colors shadow-sm"
                            >
                                Done & Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Creation Form */}
            {viewMode === 'form' && !generatedCredentials && (
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <User size={20} className="text-blue-500" />
                            Create New Intern Profile
                        </h3>
                        <button onClick={() => setViewMode('list')} className="text-slate-400 hover:text-slate-600">
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                        {/* Personal Info */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Personal Information</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
                                        <input
                                            type="email"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Program Info */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Internship Details</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Assigned Domain <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-2.5 text-slate-400" size={18} />
                                        <select
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all appearance-none"
                                            value={formData.domainId}
                                            onChange={e => setFormData({ ...formData, domainId: e.target.value })}
                                        >
                                            <option value="">Select Domain...</option>
                                            {domains.map(d => (
                                                <option key={d._id} value={d._id}>{d.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Batch / Cohort</label>
                                    <div className="relative">
                                        <School className="absolute left-3 top-2.5 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            list="batches"
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                                            placeholder="e.g. Winter-2024"
                                            value={formData.batch}
                                            onChange={e => setFormData({ ...formData, batch: e.target.value })}
                                        />
                                        <datalist id="batches">
                                            {uniqueBatches.map(b => (
                                                <option key={b} value={b} />
                                            ))}
                                        </datalist>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1 pl-1">Select from existing or type a new batch ID.</p>
                                </div>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Security</h4>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Temporary Password <span className="text-red-500">*</span></label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Key className="absolute left-3 top-2.5 text-slate-400" size={18} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            readOnly
                                            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-600 focus:outline-none cursor-not-allowed"
                                            value={formData.password}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={generatePassword}
                                        className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
                                        title="Regenerate Password"
                                    >
                                        <RefreshCw size={18} />
                                        <span className="hidden md:inline">Regenerate</span>
                                    </button>
                                </div>
                                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                                    <AlertCircle size={12} />
                                    This password is temporary. The intern will be forced to change it on first login.
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => setViewMode('list')}
                                className="px-6 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-medium flex items-center gap-2 shadow-lg shadow-slate-200"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Creates Intern Account
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List View */}
            {viewMode === 'list' && !generatedCredentials && (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                            <input
                                type="text"
                                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <select
                                className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 outline-none focus:border-blue-400 cursor-pointer w-full md:w-auto"
                                value={selectedBatch}
                                onChange={e => setSelectedBatch(e.target.value)}
                            >
                                <option value="All">All Batches</option>
                                {uniqueBatches.map(b => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Intern Profile</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 hidden md:table-cell">Domain</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 hidden md:table-cell">Batch</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Status</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {filteredStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Users className="text-slate-300" size={32} />
                                            </div>
                                            <h3 className="text-slate-900 font-medium mb-1">No interns found</h3>
                                            <p className="text-slate-500 text-sm">Try adjusting your filters or add a new intern.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map(student => (
                                        <tr key={student._id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold uppercase text-sm">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-900">{student.name}</div>
                                                        <div className="text-xs text-slate-500">{student.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 hidden md:table-cell">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                    {student.domain?.name || 'Unassigned'}
                                                </span>
                                            </td>
                                            <td className="p-4 hidden md:table-cell">
                                                <span className="text-sm text-slate-600 font-mono">
                                                    {student.batch || '—'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {student.isFirstLogin ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                        Pending Login
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        Active
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(student._id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Intern Account"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentManager;
