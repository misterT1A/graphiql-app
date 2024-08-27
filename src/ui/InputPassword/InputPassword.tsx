'use client';

import { Input, type InputProps } from '@nextui-org/react';
import { useState, type ReactElement } from 'react';

import EyeFilledIcon from './EyeFilledIcon';
import EyeSlashFilledIcon from './EyeSlashFilledIcon';

const InputPassword = (props: Omit<InputProps, 'type'>): ReactElement => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (): void => setIsVisible(!isVisible);

  return (
    <Input
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
          aria-label="toggle password visibility"
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? 'text' : 'password'}
      {...props}
    />
  );
};

export default InputPassword;
