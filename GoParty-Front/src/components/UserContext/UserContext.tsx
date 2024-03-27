import React, { ReactNode, createContext, useContext, useState } from 'react';

// Define o formato dos dados do usuário
interface UserData {
  username: string;
  senha: string;
  email: string;
  id: string;
  dataNasci: Date;
  nome: string;
  tipoUsuario: string;
  cpf: string;
  fotoPerfil: Blob | string;
}

// Cria o contexto de usuário
interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Provedor do contexto de usuário
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acessar o contexto de usuário
export const useUser = () => useContext(UserContext);
