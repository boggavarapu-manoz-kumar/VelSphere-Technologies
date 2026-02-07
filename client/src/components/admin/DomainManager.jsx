import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import api from '../../services/api';

const DomainManager = () => {
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newDomain, setNewDomain] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const fetchDomains = async () => {
        try {
            const res = await api.get('/domains');
            // Handle both legacy (array) and new (object) API responses for robustness
            const domainList = Array.isArray(res.data) ? res.data : (res.data.domains || []);
            setDomains(domainList);
        } catch (err) {
            setError('Failed to load domains');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDomains();
    }, []);

    const handleAddDomain = async (e) => {
        e.preventDefault();
        if (!newDomain.trim()) return;

        setSubmitting(true);
        setError('');

        try {
            await api.post('/domains', { name: newDomain });
            setNewDomain('');
            fetchDomains(); // Refresh list
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteDomain = async (id) => {
        if (!window.confirm('Are you sure? This relies on internships being deleted or re-assigned first ideally (but for now we will just delete).')) return;

        try {
            await api.delete(`/domains/${id}`);
            fetchDomains();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5" /> Manage Domains
            </h2>

            {/* Add Domain Form */}
            <form onSubmit={handleAddDomain} className="flex gap-3 mb-8">
                <input
                    type="text"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    placeholder="Enter new domain name (e.g. 'Cloud Computing')"
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
                <button
                    type="submit"
                    disabled={submitting || !newDomain.trim()}
                    className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add
                </button>
            </form>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
                    {error}
                </div>
            )}

            {/* Domains List */}
            {loading ? (
                <div className="text-center py-8 text-slate-500">Loading domains...</div>
            ) : (
                <div className="grid gap-3">
                    {domains.map((domain) => (
                        <div key={domain._id} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100 group">
                            <span className="font-medium text-slate-700">{domain.name}</span>
                            <button
                                onClick={() => handleDeleteDomain(domain._id)}
                                className="text-slate-400 hover:text-red-500 transition-colors p-2"
                                title="Delete domain"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {domains.length === 0 && (
                        <div className="text-center py-8 text-slate-400 italic">No domains added yet.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DomainManager;
