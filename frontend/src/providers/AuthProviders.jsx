import {createContext, useContext, useEffect, useState} from 'react';
import {fetchData} from '../components/services/Fetch';
import {Loader} from '../components/ui/Loader';

const AuthContext = createContext();

export const AuthProviders = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function validateToken() {
            if (!token) return setLoading(false);
            fetchData(`${apiUrl}api/auth/me`, {
                headers: {Authorization: `Bearer ${token}`},
            })
                .then((data) => {
                    const {user} = data;
                    setLoading(false);
                    return setCurrentUser(user);
                })
                .catch((error) => {
                    setLoading(false);
                    localStorage.removeItem('token');
                    console.log(error);
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
