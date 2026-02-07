import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const InternProtectedRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyIntern = async () => {
            try {
                // Check if user info exists in localStorage first for speed
                const localUser = localStorage.getItem('intern_user');

                if (!localUser) {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    return;
                }

                const token = localStorage.getItem('internToken');
                const parsedUser = JSON.parse(localUser);

                // Strict check: Must exist, be an intern, AND HAVE A TOKEN
                if (!parsedUser || !parsedUser.isIntern || !token) {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    return;
                }

                // Verify with backend (optional but recommended for security)
                // For now, we'll rely on the cookie/local storage state check
                // In a real app, you might want to hit a /me endpoint here
                // const res = await fetch(...)

                setIsAuthenticated(true);
            } catch (error) {
                console.error("Auth check failed", error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyIntern();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-50">
                <Loader2 className="w-10 h-10 text-velsphere-blue animate-spin" />
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/intern/login" replace />;
};

export default InternProtectedRoute;
