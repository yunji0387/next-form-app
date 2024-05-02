"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import FormItem from "./components/FormItem";
import { LoadingScreen } from "./components/LoadingScreen";
import { SubmissionErrorContent } from "./components/SubmissionErrorContent";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the structure of a form data object
type FormData = {
  jobName: string;
  customerName: string;
  materialID: string[];
  materialName: string[];
  printType: string;
  printCustomerName: boolean;
  printCustomText: boolean;
  customText: string;
  designNotes: string;
  formId: number;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [forms, setForms] = useState<FormData[]>([]);
  const [verified, setVerified] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const router = useRouter();

  const auth = useAuth();

  useEffect(() => {
    verifyUser();
  }, []); // Dependency array is empty, so this effect will run only once after the component mounts

  useEffect(() => {
    if (verified) {
      const loginMessage = sessionStorage.getItem("loginSuccessMessage");
      if (loginMessage) {
        setTimeout(() => {
          toast.success(loginMessage);
          sessionStorage.removeItem("loginSuccessMessage"); // Clear the message so it doesn't reappear
          toast(
            `Welcome${authUser?.first_name ? `, ${authUser.first_name}` : ""}.`
          );
        }, 100); // Delay of 500 milliseconds
      }
      fetchForms();
    }
  }, [verified]);

  if (!auth) {
    console.error("Auth context is not available");
    return <div>No access to Auth context</div>;
  }

  const { authUser, logout, verify } = auth;

  const verifyUser = async () => {
    const result = await verify();
    setVerified(result);
    console.log("Verified: ", result);
    if (!result) {
      router.push("/login");
    }
  };

  // Function to fetch forms
  const fetchForms = async () => {
    const endpoint = process.env.NEXT_PUBLIC_FORM_SUBMISSION_URL;
    if (!endpoint) {
      console.error("Submission endpoint is not defined.");
      setLoadError(true);
      return;
    }

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch forms: ${response.statusText}`);
      }
      const data: FormData[] = await response.json();
      setForms(data);
      setLoadError(false); // Ensure error state is cleared on successful fetch
    } catch (error) {
      console.error("Error:", error);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLogoutLoading(true);
    const result = await logout();
    if (result) {
      sessionStorage.setItem("postLogoutMessage", "Log out successfully.");
      setIsLogoutLoading(false);
      router.push("/login");
    }
    setIsLogoutLoading(false);
  };

  return (
    <main className="flex w-full min-w-[50rem] min-h-screen flex-col items-center justify-center gap-3 p-16 overflow-auto">
      <ToastContainer />
      <div className="flex flex-col gap-2 bg-white w-full h-[35rem] p-3 overflow-auto">
        {verified && (
          <div className="w-full flex flex-col">
            <div className="w-full flex items-center justify-between">
              <p className="font-bold text-3xl">Form List</p>
              <div className="">
                <button
                  onClick={handleLogout}
                  disabled={isLogoutLoading}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isLogoutLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    "Log Out"
                  )}
                </button>
              </div>
            </div>
            <div>
              <Link href="/form">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  New Request
                </button>
              </Link>
            </div>
          </div>
        )}
        {isLoading && <LoadingScreen text="Loading ..." />}
        {loadError && (
          <SubmissionErrorContent
            headerText="Error Loading Form Data"
            contentText="An error occurred while loading the form data. Please try again later."
            onRetry={fetchForms} // Pass fetchForms to be called on retry
          />
        )}
        {!isLoading &&
          !loadError &&
          forms.map((form) => <FormItem key={form.formId} formData={form} />)}
      </div>
    </main>
  );
}
