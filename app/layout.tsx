import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FormDataProvider } from "./context/FormDataContext";
import { AuthProvider } from "./context/AuthContext";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Admin",
  description:
    "A multi-step form application built with Next.js and Tailwind CSS.",
  icons: {
    icon: "/NextAdminLogoDark.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <FormDataProvider>
            <Providers>{children}</Providers>
          </FormDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
