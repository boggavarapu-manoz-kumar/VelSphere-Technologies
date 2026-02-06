import React from 'react';
import { ArrowRight } from 'lucide-react';

const InternshipDomains = () => {
    // Mock data - in real app would come from API/Admin
    const domains = [
        { title: "Full Stack Development", positions: 12, tags: ["React", "Node.js", "MongoDB"] },
        { title: "Mobile App Development", positions: 8, tags: ["Flutter", "React Native"] },
        { title: "Data Science & AI", positions: 5, tags: ["Python", "ML", "Pandas"] },
        { title: "UI/UX Design", positions: 4, tags: ["Figma", "Prototyping"] },
        { title: "Cloud Computing", positions: 6, tags: ["AWS", "Docker", "DevOps"] },
        { title: "Cybersecurity", positions: 3, tags: ["Network Security", "Ethical Hacking"] }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Open Internship Domains</h2>
                        <p className="text-lg text-slate-600 max-w-2xl">
                            Select your domain of interest and start your journey with VelSphere.
                        </p>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-2 text-velsphere-blue font-semibold hover:gap-3 transition-all">
                        View All Domains <ArrowRight size={20} />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {domains.map((domain, index) => (
                        <div key={index} className="group p-6 rounded-xl border border-slate-200 hover:border-velsphere-blue/30 hover:shadow-lg transition-all duration-300 bg-white">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold text-slate-800 group-hover:text-velsphere-blue transition-colors">
                                    {domain.title}
                                </h3>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {domain.positions} Open
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {domain.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <button className="w-full py-2.5 rounded-lg bg-slate-900 text-white font-medium text-sm hover:bg-velsphere-blue transition-colors flex items-center justify-center gap-2 group-hover:shadow-md">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <a href="#" className="inline-flex items-center gap-2 text-velsphere-blue font-semibold">
                        View All Domains <ArrowRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default InternshipDomains;
