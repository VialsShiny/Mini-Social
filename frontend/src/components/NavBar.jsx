import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useAuth} from '../providers/AuthProviders';

export const NavBar = () => {
    const location = useLocation();
    const {currentUser, setCurrentUser, isAuthenticate} = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticate);

    const [token, setToken] = useState(localStorage.getItem('token') || null);

    function handleLogOut() {
        localStorage.clear();
        setIsAuthenticated(false);
        setToken(null);
        setCurrentUser(null);
    }

    return (
        <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo / titre */}
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-gray-800">
                            Mini Social
                        </h1>
                    </div>

                    {/* Menu principal */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Accueil
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Profil
                                </Link>

                                {/* Infos utilisateur */}
                                <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50 border border-gray-200">
                                    <img
                                        src={currentUser.image_url}
                                        alt={currentUser.username}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="text-gray-700 text-sm font-medium">
                                        {currentUser.username}
                                    </span>
                                </div>

                                <button
                                    className="px-3 py-2 rounded-md text-sm font-medium border border-red-500 text-red-500 hover:bg-red-50 hover:border-red-600"
                                    onClick={() => {
                                        handleLogOut(
                                            currentUser,
                                            isAuthenticate
                                        );
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/signin"
                                    className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
