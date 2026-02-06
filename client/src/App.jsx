import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import InternshipsPage from './pages/Internships';
import CareersPage from './pages/Careers';
import ProjectsPage from './pages/Projects';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';
import InternLogin from './pages/InternLogin';
import DashboardPage from './pages/Dashboard';
import ChangePassword from './pages/ChangePassword';
import InternDashboard from './pages/InternDashboard';
import InternProtectedRoute from './components/InternProtectedRoute';

// Scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/internships" element={<InternshipsPage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/intern/login" element={<InternLogin />} />


                    {/* Protected Intern Routes */}
                    <Route element={<InternProtectedRoute />}>
                        <Route path="/intern/change-password" element={<ChangePassword />} />
                        <Route path="/intern/dashboard" element={<InternDashboard />} />
                    </Route>

                    {/* Protected Admin Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Route>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
