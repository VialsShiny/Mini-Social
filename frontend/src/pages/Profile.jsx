import useMediaQuery from '@mui/material/useMediaQuery';
import {useState} from 'react';
import {MdEdit} from 'react-icons/md';
import {Loader} from '../components/Loader';
import MobileOverlay from '../components/MobileOverlay';
import {useAuth} from '../providers/AuthProviders';

export default function ProfilePage() {
    const isDesktop = useMediaQuery('(min-width:1024px)');

    const {currentUser, setCurrentUser, isAuthenticate} = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticate);
    const [isOpen, setIsOpen] = useState(isDesktop);
    const {username, image_url, email, created_at} = currentUser;
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [locationData] = useState(location.state);

    function handleLogOut() {
        localStorage.clear();
        setIsAuthenticated(false);
        setToken(null);
        setTimeout(() => {
            window.location.href = locationData?.from?.pathname || '/';
            setCurrentUser(null);
        }, 1500);
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6 space-y-6">
            {/* Card Profil */}
            <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 flex flex-col items-center">
                {/* Avatar avec bouton edit */}
                <div className="relative">
                    <img
                        src={image_url}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <button
                        className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition shadow-lg"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <MdEdit />
                    </button>
                </div>

                {/* Nom avec bouton edit */}
                <div className="mt-4 flex items-center gap-2 group">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {username}
                    </h2>
                    <button
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 transition"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <MdEdit />
                    </button>
                </div>

                {/* Email */}
                <div className="mt-1 flex items-center gap-2">
                    <p className="text-gray-500">{email}</p>
                </div>

                {/* Date de création */}
                <p className="mt-4 text-gray-400 text-sm">
                    Membre depuis : {created_at}
                </p>

                {/* Boutons */}
                <div className="mt-6 flex flex-col sm:flex-row w-full sm:w-auto space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                        className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        Éditer le profil
                    </button>
                    <button
                        className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                        onClick={handleLogOut}
                    >
                        {token ? 'Déconnexion' : <Loader loader="spinner" />}
                    </button>
                </div>
            </div>

            {isOpen ? (
                // Card Edit Profil
                isDesktop ? (
                    <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 flex flex-col items-center overflow-hidden">
                        {/* Photo de profil */}
                        <div className="relative mb-6">
                            <img
                                src={image_url}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                            />
                            <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition shadow-lg">
                                <MdEdit />
                            </button>
                        </div>

                        {/* Nom d'utilisateur */}
                        <div className="w-full mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nom d'utilisateur
                            </label>
                            <input
                                type="text"
                                defaultValue={username}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Votre nom d'utilisateur"
                            />
                        </div>

                        {/* URL Avatar */}
                        <div className="w-full mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL de la photo de profil
                            </label>
                            <input
                                type="text"
                                defaultValue={image_url}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://exemple.com/avatar.jpg"
                            />
                        </div>

                        {/* Boutons */}
                        <div className="w-full flex gap-3">
                            <button
                                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Annuler
                            </button>
                            <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition">
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div
                            className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40 ${
                                isOpen
                                    ? 'opacity-100 visible'
                                    : 'opacity-0 invisible'
                            }`}
                            onClick={() => setIsOpen(false)}
                        ></div>

                        <MobileOverlay
                            IsOpen={isOpen}
                            setIsOpen={setIsOpen}
                            title="Modifier le profil"
                        >
                            {/* Photo de profil */}
                            <div className="relative mb-6 flex justify-center px-4 py-3">
                                <img
                                    src={image_url}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                                />
                                <button className="absolute bottom-0 right-1/2 translate-x-12 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition shadow-lg">
                                    <MdEdit />
                                </button>
                            </div>

                            {/* Nom d'utilisateur */}
                            <div className="w-full mb-4 px-4 py-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom d'utilisateur
                                </label>
                                <input
                                    type="text"
                                    defaultValue={username}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Votre nom d'utilisateur"
                                />
                            </div>

                            {/* URL Avatar */}
                            <div className="w-full mb-6 px-4 py-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    URL de la photo de profil
                                </label>
                                <input
                                    type="text"
                                    defaultValue={image_url}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://exemple.com/avatar.jpg"
                                />
                            </div>

                            {/* Boutons */}
                            <div className="w-full flex gap-3 px-4 py-3">
                                <button
                                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Annuler
                                </button>
                                <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition">
                                    Sauvegarder
                                </button>
                            </div>
                        </MobileOverlay>
                    </>
                )
            ) : (
                ''
            )}
        </div>
    );
}
