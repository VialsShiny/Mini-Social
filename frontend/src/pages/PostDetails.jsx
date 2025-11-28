import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import PostDetail from '../components/features/posts/PostDetail';
import { fetchData } from '../components/services/Fetch';
import { Loader } from '../components/ui/Loader';

export default function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchData(`${apiUrl}api/posts/${id}`)
            .then((data) => setPost(data.post))
            .catch((error) => setError(error));
    }, [id, apiUrl]);

    if (error) {
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
    }

    if (!post) {
        return <Loader loader="dote" />;
    }

    return (
        <>
            <Helmet>
                <title>{`${post.author} — Mini Social`}</title>
                <meta
                    name="description"
                    content={
                        post.content?.slice(0, 150) ||
                        `Découvrez le post de ${post.author} sur Mini Social.`
                    }
                />

                {/* Open Graph */}
                <meta
                    property="og:title"
                    content={`${post.author} — Mini Social`}
                />
                <meta
                    property="og:description"
                    content={
                        post.content?.slice(0, 150) ||
                        `Découvrez le post de ${post.author} sur Mini Social.`
                    }
                />
                {post.image_url && (
                    <meta property="og:image" content={post.image_url} />
                )}
                <meta property="og:type" content="article" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content={`${post.author} — Mini Social`}
                />
                <meta
                    name="twitter:description"
                    content={
                        post.content?.slice(0, 150) ||
                        `Découvrez le post de ${post.author} sur Mini Social.`
                    }
                />
                {post.image_url && (
                    <meta name="twitter:image" content={post.image_url} />
                )}
            </Helmet>

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
        </>
    );
}
