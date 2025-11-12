import {useEffect, useState} from 'react';
import {fetchData} from './Fetch';
import Post from './Post';

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        fetchData(`${apiUrl}api/posts`)
            .then((data) => setPosts(data.posts ?? []))
            .catch(() => {});
    }, []);
    console.log(posts);

    const postsContainer = posts.map((post, i) => {
        if (i >= 100) return;

        return (
            <Post
                author={post.author}
                author_imgUrl={post.author_image_url}
                comments={post.comments}
                content={post.content}
                created_at={post.created_at}
                id={post.id}
                image_url={post.image_url}
                likes={post.likes}
                key={post.id}
            />
        );
    });

    return <div className="flex flex-wrap gap-12 my-12">{postsContainer}</div>;
}
