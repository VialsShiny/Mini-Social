import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { FiHome, FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProviders';

export const NavBar = () => {
    const { currentUser, setCurrentUser, isAuthenticate } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticate);
    const isDesktop = useMediaQuery('(min-width:1024px)');

    // eslint-disable-next-line no-unused-vars
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    function handleLogOut() {
        localStorage.clear();
        setIsAuthenticated(false);
        setToken(null);
        setCurrentUser(null);
    }

    return isDesktop ? (
        <nav
            className="w-full bg-white border-b border-gray-200 shadow-sm"
            role="navigation"
            aria-label="Navigation principale"
        >
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
                                {/* Infos utilisateur */}
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50 border border-gray-200"
                                    aria-label={`Profil de : ${currentUser.username}`}
                                >
                                    <img
                                        src={currentUser.image_url}
                                        alt={currentUser.username}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="text-gray-700 text-sm font-medium">
                                        {currentUser.username}
                                    </span>
                                </Link>

                                <button
                                    className="px-3 py-2 rounded-md text-sm font-medium border border-red-500 text-red-500 hover:bg-red-50 hover:border-red-600"
                                    onClick={() => {
                                        handleLogOut(
                                            currentUser,
                                            isAuthenticate,
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
    ) : (
        <nav
            className="
                fixed bottom-0 left-0 right-0
                bg-white border-t border-gray-200 shadow-lg
                z-50
            "
            role="navigation"
            aria-label="Navigation principale"
        >
            <ul
                className="
                    flex justify-around items-center
                    h-16
                    text-gray-700
                "
            >
                {/* Accueil */}
                <li>
                    <Link
                        to="/"
                        className="flex flex-col items-center p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        aria-label="Accueil"
                    >
                        <FiHome size={22} />
                        <span className="sr-only">Accueil</span>
                    </Link>
                </li>

                {isAuthenticated ? (
                    <>
                        {/* Avatar (non cliquable) */}
                        <li>
                            <Link
                                to="/profile"
                                className="
                                    flex flex-col items-center p-2
                                    focus:outline-none focus-visible:ring-2
                                "
                                aria-label={`Profile de ${currentUser.username}`}
                            >
                                <img
                                    src={currentUser.image_url}
                                    alt={`Avatar de ${currentUser.username}`}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="sr-only">
                                    {currentUser.username}
                                </span>
                            </Link>
                        </li>

                        {/* Logout */}
                        <li>
                            <button
                                onClick={() => handleLogOut(currentUser)}
                                className="flex flex-col items-center p-2 text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                                aria-label="Se déconnecter"
                            >
                                <FiLogOut size={22} />
                                <span className="sr-only">Logout</span>
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        {/* Sign in */}
                        <li>
                            <Link
                                to="/signin"
                                className="flex flex-col items-center p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                aria-label="Se connecter"
                            >
                                <FiLogIn size={22} />
                                <span className="sr-only">Sign In</span>
                            </Link>
                        </li>

                        {/* Sign up */}
                        <li>
                            <Link
                                to="/signup"
                                className="flex flex-col items-center p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                aria-label="Créer un compte"
                            >
                                <FiUserPlus size={22} />
                                <span className="sr-only">Sign Up</span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};
