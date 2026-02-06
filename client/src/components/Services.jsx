import React from 'react';
import { Smartphone, Monitor, Cloud, Database, BarChart3, ShieldCheck } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: Monitor,
            title: "Web Application Development",
            desc: "Scalable, secure, and responsive web applications built with modern frameworks like React, Next.js, and Node.js."
        },
        {
            icon: Smartphone,
            title: "Mobile App Development",
            desc: "Native and cross-platform mobile solutions for iOS and Android that provide seamless user experiences."
        },
        {
            icon: Cloud,
            title: "Cloud Services & DevOps",
            desc: "End-to-end cloud implementation, migration, and management on AWS, Azure, and Google Cloud Platform."
        },
        {
            icon: Database,
            title: "Enterprise Software",
            desc: "Custom software solutions designed to streamline complex business processes and improve operational efficiency."
        },
        {
            icon: BarChart3,
            title: "Data Analytics",
            desc: "Transforming raw data into actionable insights through advanced analytics and visualization tools."
        },
        {
            icon: ShieldCheck,
            title: "Cybersecurity Solutions",
            desc: "Robust security protocols and auditing to protect your digital assets against evolving threats."
        }
    ];

    return (
        <section id="services" className="py-24 bg-slate-50">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-velsphere-blue text-sm font-semibold mb-4">
                        Our Expertise
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">
                        Comprehensive Software Services
                    </h2>
                    <p className="text-xl text-slate-600">
                        We deliver end-to-end technology solutions tailored to your unique business needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 rounded-xl bg-velsphere-blue text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <service.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-velsphere-blue transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
