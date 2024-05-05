"use client";
import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SideNav() {
  const router = useRouter();

  return (
    <nav className="flex flex-col items-start justify-start gap-3 p-3">
      <Link href="/">
        <p className="text-white">Home</p>
      </Link>
      <Link href="/dashboard">
        <p className="text-white">Dashboard</p>
      </Link>
      <Link href="/login">
        <p className="text-white">Login</p>
      </Link>
      <Link href="/register">
        <p className="text-white">Register</p>
      </Link>
    </nav>
  );
}