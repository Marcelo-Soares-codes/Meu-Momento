import { Link } from 'react-router-dom';

const Error400 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl text-red-500">Erro 400 - Solicitação Inválida</h1>
      <p className="text-md font-sans my-5">
        Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente
        mais tarde.
      </p>
      <Link
        to={'/'}
        className="inline-block bg-green text-white text-lg text-center w-1/5 min-w-48 py-5 my-7 rounded-xl shadow-lg hover:bg-white hover:text-green border-green border-solid hover:border-4 hover:py-4"
      >
        Voltar para o início
      </Link>
    </div>
  );
};

export default Error400;
