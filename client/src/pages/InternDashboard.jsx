import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Briefcase, Calendar, CheckCircle, Clock, Link as LinkIcon, AlertCircle, Loader2, XCircle, History } from 'lucide-react';

const InternDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTaskLoading, setIsTaskLoading] = useState(true);

    // Submission Modal State
    const [selectedTask, setSelectedTask] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionForm, setSubmissionForm] = useState({ link: '', comments: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user from local storage initially
        const storedUser = localStorage.getItem('intern_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);

        // Fetch latest profile to get domain details if not in local storage
        fetchProfileAndTasks();
    }, []);

    const fetchProfileAndTasks = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('intern_user'))?.accessToken;
            if (!token) return;

            // 1. Fetch Profile
            const profileRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/students/me`, {
                headers: { 'Authorization': `Bearer ${token}` },
                credentials: 'include'
            });
            const profileData = await profileRes.json();

            if (profileRes.ok) {
                const userData = profileData.user;
                setUser(userData);
                const lsData = JSON.parse(localStorage.getItem('intern_user'));
                localStorage.setItem('intern_user', JSON.stringify({ ...lsData, ...userData }));

                // 2. Fetch Tasks (if domain exists)
                if (userData.domain?._id || userData.domain) {
                    const domainId = userData.domain._id || userData.domain;
                    const tasksRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/tasks/domain/${domainId}`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                        credentials: 'include'
                    });
                    const tasksData = await tasksRes.json();
                    if (tasksRes.ok) setTasks(tasksData.tasks);
                }

                // 3. Fetch My Submissions
                const subsRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/submissions/my`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    credentials: 'include'
                });
                const subsData = await subsRes.json();
                if (subsRes.ok) setSubmissions(subsData.submissions);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsTaskLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/students/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            localStorage.removeItem('intern_user');
            // use navigate replace to clear history, or window.location.replace for harder reset
            window.location.replace('/intern/login');
        } catch (error) {
            localStorage.removeItem('intern_user');
            window.location.replace('/intern/login');
        }
    };

    const handleSubmitWork = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const token = JSON.parse(localStorage.getItem('intern_user'))?.accessToken;
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/submissions/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    taskId: selectedTask._id,
                    submissionLink: submissionForm.link,
                    comments: submissionForm.comments
                }),
                credentials: 'include'
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            // Success
            setSubmissions([...submissions, data.submission]);
            setSelectedTask(null); // Close modal
            setSubmissionForm({ link: '', comments: '' });

        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getTaskStatus = (taskId) => {
        const submission = submissions.find(s => s.task._id === taskId || s.task === taskId);
        if (submission) return { submitted: true, status: submission.status };
        return { submitted: false, status: 'pending' };
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;
    }

    if (!user) return null;

    const completedCount = submissions.filter(s => s.status === 'approved' || s.status === 'pending').length;
    const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

    return (
        <div className="min-h-screen bg-slate-50 relative">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="bg-velsphere-blue text-white font-bold rounded-lg w-8 h-8 flex items-center justify-center mr-3">
                            V
                        </div>
                        <h1 className="text-xl font-bold text-slate-900">Intern<span className="text-velsphere-blue">Portal</span></h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-600 hidden md:block">Welcome, {user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Overview Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-10 h-10 text-slate-400" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                            <p className="text-slate-500 mb-4">{user.email}</p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                    <Briefcase className="w-4 h-4" />
                                    {user.domain?.name || 'Assigned Domain'}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                                    <Calendar className="w-4 h-4" />
                                    Started: {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${user.internshipStatus === 'selected' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                                    }`}>
                                    <CheckCircle className="w-4 h-4" />
                                    Status: {user.internshipStatus?.charAt(0).toUpperCase() + user.internshipStatus?.slice(1)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Assigned Tasks Column */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-velsphere-blue" />
                            {user.domain?.name || 'Assigned'} Domain Tasks
                        </h3>

                        {isTaskLoading ? (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">Loading tasks...</div>
                        ) : tasks.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock className="w-8 h-8 text-slate-300" />
                                </div>
                                <h4 className="text-slate-900 font-medium mb-1">No Active Tasks</h4>
                                <p className="text-slate-500 text-sm">
                                    No active tasks found for the <span className="font-semibold">{user.domain?.name}</span> domain.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {tasks.map(task => {
                                    const { submitted, status } = getTaskStatus(task._id);
                                    const isClosed = new Date(task.deadline) < new Date();

                                    return (
                                        <div key={task._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <span className={`text-xs flex items-center gap-1 mb-1 font-medium ${isClosed ? 'text-red-500' : 'text-slate-500'}`}>
                                                        <Calendar size={12} />
                                                        {isClosed ? 'Deadline Passed: ' : 'Due: '}
                                                        {new Date(task.deadline).toLocaleDateString()}
                                                    </span>
                                                    <h3 className="font-bold text-slate-900 text-lg">{task.title}</h3>
                                                </div>
                                                {submitted ? (
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                                        }`}>
                                                        {status === 'pending' ? 'Submitted' : status}
                                                    </span>
                                                ) : isClosed ? (
                                                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase">
                                                        Closed
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase">
                                                        Pending
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-slate-600 text-sm mb-6 whitespace-pre-wrap">{task.description}</p>

                                            <div className="flex justify-end">
                                                {submitted ? (
                                                    <button disabled className="px-4 py-2 bg-slate-100 text-slate-400 font-medium rounded-lg cursor-not-allowed flex items-center gap-2">
                                                        <CheckCircle size={16} /> Completed
                                                    </button>
                                                ) : isClosed ? (
                                                    <button disabled className="px-4 py-2 bg-slate-100 text-slate-400 font-medium rounded-lg cursor-not-allowed flex items-center gap-2">
                                                        <XCircle size={16} /> Deadline Passed
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => setSelectedTask(task)}
                                                        className="px-4 py-2 bg-velsphere-blue text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm shadow-blue-200"
                                                    >
                                                        Submit Work <LinkIcon size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Stats / Sidebar */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">You're Doing Great!</h3>
                        <div className="bg-gradient-to-br from-velsphere-blue to-blue-600 rounded-xl shadow-lg p-6 text-white mb-6">
                            <p className="text-blue-100 text-sm mb-1">Tasks Completed</p>
                            <div className="text-4xl font-bold mb-4">{completedCount} <span className="text-xl font-normal text-blue-200">/ {tasks.length}</span></div>
                            <div className="h-2 bg-blue-400/30 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white/90 rounded-full transition-all duration-1000"
                                    style={{ width: `${completionRate}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-blue-100 mt-2">{completionRate}% Completion Rate</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h4 className="font-bold text-slate-900 mb-4">Need Help?</h4>
                            <p className="text-slate-600 text-sm mb-4">
                                If you're stuck on a task or need clarification, contact your mentor.
                            </p>
                            <a href="mailto:support@velsphere.com" className="text-sm font-medium text-velsphere-blue hover:underline">
                                Contact Support &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            {/* Submission Modal */}
            {selectedTask && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900">Submit Task</h3>
                            <p className="text-sm text-slate-500 mt-1">Submit your work for: <span className="font-medium text-slate-700">{selectedTask.title}</span></p>
                        </div>

                        <form onSubmit={handleSubmitWork} className="p-6 space-y-4">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-start gap-2">
                                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Submission Link (GitHub/Drive)</label>
                                <input
                                    type="url"
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-velsphere-blue focus:border-transparent outline-none"
                                    placeholder="https://github.com/..."
                                    value={submissionForm.link}
                                    onChange={e => setSubmissionForm({ ...submissionForm, link: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Comments (Optional)</label>
                                <textarea
                                    rows="3"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-velsphere-blue focus:border-transparent outline-none"
                                    placeholder="Any notes for the reviewer..."
                                    value={submissionForm.comments}
                                    onChange={e => setSubmissionForm({ ...submissionForm, comments: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => { setSelectedTask(null); setError(null); }}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 bg-velsphere-blue text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InternDashboard;
