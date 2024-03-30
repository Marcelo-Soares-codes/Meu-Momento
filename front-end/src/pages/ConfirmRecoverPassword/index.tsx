import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import Error400 from '../Error400/index';

const ConfirmRecoverPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<any>(null); // Ajuste o tipo para 'any' ou 'Error'

  useEffect(() => {
    const handleVerifyToken = async () => {
      if (token) {
        try {
          await api.post('/user/confirm-recover-password', null, {
            headers: {
              Authorization: `Bearer ${token}`, // Enviar o token no cabeçalho de autorização
            },
          });
          navigate('/login');
        } catch (error) {
          console.error(error);
          setError(error); // Armazenar o erro para renderização condicional
        }
      }
    };
    handleVerifyToken();
  }, [token, navigate]);

  if (error && error.response && error.response.status === 400) {
    return <Error400 />;
  }
  return (
    <main>
      <div className="text-center mt-14">
        <h1 className="text-3xl">Confirme seu email!</h1>
        <p className="max-w-144 text-center text-md font-sans my-5 mx-auto">
          Por favor, verifique o seu email e siga as instruções que enviamos
          para continuar o processo de recuperação de senha. Se você não receber
          o email dentro de alguns minutos, verifique sua caixa de spam ou tente
          novamente mais tarde.
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

export default ConfirmRecoverPassword;
