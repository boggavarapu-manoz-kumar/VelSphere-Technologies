import React from 'react';
import { Code2, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-velsphere-accent/10 flex items-center justify-center">
                                <Code2 className="w-5 h-5 text-velsphere-accent" />
                            </div>
                            <span className="text-lg font-bold text-white tracking-tight">
                                VelSphere Technologies
                            </span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
                            Empowering businesses with cutting-edge software solutions and nurturing the next generation of tech talent through immersive internships.
                        </p>
                        <div className="flex gap-4">
                            {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-velsphere-blue hover:text-white transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'About Us', 'Services', 'Projects'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-velsphere-accent transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Legal</h4>
                        <ul className="space-y-4">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact Support'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-velsphere-accent transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} VelSphere Technologies. All rights reserved.
                    </p>
                    <p className="text-slate-600 text-sm flex items-center gap-2">
                        Designed & Developed with <span className="text-red-500">♥</span> by VelSphere Team
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
