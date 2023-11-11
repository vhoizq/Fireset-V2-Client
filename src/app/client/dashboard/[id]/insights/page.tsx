"use client";

import useSWR from "swr";
import { useState, useEffect, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";


import { HiX } from "react-icons/hi";
import { useAuth } from "../../../auth";
import { Toaster, toast } from "react-hot-toast";
import { Dialog, Menu, Transition } from '@headlessui/react'
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
    UserGroupIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Avatar } from "@/components/content/Avatar";
import { MoonLoader } from "react-spinners";
import ClientsList from "@/components/client/ClientsList";



const userNavigation = [
    { name: "Dashboard", href: "/client" },
    { name: "Settings", href: "/client/settings" },
    { name: "Sign out", href: "/" },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}


export default function ClientPage() {
    const auth = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false)



    const path = usePathname();

    const navigation = [
        {
            name: "Dashboard",
            href: `/client/dashboard/${path.split("/")[3]}`,
            icon: HomeIcon,
            current: false,
            paid: false,
        },
        {
            name: "Community Insights",
            href: `/client/dashboard/${path.split("/")[3]}/insights`,
            icon: GlobeAltIcon,
            current: true,
            paid: true,
        },
        {
            name: "Group Members",
            href: `/client/dashboard/${path.split("/")[3]}/members`,
            icon: UserGroupIcon,
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

    const fetchWorkspaceInformation = async (accessToken: any) => {
        try {
            const response = await axios.get(`/api/groups/${path.split("/")[3]}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.log(`New error: ${error}`)
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

   


    return auth.user && workspaceInformation ? (
        <main>

            <Toaster position="bottom-center" reverseOrder={false} />


            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
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
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
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
                                                            ? 'bg-gray-100 text-gray-900'
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                            'mr-4 flex-shrink-0 h-6 w-6'
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
                                            item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-2 py-2   text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                'mr-3 flex-shrink-0 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />
                                        <div className="">
                                            {item.name}

                                        </div>
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
                            <div className="flex flex-1">

                            </div>
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
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
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
                                <h1 className="text-2xl font-semibold text-gray-900">🌙 Good evening, <span style={{ color: `${workspaceInformation.group.color}` }}>{auth.user.username}</span>! Good to see you.</h1>
                                <h1 className="text-md font-medium text-gray-900">Let's take a look at the Community Insights for <span style={{ color: `${workspaceInformation.group.color}` }}>{workspaceInformation.group.name}</span></h1>
                            </div>
                            <div className="mx-auto max-w-7xl">


                                <div className="mr-6 ml-8 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    <div className="relative w-full text-left  rounded-lg p-6 border border-gray-300">
                                        <p className="text-lg sm:text-base font-semibold">Concurrent Members</p>
                                        <p className="font-normal text-gray-700 text-lg dark:text-dark-content-emphasis mt-1 text-inherit">25,000</p>
                                    </div>
                                    <div className="relative w-full text-left  rounded-lg p-6 border border-gray-300">
                                        <p className="text-lg sm:text-base font-semibold">Members Gained Yesterday</p>
                                        <p className="font-normal text-lg text-gray-700 dark:text-dark-content-emphasis mt-1 text-inherit" >0</p>
                                    </div>

                                    <div className="relative w-full text-left  rounded-lg p-6 border border-gray-300">
                                        <p className="text-lg sm:text-base font-semibold">Members Lost Yesterday</p>
                                        <p className="font-normal text-lg text-gray-700 dark:text-dark-content-emphasis mt-1 text-inherit" >0</p>
                                    </div>



                                </div>

                                <div className="mr-6 ml-8 mt-2 grid grid-cols-1  gap-2">

                                    <div className="relative w-full text-left  rounded-lg p-6 border border-gray-300">
                                        <p className="text-lg sm:text-base font-semibold">Visualise your community</p>
                                        <div className="text-center mt-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-auto h-10 w-10 text-gray-400">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                                            </svg>

                                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                                We're still working on making this feature
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                We are currently making this feature, we will let you know when it's ready for lift off!
                                            </p>

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
        <div className="w-full h-screen mt-10">
            <MoonLoader
                size={32}
                className={"flex mx-auto my-auto"}
                color={"#974dff"}
            />
        </div>
    );
}