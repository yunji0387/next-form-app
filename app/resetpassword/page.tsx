"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, FormEvent, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    // const resetPasswordMessage = sessionStorage.getItem("resetPasswordMessage");
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

    // if (resetPasswordMessage) {
    //   setTimeout(() => {
    //     toast.success(resetPasswordMessage);
    //     sessionStorage.removeItem("resetPasswordMessage"); // Clear the message so it doesn't reappear
    //   }, 100); // Delay of 100 milliseconds
    // }

    if (registrationMessage) {
      setTimeout(() => {
        toast.success(registrationMessage);
        sessionStorage.removeItem("postRegistrationMessage");
      }, 100);
    }

    if (logoutMessage) {
      setTimeout(() => {
        toast.success(logoutMessage);
        sessionStorage.removeItem("postLogoutMessage");
      }, 100);
    }

    if (formUnauthorizedMessage) {
      setTimeout(() => {
        toast.error(formUnauthorizedMessage);
        sessionStorage.removeItem("formUnauthorizedMessage");
      }, 100);
    }

    if (homeUnauthorizedMessage) {
      setTimeout(() => {
        toast.error(homeUnauthorizedMessage);
        sessionStorage.removeItem("homeUnauthorizedMessage");
      }, 100);
    }
  }, []);

  if (!auth) {
    console.error("Auth context is not available");
    return <div>No access to Auth context</div>;
  }

  const { resetPassword } = auth;

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
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

    const result = await resetPassword({ email: email });

    if (result) {
      setIsLoading(false);
      const resetPasswordMessage = sessionStorage.getItem(
        "resetPasswordMessage"
      );
      if (resetPasswordMessage) {
        setTimeout(() => {
          toast.success(resetPasswordMessage);
          sessionStorage.removeItem("resetPasswordMessage"); // Clear the message so it doesn't reappear
        }, 100); // Delay of 100 milliseconds
      }
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
          Reset your password
        </h2>
        <p className="">
          Don&apos;t have an account?{" "}
          <span className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline font-medium">
            <Link href="/register">Sign up</Link>
          </span>
        </p>

        <p className="text-left text-gray-500 dark:text-gray-300 text-sm my-3">
          To reset your password, enter your email below and submit. An email
          will be sent to you with instructions about how to complete the
          process.
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
          <p className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline font-medium text-right">
            <Link href="/login">Log in to your account</Link>
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
              "Send"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
