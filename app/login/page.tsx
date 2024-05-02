"use client";
import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = useAuth();
  const router = useRouter();

  if (!auth) {
    console.error("Auth context is not available");
    return <div>No access to Auth context</div>;
  }

  const { login, authUser } = auth;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Call the login method from your AuthContext
    const result = await login({ email: username, password: password });
    if (result) {
      console.log("Login Successful");
      router.push("/");
    } else {
      console.error("Login Failed");
    }
  };

  return (
    <div className="flex w-full min-w-[50rem] min-h-screen flex-col items-center justify-center gap-3 p-16 overflow-auto">
      <div className="bg-white flex flex-col gap-2 w-full max-w-md h-auto p-3 overflow-auto">
        <h1 className="font-black text-3xl">Next Form App</h1>
        <h2 className="text-center font-medium text-2xl">
          Log in to your account
        </h2>
        <p>
          Don&apos;t have an account?{" "}
          <span className="text-blue-500 underline font-medium">
            <Link href="/register">sign up</Link>
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
            <label htmlFor="username" className="text-left text-sm w-full">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="p-2 border border-gray-300 rounded focus:outline-gray-500"
            />
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
          </div>
          <p className="text-blue-500 underline font-medium text-right">
            <Link href="/signup">Forgot you pasword?</Link>
          </p>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 font-bold text-white p-2 rounded mt-3"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
