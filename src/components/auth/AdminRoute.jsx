import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Skeleton from '../ui/Skeleton';

const AdminRoute = ({ children }) => {
    const { user, loading, role } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-body)]">
                <Skeleton count={1} className="w-48" />
            </div>
        );
    }

    if (!user || role !== 'admin') {
        // Redirect to home or login if not admin
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
