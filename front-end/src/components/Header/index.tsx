export const Header = () => {
  return (
    <header className=" w-full h-32 sm:h-24 bg-green text-center flex flex-col sm:flex-row justify-center items-center shadow-md drop-shadow-sm md:drop-shadow-xl shadow-greenDark">
      <img
        src="./assets/logo-MeuMomento.png"
        alt="MEU MOMENTO"
        className="w-14 sm:w-16"
      />
      <h1 className="text-white text-2xl sm:text-3xl ml-3">Meu momento</h1>
    </header>
  );
};
