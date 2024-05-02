"use client";
import { useState, createContext, useContext } from "react";
import { User, UserData } from "../types/Auth";
import { toast } from "react-toastify";

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
      const response = await fetch(`${endpoint}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include", // Important for cookies to be handled correctly
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error.message;
        throw new Error(
          errorMessage || `HTTP error! Status: ${response.status}`
        );
      }

      const responseData = await response.json();
      setAuthUser(responseData.user);

      sessionStorage.setItem(
        "postRegistrationMessage",
        "Registration successful. Please log in."
      );

      return true;
    } catch (error: any) {
      console.log("Error: ", error.message);
      toast.error(
        error.message || "An unexpected error occurred during registration."
      );
      return false;
    }
  };

  const login = async (userData: UserData) => {
    try {
      const response = await fetch(`${endpoint}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include", // Important for cookies to be handled correctly
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error.message;
        throw new Error(
          errorMessage || `HTTP error! Status: ${response.status}`
        ); // Use a generic error message if specific message isn't available
      }

      const responseData = await response.json();
      setAuthUser(responseData.data[0]);

      sessionStorage.setItem("loginSuccessMessage", "Login successfully.");

      return true;
    } catch (error: any) {
      console.log("Error: ", error.message);
      toast.error(error.message || "An unexpected error occurred.");
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${endpoint}/logout`, {
        method: "GET",
        credentials: "include", // Important for cookies to be handled correctly
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error.message;
        throw new Error(
          errorMessage || `HTTP error! Status: ${response.status}`
        );
      }

      setAuthUser(null);

      sessionStorage.setItem("postLogoutMessage", "Log out successfully.");

      return true;
    } catch (error: any) {
      console.log("Error: ", error.message);
      toast.error(
        error.message || "An unexpected error occurred during logout."
      );
      return false;
    }
  };

  const verify = async () => {
    try {
      const response = await fetch(`${endpoint}/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include more headers if needed, such as Authentication headers
        },
        credentials: "include", // This ensures cookies are included with the request
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return true;
    } catch (error: any) {
      console.error("Error:", error.message || "An unexpected error occurred.");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, register, login, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
}
