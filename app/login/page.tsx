"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, FormEvent, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    const registrationMessage = sessionStorage.getItem(
      "postRegistrationMessage"
    );
    const logoutMessage = sessionStorage.getItem("postLogoutMessage");
    const formUnauthorizedMessage = sessionStorage.getItem(
      "formUnauthorizedMessage"
    );
    const homeUnauthorizedMessage = sessionStorage.getItem(
      "homeUnauthorizedMessage"
    );
    if (registrationMessage) {
      setTimeout(() => {
        toast.success(registrationMessage);
        sessionStorage.removeItem("postRegistrationMessage"); // Clear the message so it doesn't reappear
      }, 100); // Delay of 100 milliseconds
    }
    if (logoutMessage) {
      setTimeout(() => {
        toast.success(logoutMessage);
        sessionStorage.removeItem("postLogoutMessage"); // Clear the message so it doesn't reappear
      }, 100); // Delay of 100 milliseconds
    }

    if (formUnauthorizedMessage) {
      setTimeout(() => {
        toast.error(formUnauthorizedMessage);
        sessionStorage.removeItem("formUnauthorizedMessage"); // Clear the message so it doesn't reappear
      }, 100); // Delay of 100 milliseconds
    }

    if (homeUnauthorizedMessage) {
      setTimeout(() => {
        toast.error(homeUnauthorizedMessage);
        sessionStorage.removeItem("homeUnauthorizedMessage"); // Clear the message so it doesn't reappear
      }, 100); // Delay of 100 milliseconds
    }
  }, []);

  if (!auth) {
    console.error("Auth context is not available");
    return <div>No access to Auth context</div>;
  }

  const { login } = auth;

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    if (!validateForm()) {
      console.error("Validation failed.");
      setIsLoading(false);
      return;
    }

    const result = await login({ email: email, password: password });

    if (result) {
      setIsLoading(false);
      // router.push("/");
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex w-full min-w-[18rem] min-h-screen flex-col items-start justify-start overflow-auto">
      <ToastContainer />
      <div className="bg-white dark:bg-gray-700 flex flex-col gap-2 w-full h-screen max-w-md p-3 overflow-auto">
        <Image
          src="/NextAdminLogoLight.svg"
          width={400}
          height={100}
          className="overflow-hidden transition-all hidden dark:block"
          alt="logo"
        />
        <Image
          src="/NextAdminLogoDark.svg"
          width={400}
          height={100}
          className="overflow-hidden transition-all dark:hidden"
          alt="logo"
        />
        <h2 className="text-center font-medium text-2xl">
          Log in to your account
        </h2>
        <p className="">
          Don&apos;t have an account?{" "}
          <span className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline font-medium">
            <Link href="/register">Sign up</Link>
          </span>
        </p>

        <div className="hover:cursor-not-allowed w-full p-2 flex items-center justify-center border border-gray-500 dark:border-gray-100 text-gray-700 dark:text-white font-bold rounded">
          <p>Google</p>
        </div>
        <div className="hover:cursor-not-allowed w-full p-2 flex items-center justify-center border border-gray-500 dark:border-gray-100 text-gray-700 dark:text-white font-bold rounded">
          <p>Microsoft</p>
        </div>
        <div className="hover:cursor-not-allowed w-full p-2 flex items-center justify-center border border-gray-500 dark:border-gray-100 text-gray-700 dark:text-white font-bold rounded">
          <p>Facebook</p>
        </div>

        <p className="text-center text-gray-500 dark:text-gray-300 text-sm">
          Or with email and password
        </p>

        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-left text-sm w-full">
              Email:
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-white dark:bg-gray-500 p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-gray-500 dark:placeholder:text-gray-300"
            />
            {errors.email && (
              <div className="text-red-500 dark:text-red-400 text-sm">
                {errors.email}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-left text-sm w-full">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-white dark:bg-gray-500 p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-gray-500 dark:placeholder:text-gray-300 w-full"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 dark:text-red-400 text-sm">
                {errors.password}
              </div>
            )}
          </div>
          <p className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline font-medium text-right">
            <Link href="/resetpassword">Forgot your password?</Link>
          </p>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 font-bold text-white p-2 rounded mt-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
