import { Input } from '@nextui-org/react';
import { useState, type ReactElement } from 'react';

import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';

const CustomPass = (): ReactElement => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (): void => setIsVisible(!isVisible);

  return (
    <Input
      name="pass"
      label="Password"
      variant="bordered"
      placeholder="Enter your password"
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
      className="max-w-xs"
    />
  );
};

export default CustomPass;
