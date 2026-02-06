import React, { useState } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Internships', href: '/internships' },
        { name: 'Careers', href: '/careers' },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/contact' },
    ];

    // Helper to check if link is active
    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <div className="container-custom">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-velsphere-blue flex items-center justify-center">
                            <Code2 className="w-6 h-6 text-velsphere-accent" />
                        </div>
                        <span className="text-xl font-bold text-velsphere-blue tracking-tight">
                            VelSphere <span className="text-velsphere-gray text-sm font-medium">Technologies</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`text-sm font-medium transition-colors relative group ${isActive(link.href) ? 'text-velsphere-blue' : 'text-gray-600 hover:text-velsphere-blue'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-velsphere-blue transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-velsphere-blue"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white absolute w-full shadow-lg">
                    <div className="container-custom py-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`text-base font-medium py-2 border-b border-gray-50 last:border-0 ${isActive(link.href) ? 'text-velsphere-blue pl-2' : 'text-gray-600 hover:text-velsphere-blue'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
