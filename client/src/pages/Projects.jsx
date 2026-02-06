import React, { useState } from 'react';
import Projects from '../components/Projects';
import { HelpCircle } from 'lucide-react';

const ProjectsPage = () => {
    return (
        <div className="pt-8">
            <div className="container-custom mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Student Projects</h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Premium academic projects with complete documentation, source code, and explanation support.
                </p>
            </div>

            <Projects />

            {/* FAQ Section */}
            <section className="py-24 bg-white">
                <div className="container-custom max-w-4xl">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>

                    <div className="space-y-6">
                        {[
                            { q: "Do these projects come with Source Code?", a: "Yes, 100% full source code is provided." },
                            { q: "Will I get help setting it up?", a: "Absolutely. We provide remote support to help you set up the project on your machine." },
                            { q: "Is documentation included?", a: "Each project comes with a comprehensive project report and PPT." },
                            { q: "Can I customize the project?", a: "Yes, the code is well-structured and you can make modifications as needed." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <h3 className="flex items-start gap-3 text-lg font-bold text-slate-900 mb-2">
                                    <HelpCircle className="w-6 h-6 text-velsphere-blue flex-shrink-0" />
                                    {faq.q}
                                </h3>
                                <p className="text-slate-600 ml-9">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectsPage;
