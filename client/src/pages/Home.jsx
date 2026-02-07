import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { ArrowRight, Code, ShieldCheck, Users, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import InternshipCard from '../components/InternshipCard';

const Home = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInternships = async () => {
        try {
            // Add timestamp to prevent caching
            const res = await api.get(`/internships?t=${Date.now()}`);

            if (Array.isArray(res.data)) {
                // Take only the first 3 (newest)
                const latestInternships = res.data.slice(0, 3).map(item => ({
                    ...item,
                    isNew: (new Date() - new Date(item.postedDate)) / (1000 * 60 * 60 * 24) < 7,
                    date: new Date(item.postedDate).toLocaleDateString(),
                    // Ensure domain is a string (name) if it is populated as an object
                    domain: item.domain?.name || 'General',
                    // Map backend field to card prop
                    applyLink: item.applicationLink
                }));
                setInternships(latestInternships);
            } else {
                console.warn("Internships API returned non-array:", res.data);
                setInternships([]);
            }
        } catch (error) {
            console.error("Failed to fetch internships", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInternships();

        // Real-time update: Refetch when window regains focus
        const handleFocus = () => {
            fetchInternships();
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);
    return (
        <>
            <Hero />

            {/* Quick About Summary */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-velsphere-blue to-blue-600 rounded-2xl opacity-10 blur-lg"></div>
                                <div className="relative bg-slate-50 p-8 rounded-2xl border border-slate-100">
                                    <Code className="w-12 h-12 text-velsphere-blue mb-6" />
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Engineering Excellence</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        We combine technical expertise with industry best practices to deliver robust, scalable software solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">
                                Your Technology Partner for <span className="text-velsphere-blue">Growth</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 max-w-lg">
                                VelSphere Technologies is more than just a software company. We are a team of innovators dedicated to solving complex business problems and nurturing the next generation of tech talent.
                            </p>
                            <Link to="/about" className="text-velsphere-blue font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                                Learn More About Us <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Opportunities Section */}
            <section className="py-20 bg-slate-50 border-y border-slate-200">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Careers at VelSphere</span>
                            <h2 className="text-3xl font-bold text-slate-900">Latest Opportunities</h2>
                        </div>
                        <Link to="/internships" className="hidden md:flex items-center text-slate-600 font-semibold hover:text-blue-600 transition-colors group">
                            View All Openings <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : internships.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {internships.map((internship) => (
                                <InternshipCard key={internship._id} {...internship} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Briefcase className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">No Open Positions</h3>
                            <p className="text-slate-500 mb-6">We don't have any open roles right now, but check back soon!</p>
                            <Link to="/contact" className="text-blue-600 font-semibold hover:underline">
                                Contact us for updates
                            </Link>
                        </div>
                    )}

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/internships" className="btn-secondary w-full justify-center">
                            View All Openings
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="py-20 bg-slate-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">What We Do</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            End-to-end software development services tailored to your needs.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[
                            { title: "Web Development", icon: Code, desc: "Modern, responsive websites and web apps." },
                            { title: "Cloud Solutions", icon: ShieldCheck, desc: "Scalable cloud infrastructure and security." },
                            { title: "IT Consulting", icon: Users, desc: "Strategic technology planning and digital transformation." }
                        ].map((s, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <s.icon className="w-10 h-10 text-velsphere-blue mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                                <p className="text-slate-600 text-sm">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link to="/services" className="btn-primary">
                            View All Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-velsphere-blue relative overflow-hidden">
                <div className="container-custom relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                        Whether you need a software solution or are looking to kickstart your career, we have the right path for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="px-8 py-3 bg-velsphere-accent text-velsphere-blue font-bold rounded-lg hover:bg-white transition-colors">
                            Start a Project
                        </Link>
                        <Link to="/careers" className="px-8 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                            Apply for Internship
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
