export const ShowError = ({name, content, children = null}) => {
    if (typeof content === 'boolean') return null;

    return (
        <p aria-label={`${name} error`} className="text-red-500 text-sm">
            {children}
            {content}
        </p>
    );
};
