"use client";

import useSWR from "swr";
import { useState, useEffect, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

import { HiX } from "react-icons/hi";
import { useAuth } from "../auth";
import { Toaster, toast } from "react-hot-toast";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Avatar } from "@/components/content/Avatar";
import { MoonLoader } from "react-spinners";
import ClientsList from "@/components/client/ClientsList";


const navigation = [
  { name: "Custom Discord Bots", href: "/client/bots", current: true },
  { name: "Member Counters", href: "/client/counters", current: false },
];
const userNavigation = [
  { name: "Sign out", href: "/" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ClientPage() {
  const auth = useAuth();

  const fetchUserGuilds = async (accessToken: any) => {
    const response = await axios.get(
      "https://discord.com/api/v10/users/@me/guilds",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  };

  const { data: userGuilds, error: userGuildsError } = useSWR(
    () => auth.user?.sessionToken,
    fetchUserGuilds
  );

  const hasManageGuildPermission = (permissions: any) => {
    const numericPermissions = parseInt(permissions, 10);
    const MANAGE_GUILD = 0x00000020; // Replace with the numeric value of MANAGE_GUILD permission

    return (numericPermissions & MANAGE_GUILD) === MANAGE_GUILD;
  };



  const path = usePathname();

  const [state, setState] = useState<boolean>(false);
  const cache = useSWR(`/api`, fetch);

  const router = useRouter();
  if (auth.user?.isActive === true) {
    router.replace("/client");
  }

  

  return auth.user ? (
    <main>

      <Toaster position="bottom-center" reverseOrder={false} />

      <Disclosure as="header" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto  px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
              <div className="relative flex h-16 justify-between">
                <div className="relative z-10 flex px-2 lg:px-0">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto"
                      src="https://media.discordapp.net/attachments/1109372391043375234/1130028056187252767/New_Project_41.png"
                      alt="Fireshit Platform"
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
                          userId="1"

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
                      userId="1"
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


      <div className="w-full h-screen mt-10">
        <MoonLoader
          size={32}
          className={"flex mx-auto my-auto"}
          color={"#974dff"}
        />
      </div>

      <div className="mt-20"></div>
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
