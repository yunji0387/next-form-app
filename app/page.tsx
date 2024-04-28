"use client";
import Link from "next/link";
import { redirect } from 'next/navigation'
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
      <p className="text-white">Home</p>
    </main>
  );
}
