export function handleLikes(setLikes, liked, postId) {
    setLikes((prev) => (liked ? prev + 1 : prev - 1));
    const userLikes = JSON.parse(localStorage.getItem('userLikes')) || {};
    if (liked) {
        userLikes[postId] = true;
    } else {
        delete userLikes[postId];
    }
    localStorage.setItem('userLikes', JSON.stringify(userLikes));
}
