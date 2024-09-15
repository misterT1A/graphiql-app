import { cookies } from 'next/headers';
import { getTokens } from 'next-firebase-auth-edge';

import type { User } from '@/context/AuthContext';
import { toUser } from '@/context/toUser';

export async function getUserFromCookie(): Promise<User | null> {
  const tokens = await getTokens(cookies(), {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    cookieName: process.env.COOKIE_NAME || 'AuthToken',
    cookieSignatureKeys: [process.env.COOKIE_SIGNATURE_KEYS || ''],
    serviceAccount: {
      projectId: process.env.SERVICE_ACCOUNT_PROJECT_ID || '',
      clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL || '',
      privateKey: (process.env.SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
  });

  return tokens ? toUser(tokens) : null;
}

