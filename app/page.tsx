"use client";
import Link from "next/link";
import { redirect } from 'next/navigation'
import React, { useState, FormEvent } from "react";

export default function Home() {

  return (
    <main className="flex w-full min-w-[50rem] min-h-screen flex-col items-center justify-center gap-3 p-16 overflow-auto">
      <p className="text-white">Home</p>
    </main>
  );
}
