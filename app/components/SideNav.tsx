"use client";
import React, { useState, createContext, useContext } from "react";
import { ChevronLast, ChevronFirst, MoreVertical } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

type SideNavProps = {
  children: React.ReactNode;
};

const SideBarContext = createContext<{ expanded: boolean }>({
  expanded: false,
});

export function SideBar({ children }: SideNavProps) {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="/NextAdminLogoLight.svg"
            width={expanded ? 200 : 0}
            height={25}
            className="overflow-hidden transition-all hidden dark:block"
            alt="logo"
          />
          <Image
            src="/NextAdminLogoDark.svg"
            width={expanded ? 200 : 0}
            height={25}
            className="overflow-hidden transition-all dark:hidden"
            alt="logo"
          />
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SideBarContext.Provider value={{ expanded }}>
          <div className="flex-1 px-3">
            <ul>{children}</ul>
            <div className={`flex justify-end ${expanded ? "" : "hidden"}`}>
              <ThemeToggle />
            </div>
          </div>
        </SideBarContext.Provider>
        <div className="border-t flex p-3">
          <Image
            src="https://img.logoipsum.com/225.svg"
            width={50}
            height={50}
            alt="avatar"
          />
          <div
            className={`flex items-center justify-between overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            } `}
          >
            {/* <div className="flex flex-col justify-between items-center w-full ml-3"> */}
            <div className="leading-4">
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
  const { expanded } = useContext(SideBarContext);
  return (
    <li
      className={`relative flex items-center justify-start p-3 my-2 rounded-md font-medium cursor-pointer transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {title}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-white text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {title}
        </div>
      )}
    </li>
  );
}
