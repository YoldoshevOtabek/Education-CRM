import { createContext, useContext, type ReactNode } from "react";
import useMe from "../features/auth/hooks/useMe";
import type { LoginUser, USER_ROLE } from "../features/auth/types/auth";

interface UserContextType {
  user: LoginUser | undefined;
  role: USER_ROLE | undefined;
  isLoading: boolean;
  isError: boolean;
}

const userContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const { user, isLoading, isError } = useMe();

  return (
    <userContext.Provider
      value={{
        user,
        role: user?.role,
        isLoading,
        isError,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("useUser UserProvider ichida ishlatilishi kerak");
  }

  return context;
}

export function useUserRole(): USER_ROLE | undefined {
  return useUser().role;
}
