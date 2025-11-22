export default function FormatForm(event) {
    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());
    return formEntries;
}
