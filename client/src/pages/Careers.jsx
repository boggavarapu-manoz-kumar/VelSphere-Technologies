import React from 'react';
import Careers from '../components/Careers';
import InternshipDomains from '../components/InternshipDomains';
import { Quote } from 'lucide-react';

const CareersPage = () => {
    return (
        <div className="pt-8 bg-slate-50">
            <div className="container-custom mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Careers & Internships</h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Find your place at VelSphere. Whether you're starting out or stepping up.
                </p>
            </div>

            <Careers />

            <div className="py-12 bg-white">
                <InternshipDomains />
            </div>

            {/* Testimonial / Culture */}
            <section className="py-24 bg-velsphere-blue text-white overflow-hidden relative">
                <div className="container-custom relative z-10 text-center">
                    <Quote className="w-16 h-16 text-velsphere-accent/20 mx-auto mb-8" />
                    <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed max-w-4xl mx-auto mb-8">
                        "The internship program at VelSphere was a game changer. I didn't just watch people code; I built features that are now live in production."
                    </blockquote>
                    <cite className="not-italic text-velsphere-accent font-semibold text-lg">
                        — Sarah J., Former Intern, now Junior Developer
                    </cite>
                </div>
            </section>
        </div>
    );
};

export default CareersPage;
