import React from "react";
import { SideBar, SibebarItem } from "../components/SideNav";
import {
    LifeBuoy,
    Receipt,
    Boxes,
    Settings,
} from "lucide-react";

export default function Dashboard() {
  return (
    <main className="flex w-full min-h-screen items-center justify-start gap-3">
      <div className="w-full">
        <SideBar>
            <SibebarItem icon={<LifeBuoy />} title="Dashboard" active alert />
            <SibebarItem icon={<Receipt />} title="Users" />
            <SibebarItem icon={<Boxes />} title="Orders" alert />
            <SibebarItem icon={<Settings />} title="Settings" />
        </SideBar>
      </div>
      <div className="flex w-full">
        <h1 className="text-white">Dashboard</h1>
        <p className="text-white">Welcome to the dashboard</p>
      </div>
    </main>
  );
}