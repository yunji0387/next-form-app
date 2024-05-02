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
        const errorResponse = await response.json(); // Parse the response as JSON
        const errorMessage = errorResponse.error.message;
        throw new Error(
          errorMessage || `HTTP error! Status: ${response.status}`
        );
      }

      const responseData = await response.json(); // Assuming that the user data is in the response
      setAuthUser(responseData.user); // Adjust based on your API response

      toast.success("Registration successful.");
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
        // Since the response was not ok, we attempt to parse it as JSON to get the error message
        const errorResponse = await response.json(); // Parse the response as JSON
        // Assuming the error structure is as you mentioned { error: { undefined: "Error message" } }
        const errorMessage = errorResponse.error.message;
        throw new Error(
          errorMessage || `HTTP error! Status: ${response.status}`
        ); // Use a generic error message if specific message isn't available
      }

      const responseData = await response.json(); // Assuming that the user data is in the response
      setAuthUser(responseData.data[0]); // Adjust based on actual data structure

      sessionStorage.setItem('loginSuccessMessage', 'Login successfully.');

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
        const errorResponse = await response.json(); // Attempt to parse JSON error response
        const errorMessage = errorResponse.error.message;
        throw new Error(
          errorMessage || `HTTP error! Status: ${response.status}`
        );
      }

      setAuthUser(null); // Reset user state to null
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
        method: "GET", // Specify the method explicitly
        headers: {
          "Content-Type": "application/json", // Set appropriate headers
          // Include more headers if needed, such as Authentication headers
        },
        credentials: "include", // This ensures cookies are included with the request
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); // Check if response is okay
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
