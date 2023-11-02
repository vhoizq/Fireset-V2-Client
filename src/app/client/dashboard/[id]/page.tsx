"use client";

import useSWR from "swr";
import { useState, useEffect, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import Chart from "chart.js/auto";

import { HiX } from "react-icons/hi";
import { useAuth } from "../../auth";
import { Toaster, toast } from "react-hot-toast";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
    Bars3BottomLeftIcon,
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    CircleStackIcon,
    ClipboardDocumentIcon,
    Cog6ToothIcon,
    CpuChipIcon,
    FolderIcon,
    GlobeAltIcon,
    HomeIcon,
    InboxIcon,
    LockClosedIcon,
    PlusIcon,
    ShieldExclamationIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Avatar } from "@/components/content/Avatar";
import { MoonLoader } from "react-spinners";
import ClientsList from "@/components/client/ClientsList";
import IntercomWidget from "@/components/client/Intercom";
import React, { PureComponent } from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Jan',
        "Threats": 0,
        "Lockdowns": 0,
    },
    {
        name: 'Feb',
        "Threats": 2,
        "Lockdowns": 1,

    },
    {
        name: 'Mar',
        "Threats": 0,
        "Lockdowns": 0,

    },
    {
        name: 'Apr',
        "Threats": 0,
        "Lockdowns": 0,

    },
    {
        name: 'May',
        "Threats": 0,
        "Lockdowns": 0,

    },
    {
        name: 'Jun',
        "Threats": 0,
        "Lockdowns": 0,

    },
    {
        name: 'Jul',
        "Threats": 0,
        "Lockdowns": 0,

    },
    {
        name: 'Aug',
        "Threats": 0,
        "Lockdowns": 0,

    },
    {
        name: 'Sept',
        "Threats": 0,
        "Lockdowns": 0,

    },
    {
        name: 'Oct',
        "Threats": 0,
        "Lockdowns": 0,

    },
    {
        name: 'Nov',
        "Threats": 0,
        "Lockdowns": 0,

    },
    {
        name: 'Dec',
        "Threats": 0,
        "Lockdowns": 0,

    },


];

