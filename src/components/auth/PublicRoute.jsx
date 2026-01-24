import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Skeleton from '../ui/Skeleton';

const PublicRoute = ({ children }) => {
    const { user, loading: isLoading } = useAuth(); // Renamed 'loading' to 'isLoading' for consistency with the instruction's snippet

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-body)]">
                <Skeleton count={1} className="w-48" />
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
