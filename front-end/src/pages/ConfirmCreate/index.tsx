import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useEffect } from 'react';

export const ConfirmCreate = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  console.log(token);

  useEffect(() => {
    const handleVerifyToken = async () => {
      if (token) {
        try {
          const response = await api.post('/user/confirm', null, {
            headers: {
              Authorization: `Bearer ${token}`, // Enviar o token no cabeçalho de autorização
            },
          });
          console.log(response);
          navigate('/login');
        } catch (error) {
          console.error(error);
        }
      }
    };
    handleVerifyToken();
  }, [token, navigate]);

  return (
    <main>
      <div className="text-center mt-14">
        <h1 className="text-3xl">Confirme seu email!</h1>
        <p className="text-md font-sans my-5">
          Entre no email informado e siga as instruções que enviamos para poder
          prosseguir com seu cadastro!
        </p>
        <Link
          to={'/'}
          className="inline-block bg-green text-white text-lg w-1/5 min-w-48 py-5 my-7 rounded-xl shadow-lg hover:bg-white hover:text-green border-green border-solid hover:border-4 hover:py-4"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
};
