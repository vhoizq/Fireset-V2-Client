import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./client/auth";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Client } from "intercom-client";
import IntercomWidget from "@/components/client/Intercom";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "300"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Fireset Platform - Empowering Security in your Roblox group",
description: "Keeping your group safe on Roblox is very important, with Fireset, you can manage all of your moderation needs. All of this, in one easy-to-use dashboard.",
  keywords: "Discord bots, server management, custom bots, Discord server, Fireset Platform",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
     

        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
