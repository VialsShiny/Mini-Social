export default function _404() {
    return (
        <div className="bg-gray-100 text-gray-800 h-screen flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl mt-4">Page non trouvée</p>
            <a
                href="/"
                className="mt-6 text-gray-800 underline hover:text-gray-600"
            >
                Retour à l’accueil
            </a>
        </div>
    );
}
