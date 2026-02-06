import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, BookOpen, LogOut, Code, User, Settings, CheckCircle } from 'lucide-react';
import DomainManager from '../components/admin/DomainManager';
import InternshipManager from '../components/admin/InternshipManager';
import TaskManager from '../components/admin/TaskManager';
import SubmissionManager from '../components/admin/SubmissionManager';
import StudentManager from '../components/admin/StudentManager';

const Dashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [activeTab, setActiveTab] = useState('internships'); // 'internships' | 'domains' | 'overview'

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const adminData = localStorage.getItem('admin');

        if (!token || !adminData) {
            navigate('/login');
            return;
        }

        setAdmin(JSON.parse(adminData));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('admin');
        navigate('/login');
    };

    if (!admin) {
        return <div className="flex justify-center items-center h-screen bg-slate-50 text-slate-500">Loading Dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3 text-white mb-1">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-lg">V</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight">VelSphere Admin</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 truncate">Logged in as {admin.email}</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-medium">Overview</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('internships')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'internships' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <BookOpen className="w-5 h-5" />
                        <span className="font-medium">Internships</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('students')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'students' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <User className="w-5 h-5" />
                        <span className="font-medium">Students</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('domains')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'domains' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <Briefcase className="w-5 h-5" />
                        <span className="font-medium">Domains</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('tasks')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'tasks' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <Briefcase className="w-5 h-5" />
                        <span className="font-medium">Tasks</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('submissions')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'submissions' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Submissions</span>
                    </button>

                    <div className="pt-8 mt-8 border-t border-slate-800">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 capitalize">
                            {activeTab} Management
                        </h1>
                        <p className="text-slate-500">Manage your platform's content and settings.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500">
                            <User className="w-5 h-5" />
                        </div>
                    </div>
                </header>

                <div className="max-w-5xl">
                    {activeTab === 'overview' && (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center py-20">
                            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-6">
                                <LayoutDashboard className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome to the Dashboard</h2>
                            <p className="text-slate-500 max-w-lg mx-auto mb-8">
                                Select "Internships" or "Domains" from the sidebar to start managing your platform content.
                            </p>
                            <button
                                onClick={() => setActiveTab('internships')}
                                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
                            >
                                Manage Internships
                            </button>
                        </div>
                    )}

                    {activeTab === 'domains' && <DomainManager />}
                    {activeTab === 'internships' && <InternshipManager />}
                    {activeTab === 'students' && <StudentManager />}
                    {activeTab === 'tasks' && <TaskManager />}
                    {activeTab === 'submissions' && <SubmissionManager />}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

