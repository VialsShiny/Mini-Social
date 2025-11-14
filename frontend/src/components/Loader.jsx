export const Loader = ({loader = ''}) => {
    switch (loader) {
        case 'dote':
            return (
                <div className="flex justify-center items-center py-16">
                    <div className="flex space-x-2">
                        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" />
                    </div>
                </div>
            );

        case 'rainbow':
            return (
                <div className="flex items-center justify-center h-screen bg-gray-50">
                    <div className="relative w-16 h-16">
                        <div className="absolute w-full h-full rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
                        <div className="absolute w-full h-full rounded-full border-4 border-b-transparent border-green-500 animate-[spin_1.2s_reverse_linear_infinite]"></div>
                        <div className="absolute w-full h-full rounded-full border-4 border-l-transparent border-pink-500 animate-[spin_1.8s_linear_infinite]"></div>
                        <div className="absolute w-full h-full rounded-full border-4 border-r-transparent border-yellow-500 animate-[spin_2.5s_reverse_linear_infinite]"></div>
                    </div>
                </div>
            );

        case 'post-loading-gray':
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse">
                        {/* Header */}
                        <div className="flex items-center p-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            <div className="ml-3">
                                <div className="h-3 bg-gray-300 rounded w-24 mb-2"></div>
                                <div className="h-2 bg-gray-200 rounded w-16"></div>
                            </div>
                        </div>

                        {/* Image placeholder */}
                        <div className="w-full h-64 bg-gray-300"></div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 px-3 py-3">
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        </div>

                        {/* Caption */}
                        <div className="px-3 pb-4 space-y-2">
                            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            );

        case 'post-loading-rainbow':
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                    <div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center p-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            <div className="ml-3 flex flex-col">
                                <div className="h-3 bg-gray-300 rounded w-24 mb-2"></div>
                                <div className="h-2 bg-gray-200 rounded w-16"></div>
                            </div>
                        </div>

                        {/* Image placeholder with multicolor wave + moving texts */}
                        <div className="relative w-full h-64 bg-gray-300 overflow-hidden">
                            {/* multicolor wave background */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 opacity-90"
                                style={{
                                    background:
                                        'linear-gradient(90deg,#ff6b6b 0%, #f7b32b 25%, #6bffb8 50%, #6bd0ff 75%, #b56bff 100%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'wave 5s linear infinite',
                                    mixBlendMode: 'normal',
                                    filter: 'saturate(1.1) blur(6px)',
                                }}
                            />

                            {/* subtle overlay to keep skeleton feel */}
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30" />

                            {/* moving small texts */}
                            <div className="absolute inset-0 pointer-events-none">
                                <span
                                    className="absolute text-xs font-medium text-white/90"
                                    style={{
                                        top: '12%',
                                        left: '100%',
                                        whiteSpace: 'nowrap',
                                        animation: 'marquee 9s linear infinite',
                                        textShadow:
                                            '0 1px 6px rgba(0,0,0,0.45)',
                                    }}
                                >
                                    @utilisateur • Beau spot !
                                </span>

                                <span
                                    className="absolute text-xs font-medium text-white/85"
                                    style={{
                                        top: '45%',
                                        left: '120%',
                                        whiteSpace: 'nowrap',
                                        animation:
                                            'marquee 11s linear -2s infinite',
                                        textShadow:
                                            '0 1px 6px rgba(0,0,0,0.45)',
                                    }}
                                >
                                    #vacances #photo
                                </span>

                                <span
                                    className="absolute text-xs font-medium text-white/80"
                                    style={{
                                        top: '70%',
                                        left: '110%',
                                        whiteSpace: 'nowrap',
                                        animation:
                                            'marquee 8s linear -1s infinite',
                                        textShadow:
                                            '0 1px 6px rgba(0,0,0,0.45)',
                                    }}
                                >
                                    Légende en cours de chargement...
                                </span>
                            </div>

                            {/* pulse to keep skeleton feeling */}
                            <div className="absolute inset-0 animate-pulse" />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 px-3 py-3">
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        </div>

                        {/* Caption */}
                        <div className="px-3 pb-4 space-y-2">
                            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </div>

                        {/* Inline styles for keyframes (put in global CSS if you prefer) */}
                        <style>{`
                @keyframes wave {
                  0% { background-position: 0% 50%; transform: rotate(0.01deg); }
                  50% { background-position: 100% 50%; transform: rotate(0.2deg); }
                  100% { background-position: 0% 50%; transform: rotate(-0.01deg); }
                }

                @keyframes marquee {
                  0%   { transform: translateX(0%); opacity: 0; }
                  5%   { opacity: 1; }
                  100% { transform: translateX(-220%); opacity: 0.9; }
                }

                /* Optional: make wave look more fluid on some browsers */
                .wave-smooth { will-change: background-position, transform; }
        `}</style>
                    </div>
                </div>
            );

        case 'fullscreen-rainbow':
            return (
                <div
                    aria-busy="true"
                    role="status"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                >
                    {/* Container that keeps everything centered */}
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        {/* Multicolor moving waves (several layers for depth) */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-0"
                            style={{
                                background:
                                    'linear-gradient(90deg,#ff6b6b 0%, #f7b32b 20%, #6bffb8 40%, #6bd0ff 60%, #b56bff 80%, #ff6b6b 100%)',
                                backgroundSize: '300% 300%',
                                filter: 'blur(32px) saturate(1.15)',
                                opacity: 0.9,
                                animation: 'rainbowShift 8s linear infinite',
                                mixBlendMode: 'screen',
                            }}
                        />

                        <div
                            aria-hidden="true"
                            className="absolute inset-0"
                            style={{
                                background:
                                    'linear-gradient(120deg,#ffd3a5 0%, #c4f0c5 30%, #c6e7ff 60%, #d8b3ff 100%)',
                                backgroundSize: '200% 200%',
                                filter: 'blur(48px) saturate(1.05)',
                                opacity: 0.55,
                                animation:
                                    'rainbowShiftRev 11s linear infinite',
                                mixBlendMode: 'overlay',
                            }}
                        />

                        {/* Optional central glowing blob */}
                        <div
                            aria-hidden="true"
                            className="absolute w-[32rem] h-[32rem] rounded-full opacity-40"
                            style={{
                                background:
                                    'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 20%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.08), transparent 30%)',
                                animation: 'blobFloat 10s ease-in-out infinite',
                                mixBlendMode: 'color-dodge',
                                filter: 'blur(28px)',
                            }}
                        />

                        {/* Content: spinner + marquee texts */}
                        <div className="relative z-10 flex flex-col items-center gap-6 pointer-events-none">
                            {/* Big multicolor spinner */}
                            <div className="relative w-28 h-28">
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        border: '6px solid rgba(255,255,255,0.06)',
                                        boxShadow:
                                            'inset 0 0 40px rgba(255,255,255,0.04)',
                                    }}
                                />
                                <div
                                    className="absolute inset-2 rounded-full"
                                    style={{
                                        borderTop:
                                            '6px solid rgba(255,255,255,0.95)',
                                        borderRight: '6px solid transparent',
                                        borderBottom:
                                            '6px solid rgba(255,255,255,0.6)',
                                        borderLeft: '6px solid transparent',
                                        animation:
                                            'multiSpin 1.6s linear infinite',
                                        filter: 'saturate(1.2)',
                                    }}
                                />
                            </div>

                            {/* Loading label */}
                            <div className="text-white text-sm font-medium tracking-wide drop-shadow-md">
                                Chargement en cours...
                            </div>

                            {/* Marquee texts container (covers width) */}
                            <div className="w-full max-w-4xl px-6">
                                {/* Line 1 */}
                                <div className="relative overflow-hidden h-6 mb-3">
                                    <div
                                        className="absolute whitespace-nowrap text-xs font-semibold"
                                        style={{
                                            color: 'white',
                                            textShadow:
                                                '0 2px 10px rgba(0,0,0,0.6)',
                                            transform: 'translateX(100%)',
                                            animation:
                                                'marqueeLeft 10s linear infinite',
                                        }}
                                    >
                                        @utilisateur • Beau spot ! • #vacances •
                                        @autrePseudo • ✨
                                    </div>
                                </div>

                                {/* Line 2 (different speed/direction) */}
                                <div className="relative overflow-hidden h-6 mb-3">
                                    <div
                                        className="absolute whitespace-nowrap text-xs font-medium"
                                        style={{
                                            color: 'rgba(255,255,255,0.95)',
                                            textShadow:
                                                '0 2px 10px rgba(0,0,0,0.45)',
                                            transform: 'translateX(-120%)',
                                            animation:
                                                'marqueeRight 14s linear infinite',
                                        }}
                                    >
                                        Légende en cours de chargement... •
                                        #photography • Loading...
                                    </div>
                                </div>

                                {/* Line 3 (faster) */}
                                <div className="relative overflow-hidden h-6">
                                    <div
                                        className="absolute whitespace-nowrap text-xs font-medium"
                                        style={{
                                            color: 'rgba(255,255,255,0.9)',
                                            textShadow:
                                                '0 2px 8px rgba(0,0,0,0.4)',
                                            transform: 'translateX(100%)',
                                            animation:
                                                'marqueeLeft 8s linear -1s infinite',
                                        }}
                                    >
                                        • swipe up • new post • soon • stay
                                        tuned •
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Inline keyframes & tweaks */}
                        <style>{`
          @keyframes rainbowShift {
            0% { background-position: 0% 50%; transform: rotate(-0.5deg); }
            50% { background-position: 100% 50%; transform: rotate(0.5deg); }
            100% { background-position: 0% 50%; transform: rotate(-0.5deg); }
          }

          @keyframes rainbowShiftRev {
            0% { background-position: 100% 50%; transform: rotate(0.3deg); }
            50% { background-position: 0% 50%; transform: rotate(-0.3deg); }
            100% { background-position: 100% 50%; transform: rotate(0.3deg); }
          }

          @keyframes blobFloat {
            0% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-18px) scale(1.03); }
            100% { transform: translateY(0px) scale(1); }
          }

          @keyframes multiSpin {
            0% { transform: rotate(0deg); filter: hue-rotate(0deg) saturate(1.2); }
            50% { transform: rotate(180deg); filter: hue-rotate(120deg) saturate(1.3); }
            100% { transform: rotate(360deg); filter: hue-rotate(240deg) saturate(1.2); }
          }

          @keyframes marqueeLeft {
            0%   { transform: translateX(100%); opacity: 0; }
            5%   { opacity: 1; }
            100% { transform: translateX(-220%); opacity: 0.95; }
          }

          @keyframes marqueeRight {
            0%   { transform: translateX(-120%); opacity: 0; }
            5%   { opacity: 1; }
            100% { transform: translateX(220%); opacity: 0.95; }
          }

          /* Small responsive tweak for very small screens */
          @media (max-width: 420px) {
            .relative.z-10 .w-28 { width: 5.5rem; height: 5.5rem; }
          }
        `}</style>
                    </div>
                </div>
            );

        case 'post-load':
            return (
                <article className="max-w-lg w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden font-sans animate-pulse">
                    {/* Header auteur */}
                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-300"></div>

                            <div className="space-y-1">
                                <div className="w-24 h-3 bg-gray-300 rounded"></div>
                                <div className="w-16 h-2 bg-gray-200 rounded"></div>
                            </div>
                        </div>

                        <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    </div>

                    {/* Image du post */}
                    <div className="w-full h-64 bg-gray-300"></div>

                    {/* Contenu */}
                    <div className="p-3">
                        {/* Boutons */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4">
                                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                            </div>

                            <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        </div>

                        {/* Likes */}
                        <div className="w-32 h-3 bg-gray-300 rounded mb-3"></div>

                        {/* Texte */}
                        <div className="space-y-2 mb-3">
                            <div className="w-20 h-3 bg-gray-300 rounded"></div>
                            <div className="w-full h-3 bg-gray-200 rounded"></div>
                            <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                        </div>

                        {/* Date */}
                        <div className="w-16 h-2 bg-gray-300 rounded"></div>
                    </div>
                </article>
            );

        default:
            return (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-46 w-46 border-t-8 border-blue-500 border-solid border-gray-300"></div>
                </div>
            );
    }
};
