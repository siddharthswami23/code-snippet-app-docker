import { createContext, useState, useEffect, ReactNode, FC } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AppContextType {
  userId: string | null;
  user: User | null;
  setUserId: (userId: string | null) => void;
  setUser: (user: User | null) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(() => {
    // Initializer function runs once on mount
    return localStorage.getItem("user");
  });

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          // console.log(userId);
          const res = await axios.get(
            `http://localhost:5000/api/user/get/${userId}`
          );
          setUser(res.data.user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [userId]);

  const value: AppContextType = {
    userId,
    user,
    setUserId,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
