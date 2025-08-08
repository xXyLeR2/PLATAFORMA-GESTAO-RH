import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'manager' | 'hr';
  department: string;
  position: string;
  avatar?: string;
  managerId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana@empresa.com',
    role: 'employee',
    department: 'Tecnologia',
    position: 'Desenvolvedora Senior',
    managerId: '2'
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos@empresa.com',
    role: 'manager',
    department: 'Tecnologia',
    position: 'Gerente de TI'
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    email: 'maria@empresa.com',
    role: 'hr',
    department: 'Recursos Humanos',
    position: 'Analista de RH'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === '123456') {
      setUser(foundUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}