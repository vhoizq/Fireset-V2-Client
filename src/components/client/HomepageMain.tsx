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
            

                <a href="/auth/redirect"
                    className="transition items-center duration-500 inline-flex rounded-xl hover:bg-gray-800 border border-transparent bg-gray-900 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-gray-600 hover:to-gray-800"
                >
                   Start your free trial <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-3  jsx-3151099842 icon icon--functional icon--arrow-cta"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.4 1 15 6.6l-5.6 5.6M15 6.6H1"></path></svg>
                </a>
      
        </div>
    );
};


export default HomePageMain;
