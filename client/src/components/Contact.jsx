import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-white">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-4">
                            Get in Touch
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">
                            Let's Start a Conversation
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 max-w-lg">
                            Whether you need a software solution for your business or looking for career opportunities, we're here to help.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-velsphere-blue">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Email Us</h4>
                                    <p className="text-slate-600">contact@velsphere.com</p>
                                    <p className="text-slate-600">careers@velsphere.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-velsphere-blue">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">WhatsApp Support</h4>
                                    <p className="text-slate-600">+91 98765 43210 (Business)</p>
                                    <p className="text-slate-600">+91 98765 43211 (Student Support)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-velsphere-blue">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Office Location</h4>
                                    <p className="text-slate-600 max-w-xs">
                                        VelSphere Technologies, Tech Park,
                                        Cyber City, Hyderabad - 500081
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-velsphere-blue focus:ring-1 focus:ring-velsphere-blue outline-none transition-all" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-velsphere-blue focus:ring-1 focus:ring-velsphere-blue outline-none transition-all" placeholder="Doe" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-velsphere-blue focus:ring-1 focus:ring-velsphere-blue outline-none transition-all" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-velsphere-blue focus:ring-1 focus:ring-velsphere-blue outline-none transition-all" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="button" className="w-full btn-primary bg-velsphere-blue text-white group">
                                Send Message <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
