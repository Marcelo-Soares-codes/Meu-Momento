import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

interface PrivateRoutesProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRoutesProps) => {
  const { logged } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o usuário está logado ao montar o componente
    if (!logged) {
      navigate('/'); // Redireciona para a página inicial se não estiver logado
    }
  }, [logged, navigate]);

  return <>{logged ? children : null}</>; // Renderiza os componentes filhos somente se estiver logado
};
