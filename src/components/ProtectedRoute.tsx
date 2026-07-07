import { Navigate } from 'react-router-dom';
import { useAuth, type UserRole } from '../context/AuthContext';

const OWNER_USER_TYPES = ['HOSPITAL', 'CLINIC'];

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: UserRole;
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const isAllowedPortalUser =
    user.role === 'ROLE_ADMIN' ||
    (user.role === 'ROLE_USER' && OWNER_USER_TYPES.includes(String(user.userType).toUpperCase()));

  if (!isAllowedPortalUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // If Admin attempts to access user area, or User attempts admin area, redirect
    return <Navigate to={user.role === 'ROLE_ADMIN' ? '/admin' : '/dashboard'} replace />;
  }

  return <>{children}</>;
}
