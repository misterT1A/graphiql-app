'use client';

import { Input, type InputProps } from '@nextui-org/react';
import { forwardRef, useState, type ReactElement } from 'react';

import EyeFilledIcon from './EyeFilledIcon';
import EyeSlashFilledIcon from './EyeSlashFilledIcon';

const InputPassword = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  function InputPassword(props, ref): ReactElement {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = (): void => setIsVisible(!isVisible);

    return (
      <Input
        ref={ref}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
            tabIndex={-1}
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
  },
);

export default InputPassword;
