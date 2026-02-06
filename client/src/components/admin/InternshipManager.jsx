import React, { useState, useEffect } from 'react';
import { Plus, Trash2, BookOpen, ExternalLink, Calendar } from 'lucide-react';

const InternshipManager = () => {
    const [internships, setInternships] = useState([]);
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('list'); // 'list' or 'create'

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        domain: '', // Domain ID
        description: '',
        applicationLink: ''
    });

    const token = localStorage.getItem('accessToken');

    const fetchData = async () => {
        try {
            setLoading(true);
            const [intRes, domRes] = await Promise.all([
                fetch('http://localhost:8000/api/v1/internships'),
                fetch('http://localhost:8000/api/v1/domains')
            ]);

            const intData = await intRes.json();
            const domData = await domRes.json();

            setInternships(intData);
            setDomains(domData);
        } catch (err) {
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('http://localhost:8000/api/v1/internships', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to create internship');
            }

            // Success
            setFormData({ title: '', domain: '', description: '', applicationLink: '' });
            setActiveTab('list');
            fetchData();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this internship?')) return;

        try {
            const res = await fetch(`http://localhost:8000/api/v1/internships/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) throw new Error('Failed to delete');
            fetchData();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> Manage Internships
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('list')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        View All
                    </button>
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'create' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        <Plus className="w-4 h-4" /> Post New
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
                    {error}
                </div>
            )}

            {activeTab === 'create' && (
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleCreate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Internship Title</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                                placeholder="e.g. Frontend Developer Intern"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Domain</label>
                            <select
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                                value={formData.domain}
                                onChange={e => setFormData({ ...formData, domain: e.target.value })}
                            >
                                <option value="">Select a Domain</option>
                                {domains.map(d => (
                                    <option key={d._id} value={d._id}>{d.name}</option>
                                ))}
                            </select>
                            <p className="text-xs text-slate-500 mt-1">Don't see the domain? Add it in the Domains tab.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Google Form Link</label>
                            <div className="relative">
                                <ExternalLink className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                <input
                                    required
                                    type="url"
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                                    placeholder="https://forms.google.com/..."
                                    value={formData.applicationLink}
                                    onChange={e => setFormData({ ...formData, applicationLink: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                            <textarea
                                required
                                rows="4"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                                placeholder="Describe the role, responsibilities, and requirements..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setActiveTab('list')}
                                className="px-6 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 transition-colors"
                            >
                                {submitting ? 'Posting...' : 'Post Internship'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === 'list' && (
                loading ? (
                    <div className="text-center py-12 text-slate-500">Loading internships...</div>
                ) : (
                    <div className="space-y-4">
                        {internships.map((internship) => (
                            <div key={internship._id} className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors bg-white">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                                {internship.domain?.name || 'Unknown Domain'}
                                            </span>
                                            <span className="text-slate-400 text-xs flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(internship.postedDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">{internship.title}</h3>
                                        <p className="text-slate-600 text-sm line-clamp-2 mb-3">{internship.description}</p>
                                        <a href={internship.applicationLink} target="_blank" rel="noreferrer" className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                                            Check Form Link <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(internship._id)}
                                        className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Internship"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {internships.length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                                <p className="text-slate-500 mb-4">No active internships found.</p>
                                <button
                                    onClick={() => setActiveTab('create')}
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    Post your first internship
                                </button>
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default InternshipManager;
