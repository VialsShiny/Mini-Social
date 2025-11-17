export default function _500() {
    return (
        <div className="bg-gray-100 text-gray-800 h-screen flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold">500</h1>
            <p className="text-xl mt-4">Erreur du serveur</p>
            <a
                href="/"
                className="mt-6 text-gray-800 underline hover:text-gray-600"
            >
                Retour à l’accueil
            </a>
        </div>
    );
}
