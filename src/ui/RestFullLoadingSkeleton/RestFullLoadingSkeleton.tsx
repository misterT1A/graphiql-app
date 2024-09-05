import { Skeleton } from '@nextui-org/react';
import type { ReactElement } from 'react';
import React from 'react';

const RestFullLoadingSkeleton = (): ReactElement => {
  return (
    <div className="flex flex-col items-center p-10 gap-10">
      <div className="flex flex-col items-center gap-5 w-7/12">
        <div className="flex justify-between w-full gap-2">
          <Skeleton className="rounded-lg w-[145px] text-center">
            <div className="h-14 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-full text-center">
            <div className="h-14 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-[140px]">
            <div className="h-14 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
        <Skeleton className="rounded-lg w-[270px] text-center">
          <div className="h-10 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="flex flex-row gap-3 w-full">
          <Skeleton className="rounded-lg w-full text-center">
            <div className="h-14 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-full text-center">
            <div className="h-14 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-[80px] text-center">
            <div className="h-6 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default RestFullLoadingSkeleton;
