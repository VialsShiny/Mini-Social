export const DiffDate = ({myDate = new Date()}) => {
    const currentDate = new Date();

    const diffMs = currentDate.getTime() - myDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    let diffDateString = '';

    if (diffSec < 60) {
        diffDateString = `${diffSec} seconde${diffSec > 1 ? 's' : ''}`;
    } else if (diffSec < 3600) {
        const minutes = Math.floor(diffSec / 60);
        diffDateString = `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (diffSec < 86400) {
        const hours = Math.floor(diffSec / 3600);
        diffDateString = `${hours} heure${hours > 1 ? 's' : ''}`;
    } else if (diffSec < 2592000) {
        // ~30 jours
        const days = Math.floor(diffSec / 86400);
        diffDateString = `${days} jour${days > 1 ? 's' : ''}`;
    } else {
        const months = Math.floor(diffSec / 2592000);
        diffDateString = `${months} mois`;
    }

    return diffDateString;
};
