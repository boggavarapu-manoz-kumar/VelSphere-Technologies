import React from 'react';
import { Target, Users, Zap, Globe, Award, Heart } from 'lucide-react';
import About from '../components/About'; // Re-using the component for consistency, but wrapping it

const AboutPage = () => {
    // Extended core values
    const values = [
        { icon: Target, title: "Innovation", desc: "Pushing boundaries to create solutions that matter." },
        { icon: Heart, title: "Passion", desc: "We love what we do and it shows in our work." },
        { icon: Users, title: "Collaboration", desc: "Working together with clients to achieve shared success." },
        { icon: Award, title: "Excellence", desc: "Setting high standards and exceeding them every time." }
    ];

    return (
        <div className="pt-8">
            {/* Extended Header for About */}
            <div className="container-custom mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">About VelSphere</h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    We are architects of the digital future, combining deep technical expertise with a passion for education and growth.
                </p>
            </div>

            {/* Reuse existing component as a section */}
            <About />

            {/* New Sections: Core Values */}
            <section className="py-24 bg-velsphere-blue text-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-blue-200">The principles that guide every line of code we write.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <div key={i} className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-velsphere-accent/20 text-velsphere-accent flex items-center justify-center mx-auto mb-4">
                                    <v.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                                <p className="text-sm text-slate-400">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team/Culture Placeholder */}
            <section className="py-24 bg-white">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                                alt="VelSphere Team"
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">A Culture of Learning</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                At VelSphere, we believe that the best software is built by teams who are constantly learning. That's why we've integrated our internship program directly into our development lifecycle. Senior engineers mentor students, ensuring that wisdom is passed down while fresh ideas bubble up.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Join us in our mission to build better software and better developers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
