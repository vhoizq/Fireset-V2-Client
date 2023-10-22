"use client";

import useSWR from "swr";
import { usePathname } from "next/navigation";
import { useState, Fragment, useEffect } from "react";
import { Dialog, Menu, Transition, Combobox } from "@headlessui/react";

import { useAuth } from "../../auth";

import { GroupDetails, GroupMessageDetails } from "@/util/db/group";
import { User } from "@/util/db/schemas/schema";

import { toast } from "react-hot-toast";

import { HiChatAlt, HiDotsVertical, HiTrash } from "react-icons/hi";
import { MoonLoader } from "react-spinners";
import { Logo } from "@/components/content/Logo";

import { useGroup } from "../group";
import {
  Bars2Icon,
  CalendarIcon,
  ChartBarIcon,
  CreditCardIcon,
  HomeIcon,
  MapPinIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar } from "@/components/content/Avatar";
import { GroupHeader } from "@/components/client/GroupHeader";

const userNavigation = [
  { name: "Dashboard", href: "/client" },
  { name: "Settings", href: "/client/settings" },
  { name: "Sign out", href: "/" },
];

export default function GroupPage() {
  const auth = useAuth();

  const [load, setLoad] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [messages, setMessages] = useState<GroupMessageDetails[]>([]);

  const [version, setVersion] = useState<number>(0);

  const group = useGroup();
  const path = usePathname();

  const response = useSWR(`/api/groups/${path.split("/")[3]}`, fetch);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    if (!response.isLoading && response.data) {
      const tryJson = async () => {
        try {
          const body = await response.data?.json();

          if (body.group && group.setGroup) {
            group.setGroup(body.group as GroupDetails);
          }

          if (body.user && group.setUser) {
            group.setUser(body.user);
          }
        } catch (error) {}
      };

      tryJson();
    } else if (response.error) {
      toast.error("Error loading group data");
    }
  }, [response]);

  const navigation = [
    {
      name: "Workspace Feed",
      href: `/client/dashboard/${group.group?.id}`,
      icon: HomeIcon,
      current: true,
      isPaid: false,
    },
    {
      name: "Workspace Overview",
      href: `/client/dashboard/${group.group?.id}/overview`,
      icon: ChartBarIcon,
      current: false,
      isPaid: false,
    },
    {
      name: "Session Scheduler",
      href: `/client/dashboard/${group.group?.id}/sessions`,
      icon: MapPinIcon,
      current: false,
      isPaid: false,
    },
    {
      name: "Employee Manager",
      href: `/client/dashboard/${group.group?.id}/staff`,
      icon: UserGroupIcon,
      current: false,
      isPaid: false,
    },
    {
      name: "Employee Vacations",
      href: `/client/dashboard/${group.group?.id}/vacations`,
      icon: CalendarIcon,
      current: false,
      isPaid: false,
    },
  ];

  return group.group ? (
    <main>
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
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white shadow pt-5 pb-4">
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
                      src="https://media.discordapp.net/attachments/1109372391043375234/1130028056187252767/New_Project_41.png"
                      alt="Fireset"
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
                              : "transition duration-200 text-gray-900 hover:bg-gray-100",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className="mr-4 h-6 w-6 flex-shrink-0 text-gray-900"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <a
                    key="Billing"
                    href="billig"
                    className="text-gray-900  hover:bg-gray-100 mr-2 mb-3 ml-2 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  >
                    <CreditCardIcon
                      className="mr-3 h-6 w-6 flex-shrink-0 text-gray-900"
                      aria-hidden="true"
                    />
                    Billing Settings
                  </a>
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
          <div className="flex flex-grow flex-col overflow-y-auto bg-white border border-r-gray-100 shadow-lg pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src="https://media.discordapp.net/attachments/1109372391043375234/1130028056187252767/New_Project_41.png"
                alt="Fireset"
              />
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "transition duration-200 text-gray-900 hover:bg-gray-100",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className="mr-3 h-6 w-6 flex-shrink-0 text-gray-900"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <a
              key="Billing"
              href="billig"
              className="text-gray-900  hover:bg-gray-100 mr-2 mb-3 ml-2 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <CreditCardIcon
                className="mr-3 h-6 w-6 flex-shrink-0 text-gray-900"
                aria-hidden="true"
              />
              Billing Settings
            </a>
            <div className="flex flex-shrink-0 border-t border-gray-100 p-4">
              <div className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <div>
                    <Logo
                      groupId={`${group.group.groupId}`}
                      onError={() => (
                        <div className="w-12 h-12  bg-indigo-100 my-auto" />
                      )}
                      className="inline-block h-9 w-9 rounded-md"
                    />
                  </div>
                  <div className="ml-2">
                    <p className="text-xs  font-medium text-gray-800">
                      {group.group.name}
                    </p>
                    <p className="text-xs font-normal text-gray-400 ">
                      {group.group.groupId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1"></div>
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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
          <div className="ml-6 mr-6 mt-5">
            <GroupHeader group={group.group} groupOwner="Fluxtev" />
          </div>
        </div>
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
