import {useState} from 'react';
import {Loader} from '../components/Loader';
import {useAuth} from '../providers/AuthProviders';

export default function ProfilePage() {
    const {currentUser, setCurrentUser, isAuthenticate} = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticate);
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
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
            {/* Card Profil */}
            <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 flex flex-col items-center">
                {/* Avatar */}
                <img
                    src={image_url}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                />

                {/* Nom */}
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                    {username}
                </h2>

                {/* Email */}
                <p className="mt-1 text-gray-500">{email}</p>

                {/* Date de création */}
                <p className="mt-1 text-gray-400 text-sm">
                    Membre depuis : {created_at}
                </p>

                {/* Boutons */}
                <div className="mt-6 flex space-x-4">
                    <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                        Éditer le profil
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        onClick={handleLogOut}
                    >
                        {token ? 'Déconnexion' : <Loader loader="spinner" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
