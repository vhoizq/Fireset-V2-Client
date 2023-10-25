"use client";

import useSWR from "swr";
import { useState, useEffect, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

import { HiX } from "react-icons/hi";
import { useAuth } from "../../auth";
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
    ShieldExclamationIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Avatar } from "@/components/content/Avatar";
import { MoonLoader } from "react-spinners";
import ClientsList from "@/components/client/ClientsList";


const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true, paid: false },
    { name: 'Community Insights', href: '#', icon: GlobeAltIcon, current: false, paid: true },
    { name: 'Security Actions', href: '#', icon: LockClosedIcon, current: false, paid: false },
    { name: 'Audit Logging', href: '#', icon: ClipboardDocumentIcon, current: false, paid: false },
    { name: 'Community Backups', href: '#', icon: CpuChipIcon, current: false, paid: true },
    { name: 'Moderation Suite', href: '#', icon: ShieldExclamationIcon, current: false, paid: false },
    { name: 'Workspace Settings', href: '#', icon: Cog6ToothIcon, current: false, paid: false },

]
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

    const [state, setState] = useState<boolean>(false);
    const cache = useSWR(`/api`, fetch);

    const router = useRouter();
    if (auth!.user?.beta === false) {
        router.replace("/client/thanks");
    }

    if (auth.user?.isActive === false) {
        router.replace("/client/notice");
    }



    return auth.user ? (
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
                                <h1 className="text-2xl font-semibold text-gray-900">Good evening, {auth.user.username}</h1>
                            </div>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                {/* Replace with your content */}
                                <div className="py-4">
                                    <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
                                </div>
                                {/* /End replace */}
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
                color={"#6366f1"}
            />
        </div>
    );
}
