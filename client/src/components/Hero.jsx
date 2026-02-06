import React from 'react';
import { ArrowRight, Code } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-velsphere-blue to-slate-900 text-white pt-32 pb-24 md:pt-48 md:pb-32">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-velsphere-accent/5 blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px]"></div>

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-velsphere-accent text-sm font-medium mb-8 backdrop-blur-sm animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-velsphere-accent animate-pulse"></span>
                        Transforming Ideas into Digital Reality
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                        Building Software Solutions. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                            Empowering Future Talent.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        We develop high-performance software, applications, websites, and cloud-based solutions while providing immersive internship opportunities for the next generation of developers.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#services" className="w-full sm:w-auto btn-primary bg-velsphere-accent text-velsphere-blue hover:bg-white hover:text-velsphere-blue border-transparent">
                            Explore Services
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                        <a href="#careers" className="w-full sm:w-auto btn-secondary bg-white/10 text-white border-white/10 hover:bg-white/20">
                            View Internships
                            <Code className="ml-2 w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center p-2">
                    <div className="w-1 h-2 bg-slate-400 rounded-full"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
