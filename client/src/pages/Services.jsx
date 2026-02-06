import React from 'react';
import Services from '../components/Services';
import { Layers, CheckCircle2, Cpu } from 'lucide-react';

const ServicesPage = () => {
    return (
        <div className="pt-8">
            <div className="container-custom mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Services</h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Comprehensive technology solutions designed to scale with your ambitions.
                </p>
            </div>

            <Services />

            {/* Our Process Section */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">How We Work</h2>
                        <p className="text-slate-600">Our proven development methodology ensures success.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-slate-200 -z-10"></div>

                        {[
                            { step: "01", title: "Discovery & Design", desc: "We dive deep into your requirements to architect the perfect solution." },
                            { step: "02", title: "Agile Development", desc: "Iterative sprints with regular feedback loops to ensure alignment." },
                            { step: "03", title: "Testing & Deployment", desc: "Rigorous QA and seamless deployment strategies for zero downtime." }
                        ].map((s, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg text-center">
                                <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-velsphere-blue font-bold text-xl mb-6">
                                    {s.step}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-20 bg-slate-50">
                <div className="container-custom text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-12">Technologies We Master</h2>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-70">
                        {['React', 'Node.js', 'Python', 'AWS', 'TensorFlow', 'Flutter', 'Docker', 'PostgreSQL'].map(tech => (
                            <span key={tech} className="text-xl md:text-2xl font-bold text-slate-400 select-none">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
