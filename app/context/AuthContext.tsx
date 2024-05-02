"use client";
import { useState, createContext, useContext } from "react";
import axios, { AxiosError } from "axios";
import { User, UserData } from "../types/Auth";

interface AuthContextType {
  authUser: User | null;
  register: (userData: UserData) => Promise<boolean>;
  login: (userData: UserData) => Promise<boolean>;
  logout: () => Promise<boolean>;
  verify: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  login: async () => false, // Implement no-op or placeholder functions
  logout: async () => false,
  register: async () => false,
  verify: async () => false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<User | null>(null);

  let endpoint = process.env.NEXT_PUBLIC_AUTH_URL;

  if (!endpoint) {
    console.error("Submission endpoint in AuthContext is not defined.");
    return;
  }

  const register = async (userData: UserData) => {
    try {
      const response = await axios.post(`${endpoint}/register`, userData);
      setAuthUser(response.data.user); // Adjust based on your API response
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      return false;
    }
  };

  const login = async (userData: UserData) => {
    try {
      const response = await axios.post(`${endpoint}/login`, userData);
      // console.log("Response: ", response.data.data[0]);
      console.log("Response: ", response.data.data[0]);
      setAuthUser(response.data.data[0]); // Adjust based on your API response
      console.log("AuthUser: ", authUser);

      return true;
    } catch (error) {
        console.log("Error: ", error);
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${endpoint}/logout`);
      setAuthUser(null);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      return false;
    }
  };

  const verify = async () => {
    try {
      const response = await axios.get(`${endpoint}/verify`);
      setAuthUser(response.data.user); // Adjust based on your API response
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, register, login, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
}
