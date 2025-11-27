import {useState} from 'react';
import {Helmet} from 'react-helmet';
import {fetchData} from '../components/services/Fetch';
import {ShowError} from '../components/ui/ShowError';
import validateInput from '../components/utils/ValidateInput';

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        image_url: `https://i.pravatar.cc/150?img=${
            Math.floor(Math.random() * 70) + 1
        }`,
        email: '',
        password: '',
    });
    const [displayError, setDisplayError] = useState({
        username: '',
        email: '',
        password: '',
        other: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    function handleOnChangeInput(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        const isValid = validateInput(name, value);
        setDisplayError({
            ...displayError,
            [name]: isValid,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const apiUrl = import.meta.env.VITE_API_URL;
        const {username, email, password} = formData;

        const errors = {
            username: username ? null : 'Veuillez entrer un nom d’utilisateur.',
            email: email ? null : 'Veuillez entrer votre adresse e-mail.',
            password: password ? null : 'Veuillez entrer votre mot de passe.',
        };

        const hasEmptyFields = Object.values(errors).some(
            (err) => err !== null
        );
        if (hasEmptyFields) {
            setDisplayError({
                ...displayError,
                ...errors,
                other: 'Veuillez remplir tous les champs.',
            });
            setIsLoading(false);
            return;
        }

        const usernameValidation = validateInput('username', username);
        const emailValidation = validateInput('email', email);
        const passwordValidation = validateInput('password', password);

        const validationErrors = {
            username: usernameValidation === true ? null : usernameValidation,
            email: emailValidation === true ? null : emailValidation,
            password: passwordValidation === true ? null : passwordValidation,
        };

        const hasErrors = Object.values(validationErrors).some(
            (err) => err !== false
        );

        if (hasErrors) {
            setDisplayError(validationErrors);
            setIsLoading(false);
            return;
        }

        try {
            const data = await fetchData(`${apiUrl}api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!data) {
                setDisplayError((prev) => ({
                    ...prev,
                    other: 'Réponse inattendue du serveur.',
                }));
                return;
            }

            if (data.error) {
                setDisplayError((prev) => ({
                    ...prev,
                    other: data.message || 'Impossible de créer le compte.',
                }));
                setIsLoading(false);
                return;
            }

            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            setDisplayError({username: '', email: '', password: '', other: ''});
            setTimeout(() => {
                window.location.href = '/';
                setIsLoading(false);
            }, 1500);
        } catch (error) {
            setDisplayError((prev) => ({
                ...prev,
                username: error.message || 'Erreur réseau.',
            }));
            setIsLoading(false);
        }
    }

    return (
        <>
            <Helmet>
                <title>Inscription — Mini Social</title>
                <meta
                    name="description"
                    content="Créez un compte sur Mini Social pour rejoindre la communauté, publier vos posts et interagir avec les autres utilisateurs."
                />

                {/* Open Graph */}
                <meta property="og:title" content="Inscription — Mini Social" />
                <meta
                    property="og:description"
                    content="Créez un compte sur Mini Social pour rejoindre la communauté, publier vos posts et interagir avec les autres utilisateurs."
                />
                <meta property="og:type" content="website" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content="Inscription — Mini Social"
                />
                <meta
                    name="twitter:description"
                    content="Créez un compte sur Mini Social pour rejoindre la communauté, publier vos posts et interagir avec les autres utilisateurs."
                />
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-sm md:max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-md border">
                    <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
                        Créer un compte
                    </h2>

                    <form
                        className="space-y-5"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Pseudo
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Votre pseudo"
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-gray-500 ${
                                    displayError.username
                                        ? 'border-red-500'
                                        : ''
                                }`}
                                name="username"
                                value={formData.username}
                                onChange={handleOnChangeInput}
                            />
                            {displayError.username && (
                                <ShowError
                                    name="username"
                                    content={displayError.username}
                                />
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Adresse e-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="exemple@email.com"
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-gray-500 ${
                                    displayError.email ? 'border-red-500' : ''
                                }`}
                                name="email"
                                value={formData.email}
                                onChange={handleOnChangeInput}
                            />
                            {displayError.email && (
                                <ShowError
                                    name="email"
                                    content={displayError.email}
                                />
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-gray-500 ${
                                    displayError.password
                                        ? 'border-red-500'
                                        : ''
                                }`}
                                name="password"
                                value={formData.password}
                                onChange={handleOnChangeInput}
                            />
                            {displayError.password && (
                                <ShowError
                                    name="password"
                                    content={displayError.password}
                                />
                            )}
                        </div>

                        <input
                            type="submit"
                            value={
                                isLoading
                                    ? 'Création du compte...'
                                    : "S'inscrire"
                            }
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-500"
                            disabled={isLoading}
                        />
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Déjà un compte ?{' '}
                        <a href="#" className="text-indigo-600 hover:underline">
                            Se connecter
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
