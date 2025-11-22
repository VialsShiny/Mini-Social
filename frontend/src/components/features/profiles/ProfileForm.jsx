import {useRef, useState} from 'react';
import {MdEdit} from 'react-icons/md';
import {useAuth} from '../../../providers/AuthProviders';
import {fetchData} from '../../services/Fetch';

export default function ProfileForm({username, image_url, onClose}) {
    const [name, setName] = useState(username);
    const [avatar, setAvatar] = useState(image_url);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({name: '', avatar: ''});
    const [succes, setSucces] = useState(false);

    const initialName = useRef(username);
    const initialAvatar = useRef(image_url);

    const {setCurrentUser} = useAuth();
    const token = localStorage.getItem('token');
    const apiUrl = import.meta.env.VITE_API_URL;

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const nameChanged = name !== initialName.current;
        const avatarChanged = avatar !== initialAvatar.current;

        if (name.trim() === '') {
            setErrors({...errors, name: 'Le nom ne peut pas être vide.'});
            setSucces(false);
            setIsLoading(false);
            return;
        }

        const urlRegex = /^https?:\/\/[^\s]+$/i;
        if (avatar.trim() !== '' && !urlRegex.test(avatar)) {
            setErrors({...errors, avatar: "URL d'avatar invalide."});
            setSucces(false);
            setIsLoading(false);
            return;
        }

        if (!nameChanged && !avatarChanged)
            return setSucces(false) || setIsLoading(false);

        const newData = {};
        if (nameChanged) newData.username = name;
        if (avatarChanged) newData.image_url = avatar;

        const data = await fetchData(`${apiUrl}api/auth/update-profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newData),
        });

        if (!data || data.error) {
            console.log(data);
            setIsLoading(false);
            return;
        } else {
            setCurrentUser(data.user);

            setSucces(true);
            setIsLoading(false);

            initialName.current = data.user.username;
            initialAvatar.current = data.user.image_url;
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center px-4 py-3"
        >
            {/* Photo de profil */}
            <div className="relative mb-6 flex justify-center">
                <img
                    src={avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                />
                <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition shadow-lg disabled:bg-blue-700 disabled:hover:bg-blue-900"
                    disabled={isLoading}
                >
                    <MdEdit />
                </button>
            </div>

            {/* Champ nom */}
            <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom d'utilisateur
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-3 py-2 border ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Votre nom d'utilisateur"
                    disabled={isLoading}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            {/* Champ avatar */}
            <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de la photo de profil
                </label>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        className={`w-full px-3 py-2 border ${
                            errors.avatar ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="https://exemple.com/avatar.jpg"
                        disabled={isLoading}
                    />
                    <button
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition px-4 disabled:bg-blue-700 disabled:hover:bg-blue-900"
                        disabled={isLoading}
                    >
                        Choisir
                    </button>
                </div>
                {errors.avatar && (
                    <p className="text-red-500">{errors.avatar}</p>
                )}
            </div>

            {/* Boutons */}
            <div className="w-full flex gap-3 mb-6">
                <button
                    type="button"
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Annuler
                </button>

                <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition disabled:bg-blue-700 disabled:hover:bg-blue-900"
                    disabled={isLoading}
                >
                    {isLoading ? 'Chargement...' : 'Sauvegarder'}
                </button>
            </div>

            {succes && (
                <div
                    role="alert"
                    aria-label="update message"
                    className="w-full px-4 py-4 bg-green-500/30 ring-1 ring-green-500 rounded"
                >
                    <p className="text-green-800">
                        Votre profil a été mis à jours avec succes !
                    </p>
                </div>
            )}
        </form>
    );
}