const userNavigation = [
    { name: "Dashboard", href: "/client" },
    { name: "Settings", href: "/client/settings" },
    { name: "Sign out", href: "/" },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function ClientPage() {
    const [quote, setQuote] = useState<string>(
        "We encountered an issue loading an inspirational quote."
    );
    const [daytime, setdaytime] = useState<string>("🌙 Good evening,");
    const auth = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const path = usePathname();

    const navigation = [
        {
            name: "Dashboard",
            href: `/client/dashboard/${path.split("/")[3]}`,
            icon: HomeIcon,
            current: true,
            paid: false,
        },
        {
            name: "Community Insights",
            href: `/client/dashboard/${path.split("/")[3]}/insights`,
            icon: GlobeAltIcon,
            current: false,
            paid: true,
        },
        {
            name: "Security Actions",
            href: `/client/dashboard/${path.split("/")[3]}/security`,
            icon: LockClosedIcon,
            current: false,
            paid: false,
        },
        {
            name: "Audit Logging",
            href: `/client/dashboard/${path.split("/")[3]}/audits`,
            icon: ClipboardDocumentIcon,
            current: false,
            paid: false,
        },
        {
            name: "Community Backups",
            href: `/client/dashboard/${path.split("/")[3]}/backups`,
            icon: CpuChipIcon,
            current: false,
            paid: true,
        },
        {
            name: "Moderation Suite",
            href: `/client/dashboard/${path.split("/")[3]}/moderation`,
            icon: ShieldExclamationIcon,
            current: false,
            paid: false,
        },
        {
            name: "Workspace Settings",
            href: `/client/dashboard/${path.split("/")[3]}/settings`,
            icon: Cog6ToothIcon,
            current: false,
            paid: false,
        },
    ];

    useEffect(() => {
        async function generateQuote() {
            function generateNewQuote() {
                const quotes = [
                    "The only way to do great work is to love what you do.",
                    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
                    "In the middle of every difficulty lies opportunity.",
                    "The only limit to our realization of tomorrow will be our doubts of today.",
                    "Life is what happens when you're busy making other plans.",
                    "The future belongs to those who believe in the beauty of their dreams.",
                    "Don't count the days, make the days count.",
                    "The only person you are destined to become is the person you decide to be.",
                    "Your time is limited, don't waste it living someone else's life.",
                    "The journey of a thousand miles begins with one step.",
                ];

                const randomIndex = Math.floor(Math.random() * quotes.length);

                const randomQuote = quotes[randomIndex];

                setQuote(randomQuote);
            }

            generateNewQuote(); // Call the generateNewQuote function
        }

        generateQuote(); // Call the generateQuote function
    }, []);

    useEffect(() => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const amPm = currentTime.toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
        });

        let message = "";

        if (amPm.endsWith("AM")) {
            message = "☕ Good morning,";
        } else if (currentHour >= 12 && currentHour < 16) {
            message = "☀️ Good afternoon,";
        } else {
            message = "🌙 Good evening,";
        }

        setdaytime(message);
    }, []); // Empty dependency array to run only once

    const fetchWorkspaceInformation = async (accessToken: any) => {
        try {
            const response = await axios.get(`/api/groups/${path.split("/")[3]}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.log(`New error: ${error}`);
        }
    };

    const [state, setState] = useState<boolean>(false);
    const cache = useSWR(`/api`, fetch);

    const { data: workspaceInformation, error: userGuildsError } = useSWR(
        () => auth.user?.sessionToken,
        fetchWorkspaceInformation
    );

    const router = useRouter();
    if (auth.user?.isBeta === false) {
        router.replace("/client/thanks");
    }

    if (auth.user?.isActive === false) {
        router.replace("/client/notice");
    }

    return auth.user && workspaceInformation ? (
        <main>
            <Toaster position="bottom-center" reverseOrder={false} />

            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 md:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex flex-shrink-0 items-center px-4">
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="mt-5 h-0 flex-1 overflow-y-auto">
                                        <nav className="space-y-1 px-2">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current
                                                                ? "text-gray-500"
                                                                : "text-gray-400 group-hover:text-gray-500",
                                                            "mr-4 flex-shrink-0 h-6 w-6"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="w-14 flex-shrink-0" aria-hidden="true">
                                {/* Dummy element to force sidebar to shrink to fit close icon */}
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
                        <div className="flex flex-shrink-0 items-center px-4">
                            <img
                                className="block h-8 w-auto"
                                src="https://media.discordapp.net/attachments/1109372391043375234/1130028056187252767/New_Project_41.png"
                                alt="Fireset Platform"
                            />
                        </div>
                        <div className="mt-5 flex flex-grow flex-col">
                            <nav className="flex-1 space-y-1 px-2 pb-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                            "group flex items-center px-2 py-2   text-sm font-medium rounded-md"
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current
                                                    ? "text-gray-500"
                                                    : "text-gray-400 group-hover:text-gray-500",
                                                "mr-3 flex-shrink-0 h-6 w-6"
                                            )}
                                            aria-hidden="true"
                                        />
                                        <div className="">{item.name}</div>
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col md:pl-64">
                    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
                        <button
                            type="button"
                            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex flex-1 justify-between px-4">
                            <div className="flex flex-1"></div>
                            <div className="ml-4 flex items-center md:ml-6">
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                            <span className="sr-only">Open user menu</span>
                                            <Avatar
                                                className="w-8 h-8 rounded-full my-auto"
                                                userId={auth.user!.userId}
                                                onError={() => <></>}
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                active ? "bg-gray-100" : "",
                                                                "block px-4 py-2 text-sm text-gray-700"
                                                            )}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className="flex-1">
                        <div className="py-6">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    {daytime}{" "}
                                    <span
                                        style={{ color: `${workspaceInformation.group.color}` }}
                                    >
                                        {" "}
                                        {auth.user.username}
                                    </span>
                                    ! Good to see you.
                                </h1>
                                <h1 className="text-md font-medium text-gray-900">
                                    Welcome to the{" "}
                                    <span
                                        style={{ color: `${workspaceInformation.group.color}` }}
                                    >
                                        {workspaceInformation.group.name}
                                    </span>{" "}
                                    Dashboard
                                </h1>
                            </div>
                            <div className="mx-auto max-w-7xl">
                                <div className="mr-6 ml-8 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    <div className="relative w-full text-left  rounded-lg p-6 border border-gray-300">
                                        <p className="text-lg sm:text-base font-semibold">
                                            Active Moderation Cases
                                        </p>
                                        <p className="font-normal text-gray-700 text-lg dark:text-dark-content-emphasis mt-1 text-inherit">
                                            0
                                        </p>
                                    </div>
                                    <div className="relative w-full text-left  rounded-lg p-6 border border-gray-300">
                                        <p className="text-lg sm:text-base font-semibold">
                                            Community Threat Level
                                        </p>
                                        <p
                                            className="font-medium text-lg dark:text-dark-content-emphasis mt-1 text-inherit"
                                            style={{ color: `#a866ff` }}
                                        >
                                            All Clear
                                        </p>
                                    </div>
                                    <div className="relative w-full text-left  rounded-lg p-6 border border-gray-300">
                                        <p className="text-lg sm:text-base font-semibold">
                                            Avaliable Backups
                                        </p>
                                        <p className="font-normal text-lg text-gray-700 dark:text-dark-content-emphasis mt-1 text-inherit">
                                            1
                                        </p>
                                    </div>
                                </div>
                                <div className="mr-6 ml-8 mt-2 grid grid-cols-1  gap-2">
                                    <div className="relative w-full text-left  rounded-lg p-6 border border-gray-300">
                                        <p className="text-lg sm:text-base font-semibold">
                                            Inspirational Quote
                                        </p>
                                        <p className="font-serif text-gray-700 text-lg dark:text-dark-content-emphasis mt-1 text-inherit">
                                            "{quote}"
                                        </p>
                                    </div>
                                </div>

                                <div className="mr-6 ml-8 mt-2 grid grid-cols-1  gap-2">
                                    <div className="relative w-full text-left  rounded-lg p-6 border border-gray-300">
                                        <p className="text-lg sm:text-base font-semibold">
                                            Visualise your community
                                        </p>
                                        <div className="text-center mt-5">
                                            <div id="chart-container" >
                                                <BarChart
                                                    width={1090}
                                                    height={300}
                                                    data={data}
                                                    margin={{
                                                        top: 5,
                                                        right: 30,
                                                        left: 5,
                                                        bottom: 5,
                                                    }}
                                                    barSize={15}
                                                >
                                                    <XAxis dataKey="name" scale="point" padding={{ left: 18, right: 10 }} />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <Bar dataKey="Threats" fill='#9657fa' background={{ fill: '#eee' }} />
                                                    <Bar dataKey="Lockdowns" fill='#ff6680' background={{ fill: '#eee' }} />
                                                </BarChart>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </main>
    ) : (
        <div className="flex h-screen items-center justify-center">
            <Spinner color="secondary" size="lg" />
        </div>
    );
}
