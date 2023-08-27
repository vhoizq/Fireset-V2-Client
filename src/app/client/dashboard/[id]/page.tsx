"use client";

import useSWR from "swr";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";

import { HiX } from "react-icons/hi";
import { useAuth } from "../../auth";
import {
  BriefcaseIcon,
  BellIcon,
  XCircleIcon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  InboxIcon,
  ChartBarIcon,
  PuzzlePieceIcon,
  CurrencyDollarIcon,
  TicketIcon,
  GiftIcon,
  CodeBracketIcon,
  ShieldExclamationIcon,
  PaperClipIcon,
  ExclamationCircleIcon,
  CreditCardIcon,
  LinkIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  SpeakerWaveIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Avatar } from "@/components/content/Avatar";
import { MoonLoader } from "react-spinners";
import ClientStatuses from "@/components/client/ClientStatuses";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images-ext-1.discordapp.net/external/Gu7KcuWl1IpFcMHL3q_lpyX_qLpb83D1yP5vtJ4N7c0/https/cdn.discordapp.com/avatars/914289232061800459/1c26d51680f735a589b815f803dc3124.png?width=281&height=281",
};

const userNavigation = [
  { name: "Dashboard", href: "/client" },
  { name: "Settings", href: "/client/settings" },
  { name: "Sign out", href: "/api/auth/logout" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ClientPage() {
  const auth = useAuth();
  const router = useRouter();
  const path = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [version, setVersion] = useState<number>(0);

  const [openDelete, setDelete] = useState(false);

  const cancelButtonRef = useRef(null);

  const [state, setState] = useState<boolean>(false);

  async function fetchData() {
    const response = await axios.get(`/api/clients/info/${path.split("/")[3]}`);
    const data = await response;
    return data;
  }

  // Use SWR with the fetched data
  const { data: client, error } = useSWR(
    `/api/clients/info/${path.split("/")[3]}`,
    fetchData
  );

  async function fetchPerms() {
    const response = await axios.get(
      `/api/clients/perms/${path.split("/")[3]}`
    );
    const data = await response;
    return data;
  }

  // Use SWR with the fetched data
  const { data: userPerms, error: ok } = useSWR(
    `/api/clients/perms/${path.split("/")[3]}`,
    fetchPerms
  );

  const cache = useSWR(`/api`, fetch);

  

  if (client && userPerms) {
    if (!client.data[0]) {
      return router.replace("/client");
    } else if (!userPerms.data[0] && auth.user?.isStaff !== true) {
      return router.replace("/client");
    }
  }

  async function restartClient() {
    toast.success(`Successfully restarte Discord Client`);
  }

  async function confirmDelete() {
    setDelete(false);
    toast.loading(`We are deleting your Discord Client`);
    const response = await axios.get(
      `/api/clients/delete/${path.split("/")[3]}`
    );
    const data = await response;
    if (data.status === 200) {
      toast.dismiss;
      toast.success(`Successfully deleted your Discord Client`);
      return router.replace("/client");
    }
  }

  const navigation = [
    {
      name: "Bot Information",
      href: `/client/dashboard/${client?.data[0].id}`,
      icon: HomeIcon,
      current: true,
      isPaid: false,
    },
    {
      name: "Moderation Suite",
      href: `/client/dashboard/${client?.data[0].id}/moderation`,
      icon: ShieldExclamationIcon,
      current: false,
      isPaid: false,
    },
    {
      name: "Roblox Integration",
      href: `/client/dashboard/${client?.data[0].id}/roblox`,
      icon: CodeBracketIcon,
      current: false,
      isPaid: false,
    },
    {
      name: "Member Welcomer",
      href: `/client/dashboard/${client?.data[0].id}/welcomer`,
      icon: UserIcon,
      current: false,
      isPaid: false,
    },
    {
      name: "Giveaways",
      href: `/client/dashboard/${client?.data[0].id}/giveaways`,
      icon: GiftIcon,
      current: false,
      isPaid: false,
    },
    {
      name: "Support Tickets",
      href: `/client/dashboard/${client?.data[0].id}/support`,
      icon: TicketIcon,
      current: false,
      isPaid: true,
    },
    {
      name: "Economony",
      href: `/client/dashboard/${client?.data[0].id}/economony`,
      icon: CurrencyDollarIcon,
      current: false,
      isPaid: false,
    },
    {
      name: "Games",
      href: `/client/dashboard/${client?.data[0].id}/games`,
      icon: PuzzlePieceIcon,
      current: false,
      isPaid: false,
    },
  ];

  return auth.user ? (
    <main>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div>
        <Transition.Root show={openDelete} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setDelete}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0  sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Delete Discord Client
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete{" "}
                              {client?.data[0].botName}? All of the data will be
                              permanently removed. This action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={confirmDelete}
                      >
                        Delete Client
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setDelete(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

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

                          {item.isPaid &&
                          client?.data[0].botConfigs.isEnterprise === false ? (
                            <span className="bg-blue-50 0 ml-3 flex items-center text-blue-500 rounded text-xs py-1 px-2 w-fit font-semibold">
                              <SparklesIcon
                                className="mr-1 h-3 w-3 flex-shrink-0 text-blue-500"
                                aria-hidden="true"
                              />{" "}
                              ENTERPRISE
                            </span>
                          ) : null}
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
                    {item.isPaid &&
                    client?.data[0].botConfigs.isEnterprise === false ? (
                      <span className="bg-blue-50 0 ml-3 flex items-center text-blue-500 rounded text-xs py-1 px-2 w-fit font-semibold">
                        <SparklesIcon
                          className="mr-1 h-3 w-3 flex-shrink-0 text-blue-500"
                          aria-hidden="true"
                        />{" "}
                        ENTERPRISE
                      </span>
                    ) : null}
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
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={`https://cdn.discordapp.com/avatars/${client?.data[0].clientInfo.clientId}/${client?.data[0].clientInfo.botAvatar}.png`}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">
                      {client?.data[0].botName}
                    </p>
                    <p className="text-xs font-medium text-gray-400 ">
                      {client?.data[0].clientInfo.clientId}
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
                        sessionToken={auth.user!.sessionToken}
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

          <main>
            <div className="">
              <div className="py-4">
                <div className="overflow-hidden bg-white  sm:rounded-lg">
                  {client?.data[0].botConfigs.isEnterprise === false ? (
                    <div className="mr-3 ml-3 rounded-md bg-blue-50  p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <ExclamationTriangleIcon
                            className="h-5 w-5 text-blue-400"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-700">
                            You are on our Basic Subscription
                          </h3>
                          <div className="mt-2 text-sm text-blue-600">
                            <p>
                              You are currently utilizing our Basic Subscription
                              which grants you access to simple features such as
                              our Moderation Suite, Giveaways, Games, and Roblox
                              Integration. You can upgrade today by going to
                              your Billing Settings.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {!userPerms?.data[0] && auth.user?.isStaff === true ? (
                    <div className="mr-3 ml-3 mt-1 rounded-md bg-red-50  p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <ShieldExclamationIcon
                            className="h-5 w-5 text-red-400"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-700">
                            You do not have access to this Dashboard
                          </h3>
                          <div className="mt-2 text-sm text-red-600">
                            <p>
                              You are currently viewing a Client Dashboard that
                              you do not have access to as a normal user, you
                              are only to be accessing this dashboard for
                              troubleshooting purposes. If you are seeing this
                              message in error, contact one of your Leadership
                              members.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className=" px-4  sm:px-6 mt-5 w-full">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Client Username
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {client?.data[0].botName}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Client ID
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {client?.data[0].clientInfo.clientId}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Synced Community ID
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {client?.data[0].botConfigs.guildId}
                        </dd>
                      </div>

                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Management Actions
                        </dt>
                        <div className="inline-flex">
                          {userPerms?.data[0] ? (
                            <div className="flex">
                              <button
                                onClick={() => setDelete(true)}
                                type="submit"
                                className="transition duration-200 mt-1 flex w-auto justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                              >
                                Delete Discord Client
                              </button>
                              <button
                                onClick={restartClient}
                                type="submit"
                                className="transition duration-200 mt-1 flex ml-2 w-auto justify-center rounded-md bg-blue-500 0 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                              >
                                Restart Discord Client
                              </button>
                            </div>
                          ) : (
                            <div>
                              <span className=" text-xs font-medium text-gray-600 ">
                                Since you are a Staff Member who does not have
                                full access to this Dashboard, you are unable to
                                utilize these features. Contact someone within
                                Leadership if you believe this is an issue.
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </dl>
                  </div>

                  <ClientStatuses client={client?.data[0]} />
                </div>
              </div>
            </div>
          </main>
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
