'use client';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import type { SignInDto } from '@/validation/signInSchema';
import type { SignUpDto } from '@/validation/signUpSchema';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function signUp(dto: SignUpDto): Promise<void> {
  const response = await createUserWithEmailAndPassword(auth, dto.email, dto.password);
  await updateProfile(response.user, { displayName: dto.username });
  const idToken = await response.user.getIdToken();

  await fetch('/api/login', {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
}

export async function signIn(dto: SignInDto): Promise<void> {
  const response = await signInWithEmailAndPassword(auth, dto.email, dto.password);
  const idToken = await response.user.getIdToken();

  await fetch('/api/login', {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
}

export async function signOut(): Promise<void> {
  await fetch('/api/logout');
}
