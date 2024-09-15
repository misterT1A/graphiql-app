import type { ReactElement } from 'react';

const HistoryLoader = (): ReactElement => {
  return (
    <div data-testid="HistoryLoader" className="flex w-full justify-center mt-[24px]">
      <div className="loader-Circle"></div>
    </div>
  );
};

export default HistoryLoader;
