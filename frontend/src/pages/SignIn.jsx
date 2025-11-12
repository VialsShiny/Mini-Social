import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {fetchData} from '../components/Fetch';

export default function SignIn() {
    const [displayError, setDisplayError] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const location = useLocation();
    const [locationData, setLocationData] = useState(location.state);

    function handleOnChangeInput(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();

        try {
            fetchData('http://localhost:3000/api/auth/login', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((data) => {
                    if (data.error) return setDisplayError(data.message);

                    const JWTtoken = data.token;
                    localStorage.setItem('token', JWTtoken);
                    setTimeout(() => {
                        window.location.href =
                            locationData?.from?.pathname || '/';
                    }, 1500);
                })
                .catch((error) => {
                    console.log(error);

                    setDisplayError(error.message);
                });
        } catch (error) {
            setDisplayError(error.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Se connecter
                </h2>

                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
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
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            name="email"
                            onChange={(e) => {
                                handleOnChangeInput(e);
                            }}
                        />
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
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            name="password"
                            onChange={(e) => {
                                handleOnChangeInput(e);
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
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
                        value="Se connecter"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                    />
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

                <span className="text-gray-300 text-sm">{displayError}</span>
            </div>
        </div>
    );
}
