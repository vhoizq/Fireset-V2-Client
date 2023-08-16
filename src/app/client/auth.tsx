"use client";

import { createContext, useState, useContext } from "react";

interface User {
  username: string;
  sessionToken: string;
  userId: string;
  isActive: boolean;
  isBeta: boolean;
  email: string;
}

export type userContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null;
};

const authContext = createContext<userContext>({
  user: null,
  setUser: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <authContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
