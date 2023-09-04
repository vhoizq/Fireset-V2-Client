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
  title: "Fireset Platform - Custom Discord Bots and Server Management",
  description: "Create and manage custom Discord bots to streamline your server's administration. Simplify server management with Fireset.",
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
