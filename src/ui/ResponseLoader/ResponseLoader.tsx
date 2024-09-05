import { Skeleton } from '@nextui-org/react';
import type { ReactElement } from 'react';
import React from 'react';

const ResponseLoader = (): ReactElement => {
  return (
    <Skeleton className="rounded-lg w-full">
      <div className="h-[150px] rounded-lg bg-default-300"></div>
    </Skeleton>
  );
};

export default ResponseLoader;
