import {useState} from 'react';
import {fetchData} from '../components/Fetch';

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        image_url: `https://i.pravatar.cc/150?img=${
            Math.floor(Math.random() * 70) + 1
        }`,
        email: '',
        password: '',
    });

    function handleOnChangeInput(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        try {
            fetchData('http://localhost:3000/api/auth/register', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((data) => {
                    console.log(data.message);
                    const JWTtoken = data.token;
                    localStorage.setItem('token', JWTtoken);
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1500);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Créer un compte
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
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
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-gray-500"
                            name="username"
                            onChange={(e) => {
                                handleOnChangeInput(e);
                            }}
                        />
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
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-gray-500"
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
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-gray-500"
                            name="password"
                            onChange={(e) => {
                                handleOnChangeInput(e);
                            }}
                        />
                    </div>

                    <input
                        type="submit"
                        value="S'inscrire"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
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
    );
}
