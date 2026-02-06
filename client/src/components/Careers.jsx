import React from 'react';
import { Briefcase, GraduationCap, ArrowRight } from 'lucide-react';

const Careers = () => {
    return (
        <section id="careers" className="py-24 bg-velsphere-blue text-white relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute right-0 top-0 w-96 h-96 bg-velsphere-accent rounded-full blur-[150px]"></div>
                <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500 rounded-full blur-[150px]"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-velsphere-accent text-sm font-semibold mb-4 backdrop-blur-sm">
                        Join Our Team
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Build Your Future with VelSphere
                    </h2>
                    <p className="text-xl text-slate-300">
                        Whether you're a student looking to start your journey or a professional ready for the next challenge.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Internship Card */}
                    <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-velsphere-accent to-emerald-400 flex items-center justify-center mb-6 text-velsphere-blue shadow-lg shadow-emerald-900/20">
                            <GraduationCap size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Student Internships</h3>
                        <p className="text-slate-300 mb-8 leading-relaxed">
                            Gain hands-on experience in real-world projects. Our mentorship program is designed to transform theoretical knowledge into industry-ready skills.
                        </p>
                        <ul className="space-y-3 mb-8 text-slate-300">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-velsphere-accent"></div> Live Project Experience</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-velsphere-accent"></div> Industry Expert Mentorship</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-velsphere-accent"></div> Certificate of Completion</li>
                        </ul>
                        <button className="flex items-center gap-2 text-velsphere-accent font-semibold group-hover:gap-3 transition-all">
                            Apply for Internship <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Jobs Card */}
                    <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-900/20">
                            <Briefcase size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Professional Careers</h3>
                        <p className="text-slate-300 mb-8 leading-relaxed">
                            Join a team of passionate technologists delivering excellence. We offer a culture of innovation, continuous learning, and growth.
                        </p>
                        <ul className="space-y-3 mb-8 text-slate-300">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Competitive Compensation</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Flexible Work Environment</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Career Growth Opportunities</li>
                        </ul>
                        <button className="flex items-center gap-2 text-blue-300 font-semibold group-hover:gap-3 transition-all">
                            View Open Positions <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Careers;
