import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { BackgroundAuth } from '../../components/BackgroundAuth';
import { InputAuth } from '../../components/InputAuth';
import Loading from '../../components/Loading';
import PopupError from '../../components/PopupError';
import { AuthContext } from '../../context/auth';

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string; id: number }[]>([]);
  const { login, logged } = useContext(AuthContext);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);
    } catch (error: Error | any) {
      if (error.response && error.response.data.error) {
        setErrors([{ message: error.response.data.error, id: 0 }]);
      } else {
        setErrors([
          {
            message:
              'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.',
            id: 0,
          },
        ]);
      }
      console.error(error);
    } finally {
      setLoading(false); // Defina loading como false após o login ser concluído ou ocorrer um erro
    }
  };

  const handleCloseError = (id: number) => {
    setErrors(errors.filter((error) => error.id !== id));
  };

  if (logged) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="md:bg-greenWeak bg-center h-screen">
      <BackgroundAuth>
        <h1 className="text-center text-3xl">LOGIN</h1>

        <div className="flex flex-wrap justify-center items-center">
          <div className="w-5/6 mx-auto">
            <InputAuth
              type="email"
              name="Email"
              value={email}
              required={true}
              onChange={handleEmailChange}
            />
            <InputAuth
              type="password"
              name="Senha"
              value={password}
              required={true}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="mt-14 mb-7 w-full text-center">
            <button
              className="block bg-green w-2/5 py-4 mx-auto mb-2 text-white text-xl hover:bg-greenWeak rounded"
              onClick={handleLogin}
            >
              ENTRAR
            </button>

            <Link
              to="/register"
              className="my-10 text-sm text-green hover:text-greenWeak"
            >
              Criar uma conta!
            </Link>
          </div>
        </div>
      </BackgroundAuth>
      {errors.length > 0 && (
        <div className="flex flex-col items-center fixed top-16 right-10 z-50">
          {errors.map(({ message, id }) => (
            <PopupError
              key={id}
              error={message}
              onClose={() => handleCloseError(id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Login;
