import type { ReactElement } from 'react';

const GraphClientLoader = (): ReactElement => {
  return (
    <div data-testid="GraphLoader" className="flex flex-col items-center p-10 gap-10 mt-[24px]">
      <div className="flex flex-col items-center gap-5 w-full sm:w-[70%]">
        <div className="flex justify-between w-full gap-2">
          <section className="rounded-lg w-full text-center">
            <div className="loader h-14 rounded-lg"></div>
          </section>
          <section className="rounded-lg w-full text-center">
            <div className="loader h-14 rounded-lg"></div>
          </section>
          <section className="rounded-lg w-[240px]">
            <div className="loader h-14 rounded-lg"></div>
          </section>
        </div>
        <section className="rounded-lg w-[250px] text-center">
          <div className="loader h-10 rounded-lg"></div>
        </section>
        <div className="flex flex-row gap-2 w-full mt-[10px]">
          <section className="rounded-lg w-full text-center">
            <div className="loader h-14 rounded-lg"></div>
          </section>
          <section className="rounded-lg w-full text-center">
            <div className="loader h-14 rounded-lg"></div>
          </section>
          <section className="rounded-lg w-[80px] text-center h-14 flex flex-col justify-center">
            <div className="loader h-8 rounded-lg"></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GraphClientLoader;
