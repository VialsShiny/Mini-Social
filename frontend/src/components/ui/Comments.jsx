export const Comments = ({ comment, index }) => {
    return (
        <div key={index} className="flex items-start gap-3">
            <img
                src={comment.user_image_url}
                alt={comment.user}
                className="w-8 h-8 rounded-full object-cover"
            />
            <div>
                <p className="text-sm">
                    <span className="font-semibold">{comment.user}</span>{' '}
                    {comment.comment}
                </p>
                <span className="text-xs text-gray-400">
                    {new Date(comment.created_at).toLocaleString()}
                </span>
            </div>
        </div>
    );
};
