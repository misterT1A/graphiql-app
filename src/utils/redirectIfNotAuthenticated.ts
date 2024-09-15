import { redirect } from 'next/navigation';

import { getUserFromCookie } from './getUserFromCookie';

export async function redirectIfNotAuthenticated(): Promise<void> {
  const user = await getUserFromCookie();
  if (!user) {
    redirect('/');
  }
}

