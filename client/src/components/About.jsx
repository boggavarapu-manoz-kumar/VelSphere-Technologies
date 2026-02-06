import React from 'react';
import { Target, Users, Zap, Globe } from 'lucide-react';

const About = () => {
    const highlights = [
        {
            icon: Target,
            title: "Our Mission",
            desc: "To deliver enterprise-grade software solutions that drive business growth while minimizing technical debt."
        },
        {
            icon: Users,
            title: "Expert Team",
            desc: "A collective of seasoned developers, designers, and architects dedicated to technical excellence."
        },
        {
            icon: Zap,
            title: "Rapid Delivery",
            desc: "Agile methodologies ensuring faster time-to-market without compromising on quality or security."
        },
        {
            icon: Globe,
            title: "Global Standards",
            desc: "Adhering to international coding standards and best practices for scalable, maintainable code."
        }
    ];

    return (
        <section id="about" className="py-24 bg-white">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-velsphere-blue text-sm font-semibold mb-4">
                            Who We Are
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                            Bridging the Gap Between <br />
                            <span className="text-velsphere-blue">Innovation & Execution</span>
                        </h2>
                        <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                            VelSphere Technologies is a premier software development firm specializing in building robust applications, websites, and cloud infrastructures. We don't just write code; we engineer solutions that solve complex business challenges.
                        </p>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                            Beyond development, we are committed to shaping the future of the tech industry. Our comprehensive internship programs provide students with real-world experience, bridging the gap between academic learning and industry demands.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <h3 className="text-2xl font-bold text-velsphere-blue mb-1">50+</h3>
                                <p className="text-sm text-slate-500">Projects Delivered</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <h3 className="text-2xl font-bold text-velsphere-blue mb-1">200+</h3>
                                <p className="text-sm text-slate-500">Students Mentored</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {highlights.map((item, index) => (
                            <div key={index} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 text-velsphere-blue">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
