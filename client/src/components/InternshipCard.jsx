import React from 'react';
import { Calendar, Briefcase, ExternalLink, ArrowRight, Code } from 'lucide-react';

const InternshipCard = ({ title, domain, description, date, isNew, applyLink }) => {
    return (
        <div className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
            {/* Header: Date & Tag */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {domain}
                    </span>
                    {isNew && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 animate-pulse">
                            NEW
                        </span>
                    )}
                </div>
                <div className="flex items-center text-slate-400 text-xs font-medium">
                    <Calendar className="w-3 h-3 mr-1" />
                    {date}
                </div>
            </div>

            {/* Content */}
            <div className="mb-6 flex-grow">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                    {title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {description}
                </p>
            </div>

            {/* Footer: Apply Button */}
            <div className="mt-auto pt-6 border-t border-slate-100">
                <div className="flex flex-col gap-2">
                    <a
                        href={applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex justify-center items-center px-4 py-2.5 rounded-xl border border-transparent text-sm font-semibold text-white bg-slate-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 gap-2 group-hover:bg-blue-600"
                    >
                        Apply via Google Form <ExternalLink className="w-4 h-4" />
                    </a>
                    <span className="text-center text-xs text-slate-400 font-medium">
                        Opens in a new tab
                    </span>
                </div>
            </div>
        </div>
    );
};

export default InternshipCard;
