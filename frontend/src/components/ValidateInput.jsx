export default function validateInput(name, value, formData = {}) {
    switch (name) {
        case 'username':
            return /^[a-zA-Z0-9_]{3,20}$/.test(value);

        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        case 'password':
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
                value
            );

        case 'confirmPassword':
            return value === formData.password;

        case 'image_url':
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }

        default:
            return value.trim() !== '';
    }
}
