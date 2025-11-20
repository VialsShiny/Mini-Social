import {useState} from 'react';
import {MdEdit} from 'react-icons/md';

export default function ProfileForm({username, image_url, onClose}) {
    const [name, setName] = useState(username);
    const [avatar, setAvatar] = useState(image_url);

    const handleSubmit = (e) => {
        e.preventDefault();

        // ⚠️ Exemple : ici tu mets ta logique d’enregistrement
        console.log('New profile:', {name, avatar});

        onClose();
    };

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
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition shadow-lg"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre nom d'utilisateur"
                />
            </div>

            {/* Champ avatar */}
            <div className="w-full mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de la photo de profil
                </label>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://exemple.com/avatar.jpg"
                    />
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition px-4">
                        Choisir
                    </button>
                </div>
            </div>

            {/* Boutons */}
            <div className="w-full flex gap-3">
                <button
                    type="button"
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
                    onClick={onClose}
                >
                    Annuler
                </button>

                <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition"
                >
                    Sauvegarder
                </button>
            </div>
        </form>
    );
}
