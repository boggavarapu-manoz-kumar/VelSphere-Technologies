import React, { useState } from 'react';
import { Briefcase, ArrowRight, BookOpen, Clock, Users, Code, PenTool, Database, Monitor, Search, ExternalLink } from 'lucide-react';
import InternshipCard from '../components/InternshipCard';

const Internships = () => {
    const [activeDomain, setActiveDomain] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const [domains, setDomains] = useState([]);
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Data from API
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [domainsRes, internshipsRes] = await Promise.all([
                    fetch('http://localhost:8000/api/v1/domains'),
                    fetch('http://localhost:8000/api/v1/internships')
                ]);

                const domainsData = await domainsRes.json();
                const internshipsData = await internshipsRes.json();

                // Add "All" option manually
                setDomains([{ _id: 'all', name: 'All' }, ...domainsData]);

                // Process Internships (add isNew flag)
                const enhancedInternships = internshipsData.map(item => ({
                    ...item,
                    isNew: (new Date() - new Date(item.postedDate)) / (1000 * 60 * 60 * 24) < 7,
                    date: new Date(item.postedDate).toLocaleDateString()
                }));

                setInternships(enhancedInternships);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter Logic
    // Filter Logic
    const filteredInternships = internships.filter(internship => {
        // Backend populates domain object, so we check internship.domain.name
        const domainName = internship.domain?.name || "";
        const matchesDomain = activeDomain === 'All' || domainName === activeDomain;
        const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (internship.description && internship.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesDomain && matchesSearch;
    }).sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1)); // Show NEW items first

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-slate-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-600 opacity-20 blur-3xl"></div>
                    <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-purple-500 opacity-10 blur-2xl"></div>
                </div>

                <div className="container-custom relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                            Launch Your Career with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                VelSphere Internships
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                            Gain real-world experience, work on cutting-edge projects, and get mentored by industry experts. Your journey to becoming a professional starts here.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#openings" className="btn-primary flex items-center gap-2">
                                Explore Openings <ArrowRight className="w-4 h-4" />
                            </a>
                            <div className="flex items-center gap-2 text-slate-400 px-4 py-3">
                                <Users className="w-5 h-5" />
                                <span>Join 500+ Alumni</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-20 bg-white">
                <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Intern at VelSphere?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            We don't just offer internships; we offer career-defining experiences designed to help you grow.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Briefcase className="w-8 h-8 text-blue-600" />,
                                title: "Real Projects",
                                desc: "Work on live client projects and internal products, not just busy work."
                            },
                            {
                                icon: <Users className="w-8 h-8 text-purple-600" />,
                                title: "Expert Mentorship",
                                desc: "One-on-one guidance from senior developers and industry veterans."
                            },
                            {
                                icon: <Clock className="w-8 h-8 text-amber-600" />,
                                title: "Flexible Schedule",
                                desc: "Remote-first culture with flexible hours to accommodate your studies."
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300">
                                <div className="mb-4 p-3 bg-white rounded-xl inline-block shadow-sm">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Internships List & Domains */}
            <div id="openings" className="py-20 bg-slate-50">
                <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Open Positions</h2>
                            <p className="text-slate-600">Find the perfect role for your skills and interests.</p>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full md:w-auto relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full md:w-80 pl-10 pr-4 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm shadow-sm transition-all duration-200"
                                placeholder="Search by title or keyword..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Domains Filter Filters */}
                    <div className="mb-10 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                        <div className="flex flex-nowrap md:flex-wrap gap-3">
                            {domains.map((domain) => (
                                <button
                                    key={domain._id}
                                    onClick={() => setActiveDomain(domain.name)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border whitespace-nowrap ${activeDomain === domain.name
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-md transform -translate-y-0.5'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    {/* Simple Icon mapping based on name or default */}
                                    {domain.name === 'Web Development' && <Code className="w-5 h-5" />}
                                    {domain.name === 'App Development' && <Monitor className="w-5 h-5" />}
                                    {domain.name === 'Data Science' && <Database className="w-5 h-5" />}
                                    {domain.name === 'UI/UX Design' && <PenTool className="w-5 h-5" />}
                                    {!['Web Development', 'App Development', 'Data Science', 'UI/UX Design'].includes(domain.name) && <Briefcase className="w-5 h-5" />}

                                    {domain.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Internships Grid */}
                    {filteredInternships.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredInternships.map((internship) => (
                                <InternshipCard
                                    key={internship._id}
                                    {...internship}
                                    // Map backend 'applicationLink' to frontend 'applyLink' prop if needed, 
                                    // or update InternshipCard to accept applicationLink. 
                                    // Let's pass it explicitly to be safe:
                                    applyLink={internship.applicationLink}
                                    domain={internship.domain?.name || 'General'}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 mb-6">
                                <Briefcase className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                No active openings right now
                            </h3>
                            <p className="text-slate-500 mb-8 leading-relaxed max-w-sm mx-auto">
                                We are constantly looking for new talent. Please check back later or explore other domains.
                            </p>
                            <button
                                onClick={() => { setActiveDomain('All'); setSearchQuery(''); }}
                                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 hover:underline"
                            >
                                View all domains <ArrowRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Internships;
