import "~/styles/globals.css";
// import "@uploadthing/react/styles.css";

import {GeistSans} from "geist/font/sans";
import {type Metadata} from "next";
import Link from "next/link";
import {Navbar} from "~/app/_components/Navbar";
import {ClerkProvider} from "@clerk/nextjs";
// import { extractRouterConfig } from "uploadthing/server";
// import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
// import { ourFileRouter } from "./api/uploadthing/core";

export const metadata: Metadata = {
  title: "JHU Course Vote",
  icons: [{rel: "icon", url: "/favicon.ico"}],
};


export default function RootLayout({children, modal}: {
  children: React.ReactNode;
  modal: React.ReactNode;
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
        {modal}
        <div id="modal-root"/>
      </main>
      </body>
      </html>
    </ClerkProvider>
  );
}