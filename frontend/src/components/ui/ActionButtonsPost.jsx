export default function ActionButtonsPost({
    classDefault,
    classFocus,
    color = 'text-gray-700',
    colorFocus = 'text-red-500',
    label,
    action,
    setAction,
    onOpenComments,
}) {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    const handleClick = (label) => {
        if (label === 'comment') {
            if (onOpenComments) {onOpenComments();}
        } else {
            setAction((prev) => !prev);
        }
    };

    return (
        <button
            className={`p-2 rounded-md ${action ? colorFocus : color}`}
            aria-label={label}
            onClick={() => handleClick(label)}
        >
            <i
                className={action ? classFocus : classDefault}
                id={`I_${capitalize(label)}`}
            ></i>
        </button>
    );
}
