"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import FormItem from "./FormItem";
import { LoadingScreen } from "./LoadingScreen";
import { SubmissionErrorContent } from "./SubmissionErrorContent";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
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

export function FormList() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [forms, setForms] = useState<FormData[]>([]);
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  const auth = useAuth();

  useEffect(() => {
    verifyUser();
  }, []); // Dependency array is empty, so this effect will run only once after the component mounts

  useEffect(() => {
    if (verified) {
      fetchForms();
    }
  }, [verified]);

  if (!auth) {
    console.error("Auth context is not available");
    return <div>No access to Auth context</div>;
  }

  const { verify } = auth;

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

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-auto">
      <ToastContainer />
      <div className="flex flex-col gap-2 bg-white dark:bg-gray-600 rounded-md w-full h-[35rem] p-3 overflow-auto">
        {verified && (
          <div className="w-full flex flex-col">
            <div className="w-full flex items-center justify-between">
              <p className="font-bold text-3xl">Form List</p>
            </div>
            <div>
              <Link href="/form">
                <button className="bg-indigo-500 dark:bg-emerald-500 hover:bg-indigo-700 dark:hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded">
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
    </div>
  );
}
