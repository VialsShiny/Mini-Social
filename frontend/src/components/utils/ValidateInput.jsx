export default function validateInput(name, value, formData = {}) {
    switch (name) {
        case 'username': {
            const isNotValid = /^[a-zA-Z0-9_]{3,20}$/.test(value);
            return isNotValid
                ? false
                : 'Le nom d’utilisateur doit contenir entre 3 et 20 caractères et ne peut inclure que des lettres, des chiffres ou des underscores.';
        }

        case 'email': {
            const isNotValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            return isNotValid ? false : 'L’adresse e-mail n’est pas valide.';
        }

        case 'password': {
            const isNotValid =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/.test(value);
            return isNotValid
                ? false
                : 'Le mot de passe doit contenir au minimum 12 caractères, dont au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.';
        }

        case 'confirmPassword': {
            const isNotValid = value === formData.password;
            return isNotValid
                ? false
                : 'Les mots de passe ne correspondent pas.';
        }

        case 'image_url': {
            try {
                new URL(value);
                return false;
            } catch {
                return 'L’URL fournie n’est pas valide.';
            }
        }

        default: {
            const isNotValid = value.trim() !== '';
            return isNotValid ? false : 'Ce champ ne peut pas être vide.';
        }
    }
}
