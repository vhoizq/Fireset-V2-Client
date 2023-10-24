"use client";

import useSWR from "swr";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";

import { HiX } from "react-icons/hi";
import { useAuth } from "../auth";
import { Toaster, toast } from "react-hot-toast";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Avatar } from "@/components/content/Avatar";
import { MoonLoader } from "react-spinners";
import { Dialog, Switch } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import {
    BellIcon,
    CreditCardIcon,
    CubeIcon,
    FingerPrintIcon,
    UserCircleIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'


const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
        "https://images-ext-1.discordapp.net/external/Gu7KcuWl1IpFcMHL3q_lpyX_qLpb83D1yP5vtJ4N7c0/https/cdn.discordapp.com/avatars/914289232061800459/1c26d51680f735a589b815f803dc3124.png?width=281&height=281",
};

const userNavigation = [
    { name: "Dashboard", href: "/client" },
    { name: "Settings", href: "/client/settings" },
    { name: "Sign out", href: "/" },
];
const secondaryNavigation = [
    { name: 'General', href: '#', icon: UserCircleIcon, current: true },
    { name: 'Security', href: '#', icon: FingerPrintIcon, current: false },
    { name: 'Notifications', href: '#', icon: BellIcon, current: false },
    { name: 'Plan', href: '#', icon: CubeIcon, current: false },
    { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
    { name: 'Team members', href: '#', icon: UsersIcon, current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function ClientPage() {
    const auth = useAuth();

    const [state, setState] = useState<boolean>(false);
    const cache = useSWR(`/api`, fetch);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)

    const router = useRouter();

    console.log(auth)
    if (auth!.user?.isActive === false) {
        router.replace("/client/notice");
    }

    return auth.user ? (
        <main>
            <Toaster position="bottom-center" reverseOrder={false} />



            <Disclosure as="header" className="bg-white border border-gray-200">
                {({ open }) => (
                    <>
                        <div className="mx-auto  px-2 sm:px-4 lg:divide-gray-200 lg:px-8">
                            <div className="relative flex h-16 justify-between">
                                <div className="relative z-10 flex px-2 lg:px-0">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="block h-8 w-auto"
                                            src="https://media.discordapp.net/attachments/1109372391043375234/1130028056187252767/New_Project_41.png"
                                            alt="Fireset Platform"
                                        />
                                    </div>
                                </div>

                                <div className="relative z-10 flex items-center lg:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-400">
                                        <span className="sr-only">Open menu</span>
                                        {open ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                                />
                                            </svg>
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                                    <button
                                        type="button"
                                        className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                                    >
                                        <span className="sr-only">View notifications</span>
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">
                                                <span className="sr-only">Open user menus</span>
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
                                                                    "block py-2 px-4 text-sm text-gray-700"
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

                        <Disclosure.Panel
                            as="nav"
                            className="lg:hidden"
                            aria-label="Global"
                        >
                            <div className="border-t border-gray-200 pt-4 pb-3">
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        <Avatar
                                            className="w-8 h-8 rounded-full my-auto"
                                            userId={auth.user!.userId}
                                            onError={() => <></>}
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">
                                            {auth.user?.preferredUsername}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500">
                                            {auth.user?.email}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                                    >
                                        <span className="sr-only">View notifications</span>
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <div className="mx-auto max-w-7xl  lg:flex lg:gap-x-16 lg:px-8">
                <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
                    <nav className="flex-none px-4 sm:px-6 lg:px-0">
                        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                            {secondaryNavigation.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-medium'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                'h-6 w-6 shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main className="px-4  sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
                    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <div>
                            <h2 className="text-base font-medium leading-7 text-gray-900">Profile</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                This information will be displayed publicly so be careful what you share.
                            </p>

                            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                <div className="pt-6 sm:flex">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Account Username</dt>
                                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div className="text-gray-900">{auth.user.username}</div>

                                    </dd>
                                </div>
                                <div className="pt-6 sm:flex">
                                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Account Identifier</dt>
                                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                        <div className="text-gray-900">{auth.user.userId}</div>

                                    </dd>
                                </div>


                            </dl>
                        </div>




                    </div>
                </main>
            </div>

        </main>
    ) : (
        <div className="w-full h-screen">
            <MoonLoader
                size={32}
                className={"flex mx-auto my-auto"}
                color={"#6366f1"}
            />
        </div>
    );
}
