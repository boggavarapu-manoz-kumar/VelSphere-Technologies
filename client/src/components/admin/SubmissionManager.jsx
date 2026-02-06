import React, { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle, XCircle, Clock, Loader2, Filter } from 'lucide-react';

const SubmissionManager = () => {
    const [submissions, setSubmissions] = useState([]);
    const [analytics, setAnalytics] = useState([]); // New state for monitoring
    const [viewMode, setViewMode] = useState('submissions'); // 'submissions' or 'monitoring'
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
    const [updatingId, setUpdatingId] = useState(null);

    const token = localStorage.getItem('token'); // Admin Token

    useEffect(() => {
        if (viewMode === 'submissions') {
            fetchSubmissions();
        } else {
            fetchAnalytics();
        }
    }, [viewMode]);

    const fetchAnalytics = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/submissions/analytics`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setAnalytics(data.analytics);
            }
        } catch (error) {
            console.error("Error fetching analytics:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSubmissions = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/submissions/all`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setSubmissions(data.submissions);
            }
        } catch (error) {
            console.error("Error fetching submissions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        setUpdatingId(id);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/submissions/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                setSubmissions(submissions.map(s =>
                    s._id === id ? { ...s, status: newStatus } : s
                ));
            }
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredSubmissions = submissions.filter(s => {
        if (filter === 'all') return true;
        return s.status === filter;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-slate-800">Intern Submissions</h2>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('submissions')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'submissions' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Recent Submissions
                        </button>
                        <button
                            onClick={() => setViewMode('monitoring')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'monitoring' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Monitoring Board
                        </button>
                    </div>
                </div>

                {viewMode === 'submissions' && (
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                        <Filter size={16} className="text-slate-500" />
                        <select
                            className="bg-transparent border-none text-sm font-medium text-slate-700 outline-none cursor-pointer"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {isLoading ? (
                    <div className="p-12 flex justify-center text-slate-500">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : viewMode === 'submissions' && filteredSubmissions.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        No submissions found matching filter.
                    </div>
                ) : viewMode === 'monitoring' && analytics.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        No active task data available.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        {viewMode === 'submissions' ? (
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="p-4">Intern</th>
                                        <th className="p-4">Task</th>
                                        <th className="p-4">Submission</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredSubmissions.map(sub => (
                                        <tr key={sub._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4">
                                                <div className="font-medium text-slate-900">{sub.student?.name || 'Unknown'}</div>
                                                <div className="text-xs text-slate-500">{sub.student?.email}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-medium text-slate-800">{sub.task?.title || 'Unknown Task'}</div>
                                                <div className="text-xs text-slate-500">{new Date(sub.submittedAt).toLocaleDateString()}</div>
                                            </td>
                                            <td className="p-4">
                                                <a
                                                    href={sub.submissionLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
                                                >
                                                    View Work <ExternalLink size={14} />
                                                </a>
                                                {sub.comments && (
                                                    <div className="text-xs text-slate-500 mt-1 italic max-w-xs truncate" title={sub.comments}>
                                                        "{sub.comments}"
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase
                                                    ${sub.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                        sub.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                            'bg-amber-100 text-amber-800'}
                                                `}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {sub.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleStatusUpdate(sub._id, 'approved')}
                                                                disabled={updatingId === sub._id}
                                                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                                                                title="Approve"
                                                            >
                                                                {updatingId === sub._id ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusUpdate(sub._id, 'rejected')}
                                                                disabled={updatingId === sub._id}
                                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                                title="Reject"
                                                            >
                                                                <XCircle size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                    {sub.status !== 'pending' && (
                                                        <span className="text-xs text-slate-400 font-medium">Reviewed</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="p-4">Intern</th>
                                        <th className="p-4">Task Details</th>
                                        <th className="p-4">Deadline</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {analytics.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4">
                                                <div className="font-medium text-slate-900">{item.studentName}</div>
                                                <div className="text-xs text-slate-500">{item.studentEmail}</div>
                                                <div className="text-xs text-slate-400 mt-1">Batch: {item.batch}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-medium text-slate-800">{item.taskTitle}</div>
                                                <div className="text-xs text-blue-600">{item.domain}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                                    <Clock size={14} />
                                                    {new Date(item.taskDeadline).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {item.status === 'submitted' ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 uppercase">
                                                        Submitted
                                                    </span>
                                                ) : item.status === 'missed' ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 uppercase">
                                                        Missed Deadline
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 uppercase">
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {item.status === 'submitted' && item.submissionLink ? (
                                                    <a
                                                        href={item.submissionLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline text-sm font-medium"
                                                    >
                                                        Review
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-400 text-sm">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmissionManager;
