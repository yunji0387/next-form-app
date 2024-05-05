"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HamburgerIcon } from "./HamburgerIcon";

const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Register",
    path: "/register",
  },
];

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex flex-col w-full bg-blue-900`}>
      <div className="w-full h-full flex items-center justify-center bg-cyan-500">
        <HamburgerIcon isOpen={isOpen} handleClick={handleClick} />
      </div>
      <nav
        className={`${
          isOpen
            ? "flex transition-all duration-500 ease-in-out"
            : "hidden"
        }`}
      >
        <ul className="bg-pink-200 flex flex-col items-start justify-start gap-3">
          <Link href="/">
            <li className="text-white list-none">Home</li>
          </Link>
          <Link href="/dashboard">
            <li className="text-white list-none">Dashboard</li>
          </Link>
          <Link href="/login">
            <li className="text-white list-none">Login</li>
          </Link>
          <Link href="/register">
            <li className="text-white list-none">Register</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
