import type { UserInfo } from 'firebase/auth';
import type { Claims } from 'next-firebase-auth-edge/lib/auth/claims';
import { createContext, useContext } from 'react';

export interface User extends UserInfo {
  emailVerified: boolean;
  customClaims: Claims;
}

export interface AuthContextValue {
  user: User | null;
  isSignOut: boolean;
  setIsSignOut: (isSignOut: boolean) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isSignOut: false,
  setIsSignOut: () => {},
});

export const useAuth = (): AuthContextValue => useContext(AuthContext);
