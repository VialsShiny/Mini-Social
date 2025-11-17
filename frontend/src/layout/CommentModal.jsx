import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useState} from 'react';
import {Comments} from '../components/Comments';
import {fetchData} from '../components/Fetch';
import FormatForm from '../components/FormatForm';
import {useAuth} from '../providers/AuthProviders';

async function handleComment(
    setComment,
    event,
    token,
    username,
    user_image_url,
    id
) {
    event.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;

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

export default function CommentsModal({
    isOpen,
    onClose,
    comments = [],
    setComment,
    postId = 0,
}) {
    const [newComments, setNewComments] = useState(comments);
    const {currentUser} = useAuth();
    const currentToken = localStorage.getItem('token') ?? '';
    const currentUserName = currentUser?.username;
    const currentUserPP = currentUser?.image_url;
    const id = postId;

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(5px)', // optionnel : flou
                    },
                },
            }}
        >
            <Box
                className="absolute inset-0 px-4 pt-8 md:py-8 md:px-0 flex items-end md:items-center justify-center md:justify-end"
                onClick={onClose}
            >
                <div
                    className="h-full md:h-full w-full md:w-1/2 bg-white rounded-t-lg md:rounded-l-lg md:rounded-r-none shadow-lg flex flex-col justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-lg font-bold">Commentaires</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-800 text-xl font-bold"
                        >
                            ×
                        </button>
                    </div>

                    {/* Comments list */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {newComments.length === 0 && (
                            <p className="text-gray-400 text-center">
                                Pas encore de commentaires
                            </p>
                        )}
                        {newComments.map((comment, i) => (
                            <Comments comment={comment} index={i} key={i} />
                        ))}
                    </div>

                    {/* Add comment input */}
                    {currentUser ? (
                        <form
                            action="#"
                            className="p-4 border-t flex items-center gap-2"
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
                            <input
                                type="text"
                                placeholder="Ajouter un commentaire..."
                                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="comment"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors"
                            >
                                Envoyer
                            </button>
                        </form>
                    ) : (
                        <div className="p-4 border-t rounded-md bg-gray-50 text-gray-600 text-sm text-center">
                            <p>
                                Vous devez être{' '}
                                <span className="font-semibold">connecté</span>{' '}
                                pour accéder à cette fonctionnalité
                            </p>
                        </div>
                    )}
                </div>
            </Box>
        </Modal>
    );
}
