/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

import type { User } from '@/context/AuthContext';
import { signUp, signIn, signOut } from '@/firebase/auth';
import type { SignUpDto } from '@/validation/signUpSchema';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: () => 'auth',
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}));

describe('Firebase Auth', () => {
  const signUpDto: SignUpDto = {
    username: 'User',
    email: 'user@mail.com',
    password: 'password',
    confirm: 'password',
  };

  const user: Partial<User> & { getIdToken: () => Promise<string> } = {
    email: signUpDto.email,
    displayName: signUpDto.username,
    getIdToken: jest.fn(),
  };

  describe('signUp', () => {
    it('should create a new user with data provided', async () => {
      global.fetch = jest.fn();
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({ user });
      (user.getIdToken as jest.Mock).mockResolvedValueOnce('token');

      await signUp(signUpDto);

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith('auth', signUpDto.email, signUpDto.password);
      expect(updateProfile).toHaveBeenCalledWith(user, { displayName: signUpDto.username });
      expect(global.fetch).toHaveBeenCalledWith('/api/login', { headers: { Authorization: 'Bearer token' } });
    });
  });

  describe('signIn', () => {
    it('should authorize a user', async () => {
      global.fetch = jest.fn();
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({ user });
      (user.getIdToken as jest.Mock).mockResolvedValueOnce('token');

      await signIn(signUpDto);

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith('auth', signUpDto.email, signUpDto.password);
      expect(global.fetch).toHaveBeenCalledWith('/api/login', { headers: { Authorization: 'Bearer token' } });
    });
  });

  describe('signOut', () => {
    it('should sign out a user', async () => {
      global.fetch = jest.fn();

      await signOut();

      expect(global.fetch).toHaveBeenCalledWith('/api/logout');
    });
  });
});

