import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FormDataProvider } from "./context/FormDataContext";
import { AuthProvider } from "./context/AuthContext";
import { Providers } from "./ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Form App",
  description:
    "A multi-step form application built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <FormDataProvider>{children}</FormDataProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
