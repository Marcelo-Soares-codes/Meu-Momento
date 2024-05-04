import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';
import Cookies from 'js-cookie';

interface UserType {
  createdAt: string;
  email: string;
  profileImage: string;
  id: string;
  name: string;
  phone: string;
  premium: boolean;
  updatedAt: string;
}

export interface AuthContextType {
  user: UserType | null;
  logged: boolean;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateInfoUser: (data: dataUpdateInfoUserType, token: string) => void;
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
      // Verifique se o token está presente nos cookies
      const cookieToken = Cookies.get('@Auth:token');
      const storageUser = localStorage.getItem('@Auth:user');

      if (cookieToken && storageUser) {
        setUser(JSON.parse(storageUser));
        setLogged(true);
      }
    };

    loadingStorageData();
  }, []);

  const updateInfoUser = async (
    data: dataUpdateInfoUserType,
    token: string,
  ) => {
    try {
      const response = await api.post('/user/update-info', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw response.data.error;
      }

      const user = response.data.data;

      localStorage.setItem('@Auth:user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    // Limpe tanto o cookie quanto o armazenamento local
    Cookies.remove('@Auth:token');
    localStorage.removeItem('@Auth:user');
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

        // Salve o token nos cookies
        Cookies.set('@Auth:token', token, {
          expires: 7,
          sameSite: 'Lax',
          secure: true,
        });

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
