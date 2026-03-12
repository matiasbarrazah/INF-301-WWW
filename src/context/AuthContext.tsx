import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { User } from '../types';

// Usuario demo precargado para pruebas
const DEMO_USER: User = {
  id: 1,
  run: '12.345.678-9',
  fullName: 'María González',
  email: 'maria@example.com',
  phone: '+56912345678',
  address: 'Av. Pajaritos 1234',
  commune: 'Maipú',
  province: 'Santiago',
  region: 'Región Metropolitana',
  birthDate: '1990-05-15',
  gender: 'F',
  role: 'cliente',
};

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (data: Omit<User, 'id' | 'role'> & { password: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Restaurar sesión al recargar
  useEffect(() => {
    const saved = sessionStorage.getItem('fukusuke_user');
    if (saved) setUser(JSON.parse(saved) as User);
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulación: cualquier contraseña funciona con el email demo
    await new Promise((r) => setTimeout(r, 600));
    const loggedUser = email === DEMO_USER.email ? DEMO_USER : null;
    if (loggedUser) {
      setUser(loggedUser);
      sessionStorage.setItem('fukusuke_user', JSON.stringify(loggedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('fukusuke_user');
  };

  const register = async (
    data: Omit<User, 'id' | 'role'> & { password: string }
  ): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    const newUser: User = { ...data, id: Date.now(), role: 'cliente' };
    setUser(newUser);
    sessionStorage.setItem('fukusuke_user', JSON.stringify(newUser));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
