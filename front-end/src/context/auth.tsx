import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

interface UserType {
  createdAt: string;
  email: string;
  imageProfile: string;
  id: string;
  name: string;
  phone: string;
  premium: boolean;
  updatedAt: string;
}

interface AuthContextType {
  user: UserType | null;
  logged: boolean;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateInfoUser: (data: dataUpdateInfoUserType) => void;
}

interface dataUpdateInfoUserType {
  id: string;
  name?: string;
  phone?: string;
  imageProfile?: string;
}

const defaultValueContext: AuthContextType = {
  user: null,
  logged: false,
  login: async () => {},
  signOut: () => {},
  updateInfoUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValueContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    const loadingStorageData = async () => {
      const storageUser = localStorage.getItem('@Auth:user');
      const storageToken = localStorage.getItem('@Auth:token');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setLogged(true);
      }
    };

    loadingStorageData();
  }, []);

  const updateInfoUser = (data: dataUpdateInfoUserType) => {
    return data;
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    setLogged(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/user/login', { email, password });

      if (response.data.success) {
        const { token } = response.data.data;

        setUser(response.data.data.user);
        setLogged(true);

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        localStorage.setItem('@Auth:token', token);
        localStorage.setItem(
          '@Auth:user',
          JSON.stringify(response.data.data.user),
        );
      } else {
        throw new Error(response.data.error);
      }
    } catch (error: Error | any) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, logged: !!logged, login, signOut, updateInfoUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
