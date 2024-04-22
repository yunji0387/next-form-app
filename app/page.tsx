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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [forms, setForms] = useState<FormData[]>([]); // State to store the form data

  useEffect(() => {
    // const endpoint = process.env.NEXT_PUBLIC_FORM_SUBMISSION_URL;
    const endpoint = "";
    if (!endpoint) {
      console.error("Submission endpoint is not defined.");
      setLoadError(true);
      // alert("Submission endpoint is not set in the environment variables.");
      return;
    }

    async function fetchForms() {
      setIsLoading(true);
      const response = await fetch(endpoint || ""); // Update with your endpoint
      if (response.ok) {
        const data: FormData[] = await response.json();
        setForms(data); // Update state with fetched form data
        setIsLoading(false);
      } else {
        console.error("Failed to fetch forms:", response.statusText);
        setLoadError(true);
      }
    }
    setIsLoading(false);
    fetchForms();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-24">
      <div>
        <Link href="/form">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            New Request
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-2 bg-white w-full h-[35rem] rounded-md">
        <p className="w-full p-3 text-center font-bold text-2xl">
          Form List
        </p>
        <div className="flex flex-col gap-2 overflow-auto">
          {isLoading && <LoadingScreen text="Loading Form List ..." />}
          {loadError && (
          <SubmissionErrorContent
            headerText="Error Loading Form Data"
            contentText="An error occurred while loading the form data. Please try again later."
            onRetry={() => {
              setLoadError(false);
            }}
          />
        )}
          {forms.map((form) => (
            <FormItem key={form.formId} formData={form} />
          ))}
        </div>
      </div>
    </main>
  );
}

// import Link from 'next/link';
// import FormItem from './components/FormItem';

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-24">
//       <div>
//         <Link href="/form">
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             New Request
//           </button>
//         </Link>
//       </div>
//       <div className="flex flex-col gap-2 bg-white w-full h-[35rem] rounded-md">
//         <p className="bg-pink-100 w-full text-center font-bold text-2xl">Form List</p>
//         <FormItem />
//       </div>
//     </main>
//   );
// }
