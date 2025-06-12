import { createContext, useState, ReactNode } from "react";

// 1. Define the type for the context value
interface AppContextType {
  user: string | null;
  setUser: (user: string | null) => void;
}

// 2. Create the context with default value as undefined or null
export const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. Type for children prop
interface AppContextProviderProps {
  children: ReactNode;
}

// 4. Create the provider with state and typed value
const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);

  const value: AppContextType = {
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
