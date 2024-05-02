"use client";
import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Errors = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({} as Errors);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();
  const router = useRouter();

  if (!auth) {
    console.error("Auth context is not available");
    return <div>No access to Auth context</div>;
  }

  const { register, authUser } = auth;

  const validateForm = () => {
    let formIsValid = true;
    let errors = {} as Errors;

    // Username validation
    if (!email) {
      errors.email = "Email is required";
      formIsValid = false;
    }

    // First name validation
    if (!firstName) {
      errors.firstName = "First name is required";
      formIsValid = false;
    }

    // Last name validation
    if (!lastName) {
      errors.lastName = "Last name is required";
      formIsValid = false;
    }

    // Password validations
    if (!password) {
      errors.password = "Password is required";
      formIsValid = false;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      formIsValid = false;
    } else if (
      !/\d/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      errors.password =
        "Password must include at least one number and one symbol";
      formIsValid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
      formIsValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    if (!validateForm()) {
      console.error("Validation failed.");
      setIsLoading(false);
      return;
    }

    const result = await register({
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
    });

    if (result) {
      setIsLoading(false);
      sessionStorage.setItem('postRegistrationMessage', 'Registration successful. Please log in.');
      router.push("/login");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex w-full min-w-[50rem] min-h-screen flex-col items-center justify-center gap-3 p-16 overflow-auto">
      <ToastContainer />
      <div className="bg-white flex flex-col gap-2 w-full max-w-md h-auto p-3 overflow-auto">
        <h1 className="font-black text-3xl">Next Form App</h1>
        <h2 className="text-center font-medium text-2xl">
          Create your account
        </h2>
        <p>
          Have an account?{" "}
          <span className="text-blue-500 underline font-medium">
            <Link href="/login">Log in</Link>
          </span>
        </p>

        <div className="w-full p-2 flex items-center justify-center border border-gray-500 text-gray-700 font-bold">
          <p>Google</p>
        </div>
        <div className="w-full p-2 flex items-center justify-center border border-gray-500 text-gray-700 font-bold">
          <p>Microsoft</p>
        </div>
        <div className="w-full p-2 flex items-center justify-center border border-gray-500 text-gray-700 font-bold">
          <p>Facebook</p>
        </div>

        <p className="text-center text-gray-500 text-sm">
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
              className="p-2 border border-gray-300 rounded focus:outline-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-left text-sm w-full">
              First Name:
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="p-2 border border-gray-300 rounded focus:outline-gray-500"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-left text-sm w-full">
              Last Name:
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="p-2 border border-gray-300 rounded focus:outline-gray-500"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-left text-sm w-full">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-2 border border-gray-300 rounded focus:outline-gray-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-left text-sm w-full"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="p-2 border border-gray-300 rounded focus:outline-gray-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 font-bold text-white p-2 rounded mt-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
