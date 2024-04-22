"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import FormItem from "./components/FormItem";
import { LoadingScreen } from "./components/LoadingScreen";
import { SubmissionErrorContent } from "./components/SubmissionErrorContent";

// Define the structure of a form data object
type FormData = {
  _id: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [forms, setForms] = useState<FormData[]>([]);

  useEffect(() => {
    fetchForms();
  }, []); // Dependency array is empty, so this effect will run only once after the component mounts

  // Function to fetch forms
  const fetchForms = async () => {
    const endpoint = process.env.NEXT_PUBLIC_FORM_SUBMISSION_URL;
    if (!endpoint) {
      console.error("Submission endpoint is not defined.");
      setLoadError(true);
      return;
    }

    setIsLoading(true);
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
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-24">
      <div>
        <Link href="/form">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            New Request
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-2 bg-white w-full h-[35rem] rounded-md overflow-auto">
        <p className="w-full pt-5 pl-5 font-bold text-2xl">Form List</p>
        {isLoading && <LoadingScreen text="Loading Form List..." />}
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