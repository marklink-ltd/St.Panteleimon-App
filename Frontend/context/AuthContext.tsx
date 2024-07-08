import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  authUser: any;
  loading: boolean;
  login: (user: String) => void;
  logout: () => void;
  children: JSX.Element;
}
// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
export const AuthProvider: React.FC<AuthContextType> = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      setLoading(true);
      try {
        const user = await AsyncStorage.getItem("authUser");
        if (user) {
          setAuthUser(JSON.parse(user));
        }
      } catch (error) {
        console.error("Failed to load user from storage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  const login = (user: any) => {
    setAuthUser(user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authUser");
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth Hook
export const useAuth = () => useContext(AuthContext);
