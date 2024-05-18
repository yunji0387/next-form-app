"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SideBar, SibebarItem } from "../components/SideNav";
import { FormList } from "../components/FormList";
import { LifeBuoy, CircleUserRound, NotepadText, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [verified, setVerified] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    verifyUser();
  }, []); // Dependency array is empty, so this effect will run only once after the component mounts

  if (!auth) {
    console.error("Auth context is not available");
    return <div>No access to Auth context</div>;
  }

  const { authUser, verify } = auth;

  const verifyUser = async () => {
    const result = await verify();
    setVerified(result);
    if (!result) {
      sessionStorage.setItem(
        "homeUnauthorizedMessage",
        "Unauthorized Access. Please log in."
      );
      router.push("/login");
    }
  };

  return (
    <main className="flex w-full min-h-screen items-center justify-start gap-3">
      <div className="">
        <SideBar>
          <SibebarItem
            icon={<LifeBuoy />}
            title="Dashboard"
            link="dashboard"
            active
            alert
          />
          <SibebarItem icon={<NotepadText />} title="Forms" link="forms" />
          <SibebarItem
            icon={<CircleUserRound />}
            title="Users"
            link="users"
            alert
          />
          <SibebarItem icon={<Settings />} title="Settings" link="settings" />
        </SideBar>
      </div>
      <div className="flex flex-col w-full">
        <h1 className="">Dashboard</h1>
        <p className="text-blue-500 dark:text-pink-300">
          Welcome to the dashboard
        </p>
        <FormList />
      </div>
    </main>
  );
}
