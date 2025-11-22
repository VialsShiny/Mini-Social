import {memo, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import CommentsModal from '../../../layout/CommentModal';
import {DiffDate} from '../../utils/DiffDate';
import ActionButtonsPost from './../../ui/ActionButtonsPost';

function Post({
    author = {},
    author_imgUrl = `https://picsum.photos/seed/${Math.random(1, 15)}}/200`,
    comments = [],
    content = '',
    created_at,
    id,
    image_url,
    likes = 0,
}) {
    const [liked, setLiked] = useState(false);
    const [shared, setShared] = useState(false);
    const [commented, setComment] = useState(false);
    const [saved, setSaved] = useState(false);
    const [IsOpen, setIsOpen] = useState(false);
    const [savePP, setSavePP] = useState(author_imgUrl);

    const [newLikes, setNewLikes] = useState(likes + 1);
    const [newComments, setNewComments] = useState(comments);
    useEffect(() => {
        liked
            ? setNewLikes((prev) => prev + 1)
            : setNewLikes((prev) => prev - 1);
    }, [liked]);

    return (
        <>
            <article
                className="max-w-lg w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden font-sans"
                aria-labelledby={`cap-${id}`}
            >
                <Link className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                        <img
                            src={savePP}
                            alt={author || 'avatar'}
                            className="w-10 h-10 rounded-full object-cover bg-gray-100"
                            loading="lazy"
                            fetchpriority="high"
                        />
                        <div className="text-sm leading-tight">
                            <div className="font-medium text-gray-900">
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
                        className="text-gray-600 text-xl"
                        aria-label="options"
                    >
                        ⋯
                    </button>
                </Link>

                {image_url ? (
                    <Link to={`/post/${id}`}>
                        <img
                            src={`${image_url}`}
                            alt={content?.slice(0, 120) || 'post image'}
                            className="w-full min-h-1/2 max-h-[70vh] h-fit object-cover bg-gray-200"
                            loading="lazy"
                            fetchpriority="high"
                        />
                    </Link>
                ) : (
                    <div className="w-full h-56 bg-gray-50 flex items-center justify-center text-gray-400">
                        No image
                    </div>
                )}

                <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <ActionButtonsPost
                                classDefault="ri-heart-line"
                                classFocus="ri-heart-fill"
                                label="like"
                                color="text-gray-700"
                                colorFocus="text-red-600"
                                action={liked}
                                setAction={setLiked}
                            />

                            <ActionButtonsPost
                                classDefault="ri-chat-3-line"
                                classFocus="ri-chat-3-line"
                                label="comment"
                                color="text-gray-700"
                                colorFocus="text-blue-600"
                                action={commented}
                                setAction={setComment}
                                onOpenComments={() => setIsOpen(true)}
                            />

                            <ActionButtonsPost
                                classDefault="ri-share-line"
                                classFocus="ri-share-fill"
                                label="share"
                                color="text-gray-700"
                                colorFocus="text-yellow-600"
                                action={shared}
                                setAction={setShared}
                            />
                        </div>

                        <ActionButtonsPost
                            classDefault="ri-bookmark-line"
                            classFocus="ri-bookmark-fill"
                            label="save"
                            color="text-gray-700"
                            colorFocus="text-yellow-400"
                            action={saved}
                            setAction={setSaved}
                        />
                    </div>

                    <div className="text-sm font-semibold mb-1">
                        {newLikes.toLocaleString()} mentions J’aime
                    </div>

                    {content && (
                        <p
                            id={`cap-${id}`}
                            className="text-sm text-gray-800 mb-2 leading-5"
                        >
                            <span className="font-semibold mr-2">{author}</span>
                            <span>{content}</span>
                        </p>
                    )}

                    {newComments.length > 0 && (
                        <Link
                            className="text-sm text-gray-500 mb-2"
                            aria-label={`Voir ${newComments.length} commentaires`}
                            onClick={() => setIsOpen(true)}
                        >
                            Voir les {newComments.length} commentaires
                        </Link>
                    )}

                    <div className="text-xs text-gray-400">
                        <DiffDate myDate={new Date(created_at)} />
                    </div>
                </div>
            </article>

            <CommentsModal
                isOpen={IsOpen}
                onClose={() => setIsOpen(false)}
                comments={newComments}
                setComment={setNewComments}
                postId={id}
            />
        </>
    );
}

export default memo(Post);
