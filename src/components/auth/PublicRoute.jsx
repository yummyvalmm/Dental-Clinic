import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-body">
                <LoadingSpinner />
            </div>
        );
    }

    if (user) {
        // If already logged in, redirect to dashboard or other safe default
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
