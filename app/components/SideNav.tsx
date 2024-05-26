"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLast, ChevronFirst, MoreVertical } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

type SideNavProps = {
  children: React.ReactNode;
};

const SideBarContext = createContext<{ expanded: boolean }>({
  expanded: false,
});

export function SideBar({ children }: SideNavProps) {
  const [expanded, setExpanded] = useState(true);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    userInfo();
  }, []);

  if (!auth) {
    console.error("Auth context is not available");
    return <div>No access to Auth context</div>;
  }

  const { userInfo, authUser, logout } = auth;

  const handleLogout = async () => {
    setIsLogoutLoading(true);
    const result = await logout();
    if (result) {
      setIsLogoutLoading(false);
      router.push("/login");
    }
    setIsLogoutLoading(false);
  };

  return (
    <aside className="z-50 h-screen min-h-[35rem]">
      <nav className="h-full flex flex-col bg-white dark:bg-gray-700 shadow-sm">
        <div
          className={`pb-2 flex items-center ${
            expanded ? "p-4 justify-between" : "p-3"
          } `}
        >
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
            onClick={() => {
              setExpanded(!expanded);
              if (!expanded) {
                setShowMoreButton(false);
              }
            }}
            className="flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 w-12 h-12"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SideBarContext.Provider value={{ expanded }}>
          <div className="flex-1 px-3">
            <ul>{children}</ul>
            <div className={`flex justify-end p-3 ${!expanded && "hidden"}`}>
              <div className="scale-125">
                <ThemeToggle />
              </div>
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
            className={`flex items-center justify-between transition-all ${
              expanded ? "w-52 ml-3" : "overflow-hidden w-0"
            } `}
          >
            <div className="leading-4">
              <h4 className="w-full font-semibold">{authUser?.first_name} {authUser?.last_name}</h4>
              <span className="w-full text-xs text-gray">
                {authUser?.email}
              </span>
            </div>
            <div className="z-50 relative flex">
              <button
                className="hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                onClick={() => setShowMoreButton(!showMoreButton)}
              >
                <MoreVertical size={38} />
              </button>
              <div className={`
              ${showMoreButton ? "opacity-100 visible -translate-y-[6.5rem]" : "opacity-0 invisible -translate-y-16"}
              -translate-x-[7.5rem] absolute w-40 flex flex-col justify-around gap-3 duration-300 transition-all rounded`}>
                <button
                  className="w-full px-3 py-1 font-medium text-indigo-800 dark:text-white bg-indigo-200 dark:bg-emerald-600 hover:bg-indigo-300 dark:hover:bg-emerald-500 rounded"
                  onClick={handleLogout}
                  disabled={isLogoutLoading}
                >
                  {isLogoutLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    "Log Out"
                  )}
                </button>
                <button
                  className="w-full cursor-not-allowed px-3 py-1 font-medium text-indigo-800 dark:text-white bg-indigo-200 dark:bg-emerald-600 hover:bg-indigo-300 dark:hover:bg-emerald-500 rounded"
                  onClick={() => {
                    // Handle profile settings logic here
                    console.log("Profile settings");
                  }}
                >
                  Profile Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SibebarItem({ icon, title, link, active, alert }: any) {
  const { expanded } = useContext(SideBarContext);
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <li>
      <button
        className={`relative flex items-center justify-start p-3 my-2 rounded-md font-medium cursor-pointer transition-colors group
        ${
          currentPath === "/" + link
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 dark:from-emerald-500 dark:to-emerald-700 text-indigo-800 dark:text-white"
            : "hover:bg-indigo-50 dark:hover:bg-emerald-800 text-gray-600 dark:text-indigo-100"
        }
        `}
        onClick={() => {
          router.push("/" + link);
        }}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all text-left ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {title}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 dark:bg-emerald-100 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-white dark:bg-gray-500 text-indigo-800 dark:text-gray-50 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {title}
          </div>
        )}
      </button>
    </li>
  );
}
