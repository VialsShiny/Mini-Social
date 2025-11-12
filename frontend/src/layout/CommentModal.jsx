import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useState} from 'react';
import {Comments} from '../components/Comments';
import {fetchData} from '../components/Fetch';
import FormatForm from '../components/FormatForm';

async function handleComment(setComment, event, username, id) {
    event.preventDefault();

    const [comment] = FormatForm(event);

    if (!comment) return;

    console.log(id);
    fetchData(`http://localhost:3000/api/posts/${id}/comments`, {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: username, comment: comment}),
    })
        .then((data) => console.log('commentaire Ajouté !' + data))
        .catch(() => {});

    setComment((prev) => [
        ...prev,
        {
            user: username,
            comment,
            created_at: new Date().toISOString(),
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
    const [randomNum] = useState(() => Math.floor(Math.random() * 50) + 1);
    const [username] = useState(() => `User${Date.now()}`);

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
                        {comments.length === 0 && (
                            <p className="text-gray-400 text-center">
                                Pas encore de commentaires
                            </p>
                        )}
                        {comments.map((comment, i) => (
                            <Comments comment={comment} index={i} key={i} />
                        ))}
                    </div>

                    {/* Add comment input */}
                    <form
                        action="#"
                        className="p-4 border-t flex items-center gap-2"
                        onSubmit={(e) =>
                            handleComment(setComment, e, username, postId)
                        }
                    >
                        <input
                            type="text"
                            placeholder="Ajouter un commentaire..."
                            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="comment"
                        />
                        <button className="text-blue-500 font-semibold">
                            Envoyer
                        </button>
                    </form>
                </div>
            </Box>
        </Modal>
    );
}
