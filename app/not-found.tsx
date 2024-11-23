"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <div>
        <Image
          src="/NextAdminLogoLight.svg"
          width={300}
          height={75}
          className="overflow-hidden transition-all hidden dark:block"
          alt="logo"
        />
        <Image
          src="/NextAdminLogoDark.svg"
          width={300}
          height={75}
          className="overflow-hidden transition-all dark:hidden"
          alt="logo"
        />
      </div>
      <h2 className="mt-3 text-9xl font-black text-gray-800 dark:text-indigo-100">
        404
      </h2>
      <h2 className="my-3 text-3xl font-black text-gray-800 dark:text-indigo-100">
        OOPS! Page Not Found
      </h2>

      <p className="text-gray-700 dark:text-indigo-100 py-5">
        Here is a few link that may be helpful:
      </p>
      <button
        onClick={() => router.back()}
        className="my-3 border-b hover:border-b-2 border-gray-700 dark:border-indigo-100 text-gray-700 dark:text-indigo-100 text-xl font-light hover:font-medium transition-all duration-100"
      >
        Go Back
      </button>
      <Link
        href="/dashboard"
        className="my-3 border-b hover:border-b-2 border-gray-700 dark:border-indigo-100 text-gray-700 dark:text-indigo-100 text-xl font-light hover:font-medium transition-all duration-100"
      >
        Home
      </Link>
    </div>
  );
}
