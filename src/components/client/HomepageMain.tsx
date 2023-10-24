import { useState, useEffect } from "react";
import { PlusIcon, LinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "@/app/client/auth";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import useSWR from "swr"; // Import the useSWR hook
import { CheckBadgeIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { HiDotsVertical } from "react-icons/hi";
import { Logo } from "../content/Logo";

interface Group {
    group: {
        id: String;
        primaryColor: String;
        name: String;
        groupId: String;
        verified: Boolean;
    };
}

export const HomePageMain = () => {
    const auth = useAuth();

    console.log(auth)

    return (
        <div>
            {auth.user ? (
                <a href="https://apis.roblox.com/oauth/v1/authorize?client_id=2682885889385043103&redirect_uri=https://fireset.xyz/auth/redirect&scope=openid+profile&response_type=Code&prompts=login+consent&nonce=12345&state=6789"
                    className="transition duration-200 inline-flex rounded-xl border border-transparent bg-purple-500 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-600 hover:to-purple-800"
                >
                    Welcome back, {auth.user.username}
                </a>
            ) : (

                <a href="https://apis.roblox.com/oauth/v1/authorize?client_id=2682885889385043103&redirect_uri=https://fireset.xyz/auth/redirect&scope=openid+profile&response_type=Code&prompts=login+consent&nonce=12345&state=6789"
                    className="transition duration-200 inline-flex rounded-xl border border-transparent bg-purple-500 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-600 hover:to-purple-800"
                >
                    Join the waitlist
                </a>
            )}
        </div>
    );
};


export default HomePageMain;
