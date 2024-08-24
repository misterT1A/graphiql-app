import { Input } from '@nextui-org/react';
import type { ReactElement } from 'react';

const CustomInput = (): ReactElement => {
  return (
    <div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input isRequired type="email" label="Email" errorMessage="Please enter a valid email" />
      </div>
    </div>
  );
};

export default CustomInput;
