import {useEffect, useState} from 'react';
import {fetchData} from './Fetch';
import {Loader} from './Loader';
import Post from './Post';

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchData(`${apiUrl}api/posts`)
            .then((data) => {
                setPosts(data.posts ?? []);
            })
            .catch(() => {})
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-wrap gap-12 my-12">
                {Array.from({length: 8}).map((_, i) => (
                    <Loader loader="post-load" key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-12 my-12">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    author={post.author}
                    author_imgUrl={post.author_image_url}
                    comments={post.comments}
                    content={post.content}
                    created_at={post.created_at}
                    id={post.id}
                    image_url={post.image_url}
                    likes={post.likes}
                />
            ))}
        </div>
    );
}
