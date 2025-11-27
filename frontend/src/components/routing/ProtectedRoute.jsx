import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../../providers/AuthProviders';

export const ProtectedRoute = ({children}) => {
    const {isAuthenticate, loading} = useAuth();
    const location = useLocation();
    if (loading) return <div>Loading...</div>;
    if (!isAuthenticate)
        return <Navigate to="/signin" state={{from: location}} replace />;
    return <div>{children}</div>;
};
