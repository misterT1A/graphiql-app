import { Tooltip as NextUITooltip, type TooltipProps } from '@nextui-org/react';
import { type ReactElement, useState } from 'react';

const Tooltip = ({ children, ...props }: TooltipProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NextUITooltip isOpen={isOpen} {...props}>
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
      </div>
    </NextUITooltip>
  );
};

export default Tooltip;

