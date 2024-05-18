"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
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
    if (result) {
      // const loginMessage = sessionStorage.getItem("loginSuccessMessage");
      // if (loginMessage) {
      //   setTimeout(() => {
      //     toast.success(loginMessage);
      //     sessionStorage.removeItem("loginSuccessMessage"); // Clear the message so it doesn't reappear
      //     toast(
      //       `Welcome${authUser?.first_name ? `, ${authUser.first_name}` : ""}.`
      //     );
      //   }, 100); // Delay of 500 milliseconds
      // }
      router.push("/dashboard");
    }
  };

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
        <p className="w-full text-center text-xl xs:text-2xl sm:text-3xl text-indigo-900 dark:text-white pt-2">
          Elevate Your Efficiency
        </p>
          <p className="w-full pt-5 text-center text-sm">Our Tech Stack</p>
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

        <div className="flex flex-col w-full items-center justify-center">
            <p className="text-sm">Our Features</p>
            <div className="flex flex-col gap-2 w-full items-center justify-center">
              <div className="flex flex-col items-center justify-center w-full p-2">
                <p className="text-lg dark:text-gray-300">User Management</p>
                <p className="text-sm dark:text-gray-300">Manage users and roles</p>
              </div>
              <div className="flex flex-col items-center justify-center w-full p-2">
                <p className="text-lg dark:text-gray-300">Form Management</p>
                <p className="text-sm dark:text-gray-300">Create and handle forms</p>
              </div>
              <div className="flex flex-col items-center justify-center w-full p-2">
                <p className="text-lg dark:text-gray-300">Data Analytics</p>
                <p className="text-sm dark:text-gray-300">Gain insights and information</p>
              </div>
            </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              router.push("/register");
            }}
            className="bg-indigo-300 dark:bg-indigo-600 hover:bg-indigo-400 dark:hover:bg-indigo-700 text-indigo-900 dark:text-white font-bold px-4 py-2 rounded sm:text-xl"
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

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import FormItem from "./components/FormItem";
// import { LoadingScreen } from "./components/LoadingScreen";
// import { SubmissionErrorContent } from "./components/SubmissionErrorContent";
// import { useRouter } from "next/navigation";
// import { useAuth } from "./context/AuthContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Define the structure of a form data object
// type FormData = {
//   jobName: string;
//   customerName: string;
//   materialID: string[];
//   materialName: string[];
//   printType: string;
//   printCustomerName: boolean;
//   printCustomText: boolean;
//   customText: string;
//   designNotes: string;
//   formId: number;
// };

// export default function Home() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadError, setLoadError] = useState(false);
//   const [forms, setForms] = useState<FormData[]>([]);
//   const [verified, setVerified] = useState(false);
//   const [isLogoutLoading, setIsLogoutLoading] = useState(false);
//   const router = useRouter();

//   const auth = useAuth();

//   useEffect(() => {
//     verifyUser();
//   }, []); // Dependency array is empty, so this effect will run only once after the component mounts

//   useEffect(() => {
//     if (verified) {
//       const loginMessage = sessionStorage.getItem("loginSuccessMessage");
//       if (loginMessage) {
//         setTimeout(() => {
//           toast.success(loginMessage);
//           sessionStorage.removeItem("loginSuccessMessage"); // Clear the message so it doesn't reappear
//           toast(
//             `Welcome${authUser?.first_name ? `, ${authUser.first_name}` : ""}.`
//           );
//         }, 100); // Delay of 500 milliseconds
//       }
//       fetchForms();
//     }
//   }, [verified]);

//   if (!auth) {
//     console.error("Auth context is not available");
//     return <div>No access to Auth context</div>;
//   }

//   const { authUser, logout, verify } = auth;

//   const verifyUser = async () => {
//     const result = await verify();
//     setVerified(result);
//     if (!result) {
//       sessionStorage.setItem(
//         "homeUnauthorizedMessage",
//         "Unauthorized Access. Please log in."
//       );
//       router.push("/login");
//     }
//   };

//   // Function to fetch forms
//   const fetchForms = async () => {
//     const endpoint = process.env.NEXT_PUBLIC_FORM_SUBMISSION_URL;
//     if (!endpoint) {
//       console.error("Submission endpoint is not defined.");
//       setLoadError(true);
//       return;
//     }

//     try {
//       const response = await fetch(endpoint);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch forms: ${response.statusText}`);
//       }
//       const data: FormData[] = await response.json();
//       setForms(data);
//       setLoadError(false); // Ensure error state is cleared on successful fetch
//     } catch (error) {
//       console.error("Error:", error);
//       setLoadError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     setIsLogoutLoading(true);
//     const result = await logout();
//     if (result) {
//       setIsLogoutLoading(false);
//       router.push("/login");
//     }
//     setIsLogoutLoading(false);
//   };

//   return (
//     <main className="flex w-full min-w-[50rem] min-h-screen p-5 flex-col items-center justify-center overflow-auto">
//       <ToastContainer />
//       <div className="flex flex-col gap-2 bg-white w-full h-[35rem] p-3 overflow-auto">
//         {verified && (
//           <div className="w-full flex flex-col">
//             <div className="w-full flex items-center justify-between">
//               <p className="font-bold text-3xl text-black">Form List</p>
//               <div className="">
//                 <button
//                   onClick={handleLogout}
//                   disabled={isLogoutLoading}
//                   className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   {isLogoutLoading ? (
//                     <div className="flex items-center justify-center">
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                     </div>
//                   ) : (
//                     "Log Out"
//                   )}
//                 </button>
//               </div>
//             </div>
//             <div>
//               <Link href="/form">
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                   New Request
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}
//         {isLoading && <LoadingScreen text="Loading ..." />}
//         {loadError && (
//           <SubmissionErrorContent
//             headerText="Error Loading Form Data"
//             contentText="An error occurred while loading the form data. Please try again later."
//             onRetry={fetchForms} // Pass fetchForms to be called on retry
//           />
//         )}
//         {!isLoading &&
//           !loadError &&
//           forms.map((form) => <FormItem key={form.formId} formData={form} />)}
//       </div>
//     </main>
//   );
// }
