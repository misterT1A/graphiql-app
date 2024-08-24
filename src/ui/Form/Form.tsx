'use client';

import { Button } from '@nextui-org/react';
import type { FormEvent, ReactElement } from 'react';

import CustomInput from '@/ui/custom-input/CustomInput';
import CustomPass from '@/ui/custom-password/CustomPass';

const Form = (): ReactElement => {
  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log('submit', data.get('pass'));
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="flex flex-col items-center h-screen gap-[20px]">
        <CustomInput />
        <CustomPass />
        <Button type="submit" color="primary" variant="flat">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Form;
