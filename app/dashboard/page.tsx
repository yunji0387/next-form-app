import React from "react";
import SideNav from "../components/SideNav";

export default function Dashboard() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-start gap-3">
      <div className="w-full">
        <SideNav />
      </div>
      <div className="flex w-full">
        <h1 className="text-white">Dashboard</h1>
        <p className="text-white">Welcome to the dashboard</p>
      </div>
    </main>
  );
}