import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const { logged } = useContext(AuthContext);

  return logged ? <Outlet /> : <Navigate to="/login" />;
};
