import "~/styles/globals.css";

import {GeistSans} from "geist/font/sans";
import {type Metadata} from "next";
import Link from "next/link";
import {Navbar} from "~/app/_components/Navbar";
import {ClerkProvider} from "@clerk/nextjs";
const LOGO_URL = "/logo2.png";

export const metadata: Metadata = {
  title: "NORA AI",
  icons: [{rel: "icon", url: LOGO_URL}],
};


export default function RootLayout({children}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>

      <body className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar/>
      {/* Main Content */}
      <main className="flex-grow">
        {children}
        <div id="modal-root"/>
      </main>
      </body>
      </html>
    </ClerkProvider>
  );
}