"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import { skillsIconList } from "@/public/skillsIconList";

export default function Home() {
  const router = useRouter();
  const auth = useAuth();

  if (!auth) {
    console.error("Auth context is not available");
    return <div>No access to Auth context</div>;
  }

  const { verify } = auth;

  const verifyUser = async () => {
    const result = await verify();
    if (result) {
      sessionStorage.setItem(
        "postRegistrationMessage",
        "Registration successful. Please log in."
      );
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    verifyUser();
  }, []); // Dependency array is empty, so this effect will run only once after the component mounts

  return (
    <main className="flex w-full min-h-screen overflow-auto">
      <ToastContainer />
      <div className="flex flex-col items-center justify-between w-[28rem] h-screen bg-white dark:bg-gray-700">
        <div className="w-full flex flex-col items-center">
          <Image
            src="/NextAdminLogoLight.svg"
            width={400}
            height={25}
            className="overflow-hidden transition-all hidden dark:block pt-5"
            alt="logo"
          />
          <Image
            src="/NextAdminLogoDark.svg"
            width={400}
            height={25}
            className="overflow-hidden transition-all dark:hidden pt-5"
            alt="logo"
          />
          <p className="select-none w-full text-center text-xl xs:text-2xl sm:text-3xl text-indigo-900 dark:text-white pt-2">
            Elevate Your Efficiency
          </p>
        </div>

        <div className="select-none flex flex-col w-full items-center justify-center">
          <p className="text-sm">Our Features</p>
          <div className="flex flex-col w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center w-full p-2">
              <p className="text-lg dark:text-gray-300">User Management</p>
              <p className="text-sm dark:text-gray-300">
                Manage users and roles
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full p-2">
              <p className="text-lg dark:text-gray-300">Form Management</p>
              <p className="text-sm dark:text-gray-300">
                Create and handle forms
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full p-2">
              <p className="text-lg dark:text-gray-300">Data Analytics</p>
              <p className="text-sm dark:text-gray-300">
                Gain insights and information
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full p-2">
              <p className="text-lg dark:text-gray-300">
                Customizable Dashboard
              </p>
              <p className="text-sm dark:text-gray-300">
                Personalize your admin view
              </p>
            </div>
          </div>

          <p className="select-none w-full pt-5 text-center text-sm">
            Our Tech Stack
          </p>
          <div className="flex items-center justify-center w-full grayscale dark:invert">
            {skillsIconList.map((icon, index) => (
              <Image
                key={index}
                src={icon.icon}
                width={40}
                height={40}
                alt={icon.title}
                className="select-none p-2"
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              router.push("/register");
            }}
            className="bg-indigo-300 dark:bg-emerald-600 hover:bg-indigo-400 dark:hover:bg-emerald-500 text-indigo-900 dark:text-white font-bold px-4 py-2 rounded sm:text-xl"
          >
            Register
          </button>
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="text-indigo-900 dark:text-gray-100 dark:hover:text-white dark:hover:underline font-bold px-4 py-2 rounded sm:text-xl"
          >
            Login
          </button>
        </div>
        <Footer />
      </div>
    </main>
  );
}