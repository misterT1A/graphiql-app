'use server';

import { FirebaseError } from 'firebase/app';
import { getTranslations } from 'next-intl/server';

import { signUp } from '@/firebase';
import { redirectIntl } from '@/navigation';
import { type SignUpDto, signUpSchema } from '@/validation/signUpSchema';

type SignUpResult = {
  message: string;
};

export async function signUpAction(data: SignUpDto): Promise<SignUpResult | undefined> {
  const t = await getTranslations('SignUp');
  const parsed = signUpSchema(t).safeParse(data);

  if (!parsed.success) {
    return { message: 'Invalid form data.' };
  }

  try {
    await signUp(data.username, data.email, data.password);
  } catch (error) {
    let errorMessage = 'Something went wrong';

    if (error instanceof FirebaseError) {
      errorMessage = error.code;
    }
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { message: errorMessage };
  }

  redirectIntl('/');
}

