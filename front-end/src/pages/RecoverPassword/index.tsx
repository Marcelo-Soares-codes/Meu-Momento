import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { InputAuth } from '../../components/InputAuth';
import Loading from '../../components/Loading';
import PopupError from '../../components/PopupError';
import { Header } from '../../components/Header';
import { api } from '../../services/api';

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ message: string; id: number }[]>([]);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSend = async () => {
    try {
      setLoading(true);
      await api.post('/user/recover-password', {
        email,
        newPassword,
      });
      navigate('/confirm-recover-password');
    } catch (error: Error | any) {
      if (error.response && error.response.data.error) {
        setErrors([{ message: error.response.data.error, id: 0 }]);
      } else {
        setErrors([
          {
            message:
              'An error occurred while processing your request. Please try again later.',
            id: 0,
          },
        ]);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = (id: number) => {
    setErrors(errors.filter((error) => error.id !== id));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <Header />
      <div className="flex flex-col justify-center items-center mt-28">
        <h1 className=" text-center text-3xl md:text-4xl">RECUPERAR SENHA</h1>
        <div className="flex flex-col w-4/5 max-w-128 sm:w-3/5 md:w-2/5 mx-auto mt-14 items-center">
          <InputAuth
            type="email"
            name="Email"
            value={email}
            required={true}
            onChange={handleEmailChange}
          />
          <InputAuth
            type="password"
            name="Nova Senha"
            value={newPassword}
            required={true}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div className="mt-14 mb-7 w-full text-center">
          <button
            className="block bg-green w-4/5 max-w-128 sm:w-3/5 md:w-2/5 py-4 mx-auto mb-2 text-white text-xl hover:bg-greenWeak rounded"
            onClick={handleSend}
          >
            Enviar
          </button>
        </div>
      </div>
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

export default RecoverPassword;
