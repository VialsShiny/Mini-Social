import {useState} from 'react';
import {Helmet} from 'react-helmet';
import {useLocation, useNavigate} from 'react-router-dom';
import {ShowError} from '../components/ui/ShowError';
import {fetchData} from './../components/services/Fetch';
import validateInput from './../components/utils/ValidateInput';

export default function SignIn() {
    const [displayError, setDisplayError] = useState({
        other: '',
    });
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [locationData] = useState(location.state);

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
        const {email, password} = formData;
        const apiUrl = import.meta.env.VITE_API_URL;

        if (!email || !password) {
            setDisplayError({
                email: email ? null : 'Veuillez entrer votre adresse e-mail.',
                password: password
                    ? null
                    : 'Veuillez entrer votre mot de passe.',
            });
            setIsLoading(false);
            return;
        }

        const emailValidation = validateInput('email', email);
        const passwordValidation = validateInput('password', password);

        const errors = {
            email: emailValidation === true ? null : emailValidation,
            password: passwordValidation === true ? null : passwordValidation,
        };

        const hasErrors = Object.values(errors).some((err) => err == null);

        if (hasErrors) {
            setDisplayError(errors);
            setIsLoading(false);
            return;
        }

        try {
            const data = await fetchData(`${apiUrl}api/auth/login`, {
                method: 'POST',
                header: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            if (data.error) {
                setDisplayError({
                    ...displayError,
                    email: true,
                    password: true,
                    other: data.message,
                });
                setIsLoading(false);
                return;
            }

            localStorage.setItem('token', data.token);
            setTimeout(() => {
                window.location.href = locationData?.from?.pathname || '/';
                setIsLoading(false);
            }, 1500);
        } catch (error) {
            setDisplayError({
                ...displayError,
                email: error.message,
                password: true,
            });
            setIsLoading(false);
        }
    }

    return (
        <>
            <Helmet>
                <title>Connexion — Mini Social</title>
                <meta
                    name="description"
                    content="Connectez-vous à votre compte Mini Social pour accéder à votre flux de posts et interagir avec la communauté."
                />
                <meta property="og:title" content="Connexion — Mini Social" />
                <meta
                    property="og:description"
                    content="Connectez-vous à votre compte Mini Social pour accéder à votre flux de posts et interagir avec la communauté."
                />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Connexion — Mini Social" />
                <meta
                    name="twitter:description"
                    content="Connectez-vous à votre compte Mini Social pour accéder à votre flux de posts et interagir avec la communauté."
                />
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-sm md:max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-md border">
                    <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
                        Se connecter
                    </h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
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
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
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
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
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
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <label className="flex items-center text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    className="mr-2 rounded border-gray-300"
                                    disabled
                                />
                                Se souvenir de moi
                            </label>
                            <a
                                href="#"
                                className="text-sm text-indigo-600 hover:underline"
                            >
                                Mot de passe oublié ?
                            </a>
                        </div>
                        <input
                            type="submit"
                            value={isLoading ? 'Connexion...' : 'Se connecter'}
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-500"
                            disabled={isLoading}
                        />

                        {displayError.other && (
                            <p className="text-red-500 text-sm mt-2 flex items-center justify-center gap-1">
                                {displayError.other}
                            </p>
                        )}
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Pas encore de compte ?{' '}
                        <a
                            href="/signup"
                            className="text-indigo-600 hover:underline"
                        >
                            Créer un compte
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
