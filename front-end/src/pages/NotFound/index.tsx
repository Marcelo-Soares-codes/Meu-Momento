import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <main className="flex flex-col justify-center h-screen text-center items-center">
      <h1 className="text-green text-8xl">
        404<span className="text-gray text-xl ">Not Found</span>
      </h1>
      <h2 className="text-2xl">
        Ops, parece que a pagina que você busca não existe
      </h2>
      <Link
        to={'/'}
        className="inline-block bg-green text-white text-lg w-1/5 min-w-48 py-5 mt-24 rounded-xl shadow-lg hover:bg-white hover:text-green border-green border-solid hover:border-4 hover:py-4"
      >
        Voltar para o início
      </Link>
    </main>
  );
};
