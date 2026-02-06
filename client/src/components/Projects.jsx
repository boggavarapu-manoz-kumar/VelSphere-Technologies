import React from 'react';
import { MessageCircle, Code, Server, Smartphone } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "E-Commerce Platform",
            domain: "Web Development",
            icon: Code,
            desc: "Full-featured online store with cart, payment gateway, and admin dashboard."
        },
        {
            title: "Hospital Management System",
            domain: "Enterprise Software",
            icon: Server,
            desc: "Comprehensive system for managing patients, appointments, and inventory."
        },
        {
            title: "Fitness Tracking App",
            domain: "Mobile App",
            icon: Smartphone,
            desc: "Cross-platform mobile application for tracking workouts and diet plans."
        }
    ];

    return (
        <section id="projects" className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
                        Academic Projects
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">
                        Premium Projects for Students
                    </h2>
                    <p className="text-xl text-slate-600">
                        Get high-quality, industry-standard projects for your final year submissions with complete documentation and guidance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="flex flex-col p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-6 text-purple-600">
                                <project.icon size={24} />
                            </div>
                            <div className="mb-4">
                                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">{project.domain}</span>
                                <h3 className="text-xl font-bold text-slate-900 mt-1">{project.title}</h3>
                            </div>
                            <p className="text-slate-600 mb-8 flex-grow text-sm leading-relaxed">
                                {project.desc}
                            </p>
                            <button className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-200">
                                <MessageCircle size={20} />
                                Contact on WhatsApp
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 rounded-xl bg-purple-50 border border-purple-100 text-center">
                    <p className="text-purple-800 font-medium">
                        Need a custom project idea? We provide end-to-end guidance and explanation support for all projects.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Projects;
