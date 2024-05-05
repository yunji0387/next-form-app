"use client";
import React from "react";
import { ChevronLast, ChevronFirst, MoreVertical } from "lucide-react";
import Image from "next/image";

type SideNavProps = {
  children: React.ReactNode;
};

export function SideBar({ children }: SideNavProps) {
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="https://img.logoipsum.com/243.svg"
            width={150}
            height={20}
            alt="logo"
          />
          <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            <ChevronFirst size={24} />
          </button>
        </div>

        <ul className="flex-1 px-3 bg-red-50">{children}</ul>

        <div className="border-t flex p-3">
          <Image
            src="https://img.logoipsum.com/225.svg"
            width={50}
            height={50}
            alt="avatar"
          />
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col justify-between items-center w-full ml-3">
              <h4 className="w-full font-semibold">John Doe</h4>
              <span className="w-full text-xs text-gray">
                johndoe@example.com
              </span>
            </div>
            <MoreVertical size={24} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SibebarItem({ icon, title, active, alert }: any) {
  return (
    <li
      className={`relative flex items-center justify-start p-3 my-2 rounded-md font-medium cursor-pointer transition-colors
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }`}
    >
      {icon}
      <span className="ml-3">{title}</span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400`}
        />
      )}
    </li>
  );
}

// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { HamburgerIcon } from "./HamburgerIcon";

// const navItems = [
//   {
//     name: "Home",
//     path: "/",
//   },
//   {
//     name: "Dashboard",
//     path: "/dashboard",
//   },
//   {
//     name: "Login",
//     path: "/login",
//   },
//   {
//     name: "Register",
//     path: "/register",
//   },
// ];

// export default function SideNav() {
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();

//   const handleClick = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`flex flex-col w-full bg-blue-900`}>
//       <div className="w-full h-full flex items-center justify-center bg-cyan-500">
//         <HamburgerIcon isOpen={isOpen} handleClick={handleClick} />
//       </div>
//       <nav
//         className={`${
//           isOpen
//             ? "flex transition-all duration-500 ease-in-out"
//             : "hidden"
//         }`}
//       >
//         <ul className="bg-pink-200 flex flex-col items-start justify-start gap-3">
//           <Link href="/">
//             <li className="text-white list-none">Home</li>
//           </Link>
//           <Link href="/dashboard">
//             <li className="text-white list-none">Dashboard</li>
//           </Link>
//           <Link href="/login">
//             <li className="text-white list-none">Login</li>
//           </Link>
//           <Link href="/register">
//             <li className="text-white list-none">Register</li>
//           </Link>
//         </ul>
//       </nav>
//     </div>
//   );
// }
