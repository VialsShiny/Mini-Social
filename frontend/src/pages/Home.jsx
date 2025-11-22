import {Helmet} from 'react-helmet';
import PostList from './../components/features/posts/PostList';

export default function Home() {
    return (
        <>
            <Helmet>
                <title>Mini Social — Flux de posts</title>

                <meta
                    name="description"
                    content="Explorez les derniers posts et commentaires des utilisateurs sur Mini Social."
                />

                {/* Open Graph minimal */}
                <meta
                    property="og:title"
                    content="Mini Social — Flux de posts"
                />
                <meta
                    property="og:description"
                    content="Découvrez les derniers posts et l'activité de la communauté sur Mini Social."
                />
                <meta property="og:type" content="website" />

                {/* Twitter minimal */}
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content="Mini Social — Flux de posts"
                />
                <meta
                    name="twitter:description"
                    content="Découvrez les derniers posts et commentaires sur Mini Social."
                />
            </Helmet>

            <PostList />
        </>
    );
}
