export default function BottomSheet({
    children,
    IsOpen,
    setIsOpen,
    title,
    extra,
}) {
    return (
        <aside
            className={`z-99 fixed left-0 right-0 bottom-0 bg-white rounded-t-2xl shadow-xl transition-transform duration-300 ease-out flex flex-col ${
                IsOpen ? 'translate-y-0' : 'translate-y-full'
            } h-full max-h-[88vh]`}
        >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800">
                        {title}
                    </h3>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-xs text-gray-500 hover:text-gray-700"
                    >
                        Fermer
                    </button>
                </div>

                {extra}
            </div>

            {children}
        </aside>
    );
}
