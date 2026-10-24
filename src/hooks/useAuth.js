import { useSelector } from 'react-redux';

/**
 * Centralise l'accès aux informations d'authentification.
 *
 * @returns {{
 *   user: object|null,
 *   token: string|null,
 *   isAuthenticated: boolean,
 *   isAdmin: boolean
 * }}
 */
const useAuth = () => {
  const { user, token, isAuthenticated } = useSelector(
    state => state.auth
  );

  const isAdmin = user?.role === 'admin';

  return {
    user: user ?? null,
    token: token ?? null,
    isAuthenticated: Boolean(isAuthenticated),
    isAdmin,
  };
};

export default useAuth;