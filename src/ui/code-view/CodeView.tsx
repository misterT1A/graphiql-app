import { Code } from '@nextui-org/react';
import type { ReactElement } from 'react';

const CodeView = (): ReactElement => {
  return (
    <div className="flex flex-col gap-4">
      <Code size="sm">{'{"query":{}}'}</Code>
    </div>
  );
};

export default CodeView;
