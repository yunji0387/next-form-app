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
    <div className="flex flex-col bg-blue-900">
      <div className="">
        <HamburgerIcon isOpen={isOpen} handleClick={handleClick} />
      </div>
      <nav
        className={`${
          isOpen
            ? "max-h-96 opacity-100 transition-all duration-500 ease-in-out"
            : "hidden max-h-0 opacity-0 md:max-h-full md:opacity-100"
        }`}
      >
        <ul className="flex flex-col items-start justify-start gap-3 p-3">
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
