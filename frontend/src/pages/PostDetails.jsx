import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchData} from '../components/Fetch';
import {Loader} from '../components/Loader';
import PostDetail from '../components/PostDetail';

export const PostDetails = () => {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchData(`${apiUrl}api/posts/${id}`)
            .then((data) => setPost(data.post))
            .catch((error) => setError(error));
    }, [id]);

    if (error)
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-red-500 font-semibold mb-2">
                    Une erreur est survenue 😢
                </p>
                <p className="text-gray-600 text-sm">
                    {error.message || String(error)}
                </p>
            </div>
        );

    if (!post) return <Loader loader="dote" />;

    return (
        <div className="w-full h-fit md:h-[80vh] py-12 md:py-12 flex justify-center items-center">
            <PostDetail
                author={post.author}
                author_image_url={post.author_image_url}
                comments={post.comments}
                content={post.content}
                created_at={post.created_at}
                id={post.id}
                image_url={post.image_url}
                likes={post.likes}
                key={post.id}
            />
        </div>
    );
};
