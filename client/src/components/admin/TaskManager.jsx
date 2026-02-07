import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, Briefcase, Loader2, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [domains, setDomains] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        domainId: '',
        batch: '', // New field
        deadline: ''
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchDomains();
        fetchTasks();
    }, []);

    const fetchDomains = async () => {
        try {
            const res = await api.get('/domains');
            // Handle both legacy (array) and new (object) API responses for robustness
            const domainList = Array.isArray(res.data) ? res.data : (res.data.domains || []);
            setDomains(domainList);
        } catch (error) {
            console.error("Error fetching domains:", error);
        }
    };

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks/all');
            setTasks(res.data.tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await api.post('/tasks/create', formData);

            // Success
            setTasks([res.data.task, ...tasks]);
            setShowForm(false);
            setFormData({ title: '', description: '', domainId: '', batch: '', deadline: '' });
            fetchTasks();

        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Task Management</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                    <Plus size={18} />
                    Post New Task
                </button>
            </div>

            {showForm && (
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-top-4">
                    <h3 className="font-bold text-slate-900 mb-4">Create New Task</h3>
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Task Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                                    placeholder="e.g., Build Login API"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Assign to Domain</label>
                                <select
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none bg-white"
                                    value={formData.domainId}
                                    onChange={e => setFormData({ ...formData, domainId: e.target.value })}
                                >
                                    <option value="">Select Domain</option>
                                    {domains.map(d => (
                                        <option key={d._id} value={d._id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>



                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Target Batch <span className="text-slate-400 font-normal">(Optional)</span></label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                                placeholder="e.g., Winter-2024 (Leave empty for all)"
                                value={formData.batch}
                                onChange={e => setFormData({ ...formData, batch: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description / Instructions</label>
                            <textarea
                                required
                                rows="3"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                                placeholder="Detailed instructions for the intern..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Deadline</label>
                            <input
                                type="date"
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                                value={formData.deadline}
                                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
                                Publish Task
                            </button>
                        </div>
                    </form>
                </div >
            )}

            {/* Task List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center text-slate-500">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="text-slate-400" size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No Tasks Created</h3>
                        <p className="text-slate-500 mt-1">Post your first task to assign work to interns.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {tasks.map(task => (
                            <div key={task._id} className="p-6 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase">
                                                {task.domain?.name || 'Unknown Domain'}
                                            </span>
                                            {task.batch && (
                                                <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded uppercase flex items-center gap-1">
                                                    Batch: {task.batch}
                                                </span>
                                            )}
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <Calendar size={12} /> Deadline: {new Date(task.deadline).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-lg mb-1">{task.title}</h3>
                                        <p className="text-slate-600 text-sm line-clamp-2">{task.description}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Task"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default TaskManager;
