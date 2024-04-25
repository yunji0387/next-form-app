"use client";
import Link from "next/link";
import React, { useState, FormEvent } from "react";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically handle the login logic, possibly sending a request to your server
    console.log("Login Submitted", { username, password });
  };

  return (
    <main className="flex w-full min-w-[50rem] min-h-screen flex-col items-center justify-center gap-3 p-16 overflow-auto">
      <div className="bg-white flex flex-col gap-2 w-full max-w-md h-auto p-3 overflow-auto">
        <h1 className="font-black text-3xl">Next Form App</h1>
        <h2 className="text-center font-medium text-2xl">
          Log in to your account
        </h2>
        <p>
          Don&apos;t have an account?{" "}
          <span className="text-blue-500 underline font-medium">
            <Link href="/signup">sign up</Link>
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

        <p className="text-center text-gray-500 text-sm">Or with email and password</p>

        <form
          className="flex flex-col gap-2 w-full"
          onSubmit={handleSubmit}
        >
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 font-bold text-white p-2 rounded mt-3"
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}
