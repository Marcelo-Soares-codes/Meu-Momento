import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { BackgroundAuth } from '../../components/BackgroundAuth';
import { InputAuth } from '../../components/InputAuth';
import { api } from '../../services/api';
import Loading from '../../components/Loading';
import PopupError from '../../components/PopupError';
import { AuthContext } from '../../context/auth';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string; id: number }[]>([]);
  const { logged } = useContext(AuthContext);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfPassword(e.target.value);
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const data = {
        name,
        email,
        phone,
        password,
      };
      await api.post('/user/create', data);
      navigate('/confirmCreate');
    } catch (error: Error | any) {
      setLoading(false);
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
    }
  };

  if (logged) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <Loading />;
  }

  const handleCloseError = (id: number) => {
    setErrors(errors.filter((error) => error.id !== id));
  };

  return (
    <main className="md:bg-greenWeak bg-center h-screen">
      <BackgroundAuth>
        <h1 className="text-center text-3xl">REGISTRAR</h1>

        <div className="flex flex-wrap justify-center items-center">
          <div className="w-5/6 mx-auto">
            <InputAuth
              type="text"
              name="Nome"
              value={name}
              required={true}
              onChange={handleNameChange}
            />
            <InputAuth
              type="tel"
              name="Telefone"
              value={phone}
              required={false}
              onChange={handlePhoneChange}
            />
            <InputAuth
              type="email"
              name="Email"
              value={email}
              required={true}
              onChange={handleEmailChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputAuth
                type="password"
                name="Senha"
                value={password}
                required={true}
                onChange={handlePasswordChange}
              />
              <InputAuth
                type="password"
                name="Conf. senha"
                value={confPassword}
                required={true}
                onChange={handleConfPasswordChange}
              />
            </div>
          </div>

          <div className="mt-14 mb-7 w-full text-center">
            <button
              className="block bg-green w-2/5 py-4 mx-auto mb-2 text-white text-xl hover:bg-greenWeak rounded"
              onClick={handleCreate}
            >
              REGISTAR
            </button>

            <Link
              to="/login"
              className="my-10 text-sm text-green hover:text-greenWeak"
            >
              Já tenho uma conta!
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

export default Register;
