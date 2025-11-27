import { createContext, useContext, useEffect, useState } from 'react';
import { fetchData } from '../components/services/Fetch';
import throwError from '../components/services/throwError';
import { Loader } from '../components/ui/Loader';

const AuthContext = createContext();

export const AuthProviders = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function validateToken() {
            const apiUrl = import.meta.env.VITE_API_URL;
            const token = localStorage.getItem('token') || null;
            if (!token) {return setLoading(false);}
            fetchData(`${apiUrl}api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((data) => {
                    const { user } = data;
                    setLoading(false);
                    return setCurrentUser(user);
                })
                .catch((error) => {
                    setLoading(false);
                    localStorage.removeItem('token');
                    throwError(error);
                });
        }

        validateToken();
    }, []);

    const value = {
        currentUser,
        setCurrentUser,
        isAuthenticate: currentUser ? true : false,
        loading,
    };

    if (loading) {
        return (
            <AuthContext.Provider value={value}>
                <Loader />
            </AuthContext.Provider>
        );
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => {
    return useContext(AuthContext);
};
