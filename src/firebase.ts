import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD95MxHZX-c5ccTaXzgFAqZNl4-HY026sg',
  authDomain: 'graphiql-app-e04f1.firebaseapp.com',
  projectId: 'graphiql-app-e04f1',
  storageBucket: 'graphiql-app-e04f1.appspot.com',
  messagingSenderId: '619696762566',
  appId: '1:619696762566:web:d23d24d2fb3696928d71c7',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function signUp(username: string, email: string, password: string): Promise<void> {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(res.user, { displayName: username });
}

export async function signIn(email: string, password: string): Promise<void> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
}

export function logOut(): void {
  signOut(auth);
}

