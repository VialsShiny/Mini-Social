import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { MdEdit } from 'react-icons/md';
import ProfileForm from '../components/features/profiles/ProfileForm';
import MobileOverlay from '../components/layout/MobileOverlay';
import { Loader } from '../components/ui/Loader';
import { useAuth } from '../providers/AuthProviders';

export default function ProfilePage() {
    const isDesktop = useMediaQuery('(min-width:1024px)');

    const { currentUser, setCurrentUser, isAuthenticate } = useAuth();
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticate);
    const [isOpen, setIsOpen] = useState(isDesktop);
    const { username, image_url, email, created_at } = currentUser;
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
        <>
            <Helmet>
                <title>Profil de {username} — Mini Social</title>
                <meta
                    name="description"
                    content={`Découvrez le profil de ${username} sur Mini Social : ses publications, ses centres d'intérêt et son activité au sein de la communauté.`}
                />
                <meta
                    property="og:title"
                    content={`Profil de ${username} — Mini Social`}
                />
                <meta
                    property="og:description"
                    content={`Découvrez le profil de ${username} sur Mini Social : ses publications, ses centres d'intérêt et son activité au sein de la communauté.`}
                />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content={`Profil de ${username} — Mini Social`}
                />
                <meta
                    name="twitter:description"
                    content={`Découvrez le profil de ${username} sur Mini Social : ses publications, ses centres d'intérêt et son activité au sein de la communauté.`}
                />
            </Helmet>

            <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6 space-y-6">
                {/* Card Profil */}
                <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 flex flex-col items-center z-30">
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
                    <div className="mt-4 flex items-center gap-2">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {username}
                        </h2>
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
                            {token ? (
                                'Déconnexion'
                            ) : (
                                <Loader loader="spinner" />
                            )}
                        </button>
                    </div>
                </div>

                {!isDesktop && (
                    <div
                        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40 ${
                            isOpen
                                ? 'opacity-100 visible'
                                : 'opacity-0 invisible'
                        }`}
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {isDesktop ? (
                    <div
                        className={`bg-white shadow-md rounded-lg w-full p-6 max-w-md flex flex-col items-center overflow-hidden z-1 transition-all duration-500 ${
                            isOpen
                                ? 'translate-0 scale-100'
                                : '-translate-y-100 scale-5'
                        }`}
                    >
                        <ProfileForm
                            username={username}
                            image_url={image_url}
                            onClose={() => setIsOpen(false)}
                        />
                    </div>
                ) : (
                    <MobileOverlay
                        IsOpen={isOpen}
                        setIsOpen={setIsOpen}
                        title="Modifier le profil"
                    >
                        <ProfileForm
                            username={username}
                            image_url={image_url}
                            onClose={() => setIsOpen(false)}
                        />
                    </MobileOverlay>
                )}
            </div>
        </>
    );
}
