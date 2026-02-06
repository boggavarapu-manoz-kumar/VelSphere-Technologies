import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            // Optional: You could verify the token with the backend here
            // For now, we'll check existence. 
            // If the token is invalid, the API calls will 401, which we should catch.
            setIsAuthenticated(true);
        };

        validateToken();
    }, []);

    if (isAuthenticated === null) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>; // Or a spinner
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
