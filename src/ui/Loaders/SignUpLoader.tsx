import type { ReactElement } from 'react';

const SignUpLoader = (): ReactElement => {
  return (
    <div data-testid="SignUpLoader" className="flex justify-center">
      <div className="w-80 p-4 flex flex-col">
        <section className="p-4 rounded-lg w-full flex justify-center">
          <div className="loader h-6 rounded-lg w-[70px]"></div>
        </section>
        <section className="rounded-lg w-full text-center mt-[4px]">
          <div className="loader h-14 rounded-lg "></div>
        </section>
        <section className="rounded-lg w-full mt-[40px]">
          <div className="loader h-14 rounded-lg "></div>
        </section>
        <section className="rounded-lg w-full mt-[40px]">
          <div className="loader h-14 rounded-lg "></div>
        </section>
        <section className="rounded-lg w-full mt-[40px]">
          <div className="loader h-14 rounded-lg "></div>
        </section>
        <section className="rounded-lg w-full mt-[40px]">
          <div className="loader h-12 rounded-lg"></div>
        </section>
      </div>
    </div>
  );
};

export default SignUpLoader;
