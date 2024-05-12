import React from "react";
import Link from "next/link";
import { SideBar, SibebarItem } from "../components/SideNav";
import {
    LifeBuoy,
    CircleUserRound ,
    NotepadText,
    Settings,
} from "lucide-react";

export default function Dashboard() {
  return (
    <main className="flex w-full min-h-screen items-center justify-start gap-3">
      <div className="">
        <SideBar>
            <SibebarItem icon={<LifeBuoy />} title="Dashboard" active alert />
            <SibebarItem icon={<NotepadText />} title="Forms" />
            <SibebarItem icon={<CircleUserRound />} title="Users" alert />
            <SibebarItem icon={<Settings />} title="Settings" />
        </SideBar>
      </div>
      <div className="flex flex-col w-full">
        <h1 className="">Dashboard</h1>
        <p className="text-blue-500 dark:text-pink-300">Welcome to the dashboard</p>
      </div>
    </main>
  );
}