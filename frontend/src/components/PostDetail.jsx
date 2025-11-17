import useMediaQuery from '@mui/material/useMediaQuery';
import { memo, useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthProviders';
import ActionButtonsPost from './ActionButtonsPost';
import { Comments } from './Comments';
import { DiffDate } from './DiffDate';
import { fetchData } from './Fetch';
import FormatForm from './FormatForm';

function PostDetail({
    author = 'default_user',
    author_image_url = `https://picsum.photos/seed/${Math.random(1, 15)}/200`,
    comments = [],
    content = '',
    created_at,
    id,
    image_url,
    likes = 0,
}) {
    const isDesktop = useMediaQuery('(min-width:1024px)');

    const apiUrl = import.meta.env.VITE_API_URL;
    const [liked, setLiked] = useState(false);
    const [shared, setShared] = useState(false);
    const [commented, setComment] = useState(false);
    const [saved, setSaved] = useState(false);
    const [IsOpen, setIsOpen] = useState(isDesktop);
    const [authorPP, setAuthorPP] = useState(author_image_url);

    const {currentUser} = useAuth();
    const currentToken = localStorage.getItem('token');
    const currentUserName = currentUser.username;
    const currentUserPP = currentUser.image_url;

    const [newLikes, setNewLikes] = useState(likes + 1);
    const [newComments, setNewComments] = useState(comments);
    useEffect(() => {
        liked
            ? setNewLikes((prev) => prev + 1)
            : setNewLikes((prev) => prev - 1);
    }, [liked]);

    async function handleComment(
        setComment,
        event,
        token,
        username,
        user_image_url,
        id
    ) {
        event.preventDefault();

        const {comment} = FormatForm(event);

        if (!comment) return;

        fetchData(`${apiUrl}api/posts/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({comment: comment}),
        }).catch((error) => {
            console.error(error);
        });

        setComment((prev) => [
            ...prev,
            {
                comment,
                created_at: new Date().toISOString(),
                user: username,
                user_image_url: user_image_url,
            },
        ]);

        event.target.reset();
    }

    return (
        <div className="w-full max-h-[85vh] mx-12 flex gap-6 bg-white/80 justify-center md:flex-row flex-col">
            {/* Post */}
            <article
                className="flex-1 md:max-w-1/3 max-h-[85vh] bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex flex-col"
                aria-labelledby={`cap-${id}`}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <img
                            src={`${authorPP}.webp`}
                            alt={author || 'avatar'}
                            className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm"
                            loading="lazy"
                            fetchpriority="high"
                        />
                        <div className="text-sm leading-tight">
                            <div className="font-semibold text-gray-800">
                                {author || 'Nom Auteur'}
                            </div>
                            {author && (
                                <div className="text-xs text-gray-500">
                                    @{author}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        className="text-gray-500 text-xl hover:text-gray-700 transition-colors"
                        aria-label="options"
                    >
                        ⋯
                    </button>
                </div>

                {image_url ? (
                    <img
                        src={`${image_url}.webp`}
                        alt={content.slice(0, 120) || 'post image'}
                        className="w-full max-h-[50vh] object-contain bg-black border-y border-gray-100 flex-shrink-0"
                        loading="lazy"
                        fetchpriority="high"
                    />
                ) : (
                    <div className="w-full h-64 bg-gray-50 flex items-center justify-center text-gray-300 border-y border-gray-100 flex-shrink-0">
                        Aucune image
                    </div>
                )}

                {/* Contenu du post */}
                <div className="flex-1 px-6 py-5 space-y-4 bg-white overflow-y-auto min-h-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <ActionButtonsPost
                                classDefault="ri-heart-line"
                                classFocus="ri-heart-fill"
                                label="like"
                                color="text-gray-600"
                                colorFocus="text-red-500"
                                action={liked}
                                setAction={setLiked}
                            />

                            <ActionButtonsPost
                                classDefault="ri-chat-3-line"
                                classFocus="ri-chat-3-line"
                                label="comment"
                                color="text-gray-600"
                                colorFocus="text-gray-800"
                                action={commented}
                                setAction={setComment}
                                onOpenComments={() =>
                                    setIsOpen((prev) => !prev)
                                }
                            />

                            <ActionButtonsPost
                                classDefault="ri-share-line"
                                classFocus="ri-share-fill"
                                label="share"
                                color="text-gray-600"
                                colorFocus="text-gray-800"
                                action={shared}
                                setAction={setShared}
                            />
                        </div>

                        <ActionButtonsPost
                            classDefault="ri-bookmark-line"
                            classFocus="ri-bookmark-fill"
                            label="save"
                            color="text-gray-600"
                            colorFocus="text-yellow-400"
                            action={saved}
                            setAction={setSaved}
                        />
                    </div>

                    <div className="text-sm font-semibold text-gray-800">
                        {newLikes.toLocaleString()} mentions J'aime
                    </div>

                    {content && (
                        <p
                            id={`cap-${id}`}
                            className="text-sm leading-6 text-gray-700"
                        >
                            <span className="font-semibold text-gray-800 mr-2">
                                {author}
                            </span>
                            <span>{content}</span>
                        </p>
                    )}

                    {/* Bouton commentaires */}
                    {newComments.length > 0 && (
                        <button
                            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            aria-label={`Voir ${newComments.length} commentaires`}
                            onClick={() => setIsOpen(true)}
                        >
                            Voir les {newComments.length} commentaires
                        </button>
                    )}

                    {/* Date */}
                    <div className="text-xs text-gray-400">
                        <DiffDate myDate={new Date(created_at)} />
                    </div>
                </div>
            </article>

            {/* Comments */}
            {isDesktop ? (
                <aside
                    className={`flex flex-col bg-gray-50 border border-gray-100 rounded-lg shadow-sm transition-all duration-300 ease-in-out ${
                        IsOpen
                            ? 'w-[360px] md:max-w-[40%] max-h-[85vh] opacity-100 visible'
                            : 'w-0 max-w-0 h-0 opacity-0 invisible overflow-hidden border-0'
                    }`}
                >
                    <div
                        className={`w-[360px] flex flex-col h-full ${
                            !IsOpen && 'pointer-events-none'
                        }`}
                    >
                        <div className="px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                                    Commentaires
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-xs text-gray-500 hover:text-gray-700 whitespace-nowrap"
                                    aria-label="fermer commentaires"
                                >
                                    Fermer
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                                {`${
                                    newComments.length
                                } affichés · ${newLikes.toLocaleString()} likes`}
                            </p>
                        </div>

                        {/* Scroll area */}
                        <div className="overflow-y-auto flex-1 px-4 py-3 space-y-3 min-h-0">
                            {newComments.length > 0 ? (
                                newComments.map((c, idx) => (
                                    <Comments
                                        comment={c}
                                        index={idx}
                                        key={idx}
                                    />
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-4">
                                    Il n'y a pas de commentaire
                                </div>
                            )}
                        </div>

                        {/* Input d'ajout de commentaire */}
                        <div className="px-4 py-3 border-t border-gray-100 bg-white flex-shrink-0">
                            <form
                                className="flex items-center gap-3"
                                onSubmit={(e) => {
                                    handleComment(
                                        setNewComments,
                                        e,
                                        currentToken,
                                        currentUserName,
                                        currentUserPP,
                                        id
                                    );
                                }}
                            >
                                <img
                                    src={`${currentUserPP}.webp`}
                                    alt="you"
                                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                                    loading="lazy"
                                    fetchpriority="low"
                                />
                                <input
                                    type="text"
                                    placeholder="Ajouter un commentaire..."
                                    className="flex-1 text-sm bg-gray-50 border border-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200 min-w-0"
                                    name="comment"
                                />
                                <button
                                    type="submit"
                                    className="text-sm font-semibold text-gray-500 hover:text-gray-700 cursor-pointer whitespace-nowrap"
                                    aria-label="envoyer commentaire"
                                >
                                    Publier
                                </button>
                            </form>
                        </div>
                    </div>
                </aside>
            ) : (
                <>
                    <div
                        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
                            IsOpen
                                ? 'opacity-100 visible'
                                : 'opacity-0 invisible'
                        }`}
                        onClick={() => setIsOpen(false)}
                    ></div>

                    <aside
                        className={`z-99 fixed left-0 right-0 bottom-0 bg-white rounded-t-2xl shadow-xl transition-transform duration-300 ease-out flex flex-col ${
                            IsOpen ? 'translate-y-0' : 'translate-y-full'
                        } h-full max-h-[88vh]`}
                    >
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-800">
                                    Commentaires
                                </h3>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-xs text-gray-500 hover:text-gray-700"
                                >
                                    Fermer
                                </button>
                            </div>

                            <p className="text-xs text-gray-400 mt-1">
                                {`${
                                    newComments.length
                                } affichés · ${newLikes.toLocaleString()} likes`}
                            </p>
                        </div>

                        <div className="overflow-y-auto flex-1 px-4 py-3 space-y-3">
                            {newComments.length > 0 ? (
                                newComments.map((c, idx) => (
                                    <Comments
                                        comment={c}
                                        index={idx}
                                        key={idx}
                                    />
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-4">
                                    Il n'y a pas de commentaire
                                </div>
                            )}
                        </div>

                        {/* Input commentaire */}
                        <div className="px-4 py-3 border-t border-gray-100 bg-white flex-shrink-0">
                            <form
                                className="flex items-center gap-3"
                                onSubmit={(e) =>
                                    handleComment(
                                        setNewComments,
                                        e,
                                        currentToken,
                                        currentUserName,
                                        currentUserPP,
                                        id
                                    )
                                }
                            >
                                <img
                                    src={`${currentUserPP}.webp`}
                                    alt="you"
                                    className="w-9 h-9 rounded-full object-cover"
                                    loading="lazy"
                                />

                                <input
                                    type="text"
                                    placeholder="Ajouter un commentaire..."
                                    className="flex-1 text-sm bg-gray-50 border border-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-200"
                                    name="comment"
                                />

                                <button
                                    type="submit"
                                    className="text-sm font-semibold text-gray-500 hover:text-gray-700"
                                >
                                    Publier
                                </button>
                            </form>
                        </div>
                    </aside>
                </>
            )}
        </div>
    );
}

export default memo(PostDetail);
