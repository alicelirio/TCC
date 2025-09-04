import { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storedToken = localStorage.getItem('@SnackMania:token');
      const storedUser = localStorage.getItem('@SnackMania:user');

      if (storedToken && storedUser) {
        api.defaults.headers.authorization = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('@SnackMania:token', token);
      localStorage.setItem('@SnackMania:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      throw new Error('Erro na autenticação');
    }
  };

  // alias for components that call `login`
  const login = (email: string, password: string) => signIn(email, password);

  const signOut = () => {
    localStorage.removeItem('@SnackMania:token');
    localStorage.removeItem('@SnackMania:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, login, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
