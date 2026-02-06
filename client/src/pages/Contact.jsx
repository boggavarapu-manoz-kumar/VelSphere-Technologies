import React from 'react';
import Contact from '../components/Contact';
import { Clock, Phone } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="pt-8">
            <div className="container-custom mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Contact Us</h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    We'd love to hear from you. Reach out to us for any queries.
                </p>
            </div>

            <Contact />

            {/* Additional Contact Info */}
            <section className="py-12 bg-slate-50 border-t border-slate-200">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-velsphere-blue flex items-center justify-center">
                                <Clock />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Working Hours</h3>
                                <p className="text-slate-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                <p className="text-slate-600">Sat: 10:00 AM - 2:00 PM</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-velsphere-blue flex items-center justify-center">
                                <Phone />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Direct Support</h3>
                                <p className="text-slate-600">Sales: +91 98765 43210</p>
                                <p className="text-slate-600">HR: +91 98765 43211</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <div className="w-full h-96 bg-slate-200 flex items-center justify-center">
                <p className="text-slate-500 font-medium">Google Map Integration would go here</p>
            </div>
        </div>
    );
};

export default ContactPage;
