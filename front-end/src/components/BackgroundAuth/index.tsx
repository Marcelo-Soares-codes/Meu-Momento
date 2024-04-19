import { ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

export const BackgroundAuth = ({ children }: PropsType) => {
  return (
    <div className="flex flex-wrap justify-center relative md:items-center h-screen">
      <img
        src="./assets/logo.png"
        alt="Logo"
        className="absolute top-12 sm:top-5 w-1/3 sm:w-1/4 md:none md:w-0"
      />
      <div className="bg-greenWeak w-full h-80 md:h-0"></div>
      <div className="bg-white absolute md:relative w-11/12 md:w-2/5 max-w-144 sm:min-w-96 top-60 md:top-0 sm:top-64 rounded-t-2xl md:rounded-3xl md:shadow-xl ">
        <img
          src="./assets/logo-MeuMomento.png"
          alt="Logo"
          className="w-0 md:w-1/6 md:min-w-20 mx-auto mt-7 mb-2"
        />
        <div className="">{children}</div>
      </div>
    </div>
  );
};
