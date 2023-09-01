"use client";

import useSWR from "swr";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { HiX } from "react-icons/hi";
import { useAuth } from "../../../auth";
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
  FlagIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Dialog, Menu, Transition, Combobox } from "@headlessui/react";
import { Avatar } from "@/components/content/Avatar";
import { MoonLoader } from "react-spinners";
import IncidentReports from "@/components/client/IncidentReports";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images-ext-1.discordapp.net/external/Gu7KcuWl1IpFcMHL3q_lpyX_qLpb83D1yP5vtJ4N7c0/https/cdn.discordapp.com/avatars/914289232061800459/1c26d51680f735a589b815f803dc3124.png?width=281&height=281",
};

const people = [
  {
    name: "flux;",
    title: "8/20/2023",
    email: "kat was being rude to me and calling me inappropriate names.",
  },
  {
    name: "Venai Assistant",
    title: "8/21/2023",
    email:
      "User flux; (914289232061800459) was detected being toxic within the community.",
  },
  // More people...
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
  const auth = useAuth();
  const router = useRouter();
  const path = usePathname();

  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [version, setVersion] = useState<number>(0);


  const { data: client, error } = useSWR(
    `/api/clients/info/${path.split("/")[3]}`,
    fetchData
  );


  // Use SWR with the fetched data
  const { data: userPerms, error: ok } = useSWR(
    `/api/clients/perms/${path.split("/")[3]}`,
    fetchPerms
  );

  // Use SWR with the fetched data
  const { data: guildRoles, error: yes } = useSWR(
    `/api/guilds/${path.split("/")[3]}/roles`,
    fetchUserGuilds
  );

  // Use SWR with the fetched data
  const { data: guildChannels, error: okk } = useSWR(
    `/api/guilds/${path.split("/")[3]}/channels`,
    fetchUserChannels
  );

  const [openDelete, setDelete] = useState(false);

  const cancelButtonRef = useRef(null);

  const [state, setState] = useState<boolean>(false);

  async function fetchData() {
    const response = await axios.get(`/api/clients/info/${path.split("/")[3]}`);
    const data = await response;
    return data;
  }

  async function addChannel(args: any) {
    const getDocument = document.getElementById(
      `mod-channel`
    ) as HTMLSelectElement;

    const { data: existingData, error: existingError } = await supabase
      .from("DiscordBots")
      .select("*")
      .eq("id", `${client?.data[0].id}`);

    if (existingError) {
      console.error("Error fetching existing data:", existingError);
      return;
    }

    let newData = existingData.map((bot: any) => ({
      ...bot,
      botModules: bot.botModules.map((module: any) => {
        if (module.name === "Moderation") {
          // Modify this condition as needed
          return {
            ...module,
            modChannel: getDocument.value,
          };
        }
        return module;
      }),
    }));

    // Update the data
    const { data: updatedData, error: updateError } = await supabase
      .from("DiscordBots")
      .upsert(newData);
  }

  async function addRole(args: any) {
    const getDocument = document.getElementById(
      `${args}-roles`
    ) as HTMLSelectElement;

    if (args === "admin") {
      const { data: existingData, error: existingError } = await supabase
        .from("DiscordBots")
        .select("*")
        .eq("id", `${client?.data[0].id}`);

      if (existingError) {
        console.error("Error fetching existing data:", existingError);
        return;
      }

      let newData = existingData.map((bot: any) => ({
        ...bot,
        botModules: bot.botModules.map((module: any) => {
          if (module.name === "Moderation") {
            // Modify this condition as needed
            return {
              ...module,
              adminRoles: [...module.adminRoles, getDocument.value],
            };
          }
          return module;
        }),
      }));

      // Update the data
      const { data: updatedData, error: updateError } = await supabase
        .from("DiscordBots")
        .upsert(newData);
    }

    if (args === "mod") {
      const { data: existingData, error: existingError } = await supabase
        .from("DiscordBots")
        .select("*")
        .eq("id", `${client?.data[0].id}`);

      if (existingError) {
        console.error("Error fetching existing data:", existingError);
        return;
      }

      let newData = existingData.map((bot: any) => ({
        ...bot,
        botModules: bot.botModules.map((module: any) => {
          if (module.name === "Moderation") {
            // Modify this condition as needed
            return {
              ...module,
              modRoles: [...module.modRoles, getDocument.value],
            };
          }
          return module;
        }),
      }));

      // Update the data
      const { data: updatedData, error: updateError } = await supabase
        .from("DiscordBots")
        .upsert(newData);
    }

    if (args === "safe") {
      const { data: existingData, error: existingError } = await supabase
        .from("DiscordBots")
        .select("*")
        .eq("id", `${client?.data[0].id}`);

      if (existingError) {
        console.error("Error fetching existing data:", existingError);
        return;
      }

      let newData = existingData.map((bot: any) => ({
        ...bot,
        botModules: bot.botModules.map((module: any) => {
          if (module.name === "Moderation") {
            // Modify this condition as needed
            return {
              ...module,
              safeRoles: [...module.safeRoles, getDocument.value],
            };
          }
          return module;
        }),
      }));

      // Update the data
      const { data: updatedData, error: updateError } = await supabase
        .from("DiscordBots")
        .upsert(newData);
    }
  }

  async function removeRole(args: any) {
    const selectedRole = "";

    const getDocument = document.getElementById(
      `${args}-roles`
    ) as HTMLSelectElement;

    if (args === "admin") {
      const { data: existingData, error: existingError } = await supabase
        .from("DiscordBots")
        .select("*")
        .eq("id", `${client?.data[0].id}`);

      if (existingError) {
        console.error("Error fetching existing data:", existingError);
        return;
      }

      let newData = existingData.map((bot: any) => ({
        ...bot,
        botModules: bot.botModules.map((module: any) => {
          if (module.name === "Moderation") {
            // Modify this condition as needed
            return {
              ...module,
              adminRoles: [...module.adminRoles, getDocument.value],
            };
          }
          return module;
        }),
      }));

      // Update the data
      const { data: updatedData, error: updateError } = await supabase
        .from("DiscordBots")
        .upsert(newData);
    }

    if (args === "mod") {
      const { data: existingData, error: existingError } = await supabase
        .from("DiscordBots")
        .select("*")
        .eq("id", `${client?.data[0].id}`);

      if (existingError) {
        console.error("Error fetching existing data:", existingError);
        return;
      }

      let newData = existingData.map((bot: any) => ({
        ...bot,
        botModules: bot.botModules.map((module: any) => {
          if (module.name === "Moderation") {
            // Modify this condition as needed
            return {
              ...module,
              modRoles: [...module.modRoles, getDocument.value],
            };
          }
          return module;
        }),
      }));

      // Update the data
      const { data: updatedData, error: updateError } = await supabase
        .from("DiscordBots")
        .upsert(newData);
    }

    if (args === "safe") {
      const { data: existingData, error: existingError } = await supabase
        .from("DiscordBots")
        .select("*")
        .eq("id", `${client?.data[0].id}`);

      if (existingError) {
        console.error("Error fetching existing data:", existingError);
        return;
      }

      let newData = existingData.map((bot: any) => ({
        ...bot,
        botModules: bot.botModules.map((module: any) => {
          if (module.name === "Moderation") {
            // Modify this condition as needed
            return {
              ...module,
              safeRoles:
                args === "safe"
                  ? module.safeRoles.filter(
                      (role: any) => role !== selectedRole
                    )
                  : module.safenRoles,
            };
          }
          return module;
        }),
      }));

      // Update the data
      const { data: updatedData, error: updateError } = await supabase
        .from("DiscordBots")
        .upsert(newData);
    }
  }

  // Use SWR with the fetched data
 
  function truncateText(text: string, maxLength: number): string {
    if (typeof text === "string") {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    } else {
      return "Invalid input";
    }
  }

  const maxLength: number = 9;

  const admins: string[] = client?.data[0].botModules[0].adminRoles || [];

  const truncatedAdmins: string[] = admins.map((admin) =>
    truncateText(admin, maxLength)
  );

  const mods: string[] = client?.data[0].botModules[0].modRoles || [];

  const truncatedMods: string[] = mods.map((mod) =>
    truncateText(mod, maxLength)
  );

  const protectedRls: string[] = client?.data[0].botModules[0].safeRoles || [];

  const truncatedProtected: string[] = protectedRls.map((prtc) =>
    truncateText(prtc, maxLength)
  );

  const cache = useSWR(`/api`, fetch);

  if (client) {
    if (!client.data[0]) {
      return router.replace("/client");
    }
  }

  async function fetchUserGuilds() {
    const response = await axios.get(
      `/api/guilds/${path.split("/")[3]}/roles`,
      {
        headers: {
          Authorization: `Bot ${client?.data[0].botToken}`,
        },
      }
    );
    const data = await response;
    return data;
  }

  async function fetchPerms() {
    const response = await axios.get(
      `/api/clients/perms/${path.split("/")[3]}`
    );
    const data = await response;
    return data;
  }



  async function fetchUserChannels() {
    const response = await axios.get(
      `/api/guilds/${path.split("/")[3]}/channels`,
      {
        headers: {
          Authorization: `Bot ${client?.data[0].botToken}`,
        },
      }
    );
    const data = await response;
    return data;
  }

  

  const navigation = [
    {
      name: "Bot Information",
      href: `/client/dashboard/${client?.data[0].id}`,
      icon: HomeIcon,
      current: false,
      isPaid: false,
    },
    {
      name: "Moderation Suite",
      href: `/client/dashboard/${client?.data[0].id}/moderation`,
      icon: ShieldExclamationIcon,
      current: true,
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

  if (client && userPerms) {
    if (!client.data[0]) {
      return router.replace("/client");
    } else if (!userPerms.data[0]) {
      return router.replace("/client");
    }
  }

  return auth.user && guildRoles?.data && guildChannels?.data ? (
    <main>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <div className="fixed inset-0" />

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                        <div className="h-0 flex-1 overflow-y-auto">
                          <div className="bg-blue-700 py-6 px-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <Dialog.Title className="text-lg font-bold text-white">
                                Add Custom Status
                              </Dialog.Title>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="rounded-md bg-blue-700 text-blue-200 hover:text-white focus:outline-none hover:ring-2 hover:ring-white"
                                  onClick={() => setOpen(false)}
                                >
                                  <span className="sr-only">Close panel</span>
                                  <XCircleIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                            <div className="mt-1">
                              <p className="text-sm text-blue-300">
                                Adding a custom status will change your clients
                                status weather it be <b>Playing</b>,{" "}
                                <b>Watching</b>, or <b>Listening</b>
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                              <div className="space-y-6 pt-6 pb-5">
                                <div>
                                  <label
                                    htmlFor="project-name"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Status Text
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="text"
                                      id="status-text"
                                      placeholder="fireset.xyz"
                                      className="transition duration-200 block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 outline-none sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label
                                    htmlFor="project-name"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Status Type
                                  </label>
                                  <div className="mt-1">
                                    <select
                                      id="status-type"
                                      name="type"
                                      className="transition form-select duration-200 block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset mt-1 ring-gray-300 focus:ring-2 focus:ring-inset outline-none focus:ring-blue-600  sm:text-sm sm:leading-6"
                                    >
                                      <option value="PLAYING" selected>
                                        PLAYING
                                      </option>
                                      <option value="LISTENING">
                                        LISTENING
                                      </option>
                                      <option value="WATCHING">WATCHING</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-shrink-0 justify-end px-4 py-4">
                          <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="cursor-pointer ml-4 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Save Status
                          </button>
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
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
                  <div className="mr-6 ml-6  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
                    <div>
                      <div className="transition  durintation-200 col-span-1 divide-y divide-gray-200 rounded-lg bg-white  border  flex ">
                        <div className="flex w-full flex-row self-center justify-between">
                          <div className="w-full flex flex-row items-center justify-between  p-6">
                            <div className="flex-1 ">
                              <div className="items-center">
                                <h3 className="truncate text-md font-bold text-gray-900 ">
                                  Administrator Permission Roles
                                </h3>
                                <span className=" text-xs font-medium text-gray-600 ">
                                  Anyone who obtains any roles listed here will
                                  be granted administrative permissions.
                                </span>
                                {client?.data[0].botModules[0].adminRoles
                                  .length === 0 ? (
                                  <div className="mt-1">
                                    <span className="text-xs font-medium text-gray-400 ">
                                      You have not yet selected any{" "}
                                      <b>Administrator Roles</b>.
                                    </span>
                                  </div>
                                ) : (
                                  <div className="grid mt-1 grid-cols-3 lg:grid-cols-4 gap-2">
                                    {truncatedAdmins.map((item, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center justify-between rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                                      >
                                        {item}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4 hover:text-red-400 transition-colors duration-200 cursor-pointer"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                          />
                                        </svg>
                                      </span>
                                    ))}
                                  </div>
                                )}

                                <div className="mt-1 flex items-center">
                                  <select
                                    id="admin-roles"
                                    name="type"
                                    className="transition form-select duration-200 block w-full font-medium rounded-md border-0 py-1.5   px-2 text-gray-900 shadow-sm ring-1 ring-inset mt-1 ring-gray-300 focus:ring-2 focus:ring-inset outline-none focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  >
                                    {guildRoles.data
                                      .filter(
                                        (guild: any) =>
                                          guild.name !== "@everyone"
                                      )
                                      .map((guild: any, index: number) => (
                                        <option
                                          key={index}
                                          defaultValue={guild.name}
                                        >
                                          {guild.name}
                                        </option>
                                      ))}
                                  </select>
                                  <button
                                    type="button"
                                    onClick={() => addRole("admin")}
                                    className="cursor-pointer ml-2 flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-xs whitespace-nowrap font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 mt-1 focus:ring-blue-500 focus:ring-offset-2"
                                  >
                                    Add Role
                                  </button>
                                </div>
                              </div>

                              <p className=" text-sm text-gray-400 text-left"></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="transition  durintation-200 col-span-1 divide-y divide-gray-200 rounded-lg bg-white  border  flex ">
                        <div className="flex w-full flex-row self-center justify-between">
                          <div className="w-full flex flex-row items-center justify-between  p-6">
                            <div className="flex-1 ">
                              <div className="items-center">
                                <h3 className="truncate text-md font-bold text-gray-900 ">
                                  Moderator Permission Roles
                                </h3>
                                <span className=" text-xs font-medium text-gray-600 ">
                                  Anyone who obtains any roles listed here will
                                  be granted moderator permissions.
                                </span>

                                {client?.data[0].botModules[0].modRoles
                                  .length === 0 ? (
                                  <div className="mt-1">
                                    <span className="text-xs font-medium text-gray-400 ">
                                      You have not yet selected any{" "}
                                      <b>Moderator Roles</b>.
                                    </span>
                                  </div>
                                ) : (
                                  <div className="grid mt-1 grid-cols-3 lg:grid-cols-4 gap-2">
                                    {truncatedMods.map((item, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center justify-between rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                                      >
                                        {item}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4 hover:text-red-400 transition-colors duration-200 cursor-pointer"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                          />
                                        </svg>
                                      </span>
                                    ))}
                                  </div>
                                )}

                                <div className="mt-1 flex items-center">
                                  <select
                                    id="mod-roles"
                                    name="type"
                                    className="transition form-select duration-200 block w-full  font-medium rounded-md border-0 py-1.5   px-2 text-gray-900 shadow-sm ring-1 ring-inset mt-1 ring-gray-300 focus:ring-2 focus:ring-inset outline-none focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  >
                                    {guildRoles.data
                                      .filter(
                                        (guild: any) =>
                                          guild.name !== "@everyone"
                                      )
                                      .map((guild: any, index: number) => (
                                        <option
                                          key={index}
                                          defaultValue={guild.name}
                                        >
                                          {guild.name}
                                        </option>
                                      ))}
                                  </select>
                                  <button
                                    type="button"
                                    onClick={() => addRole("mod")}
                                    className="cursor-pointer ml-2 flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-xs whitespace-nowrap font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 mt-1 focus:ring-blue-500 focus:ring-offset-2"
                                  >
                                    Add Role
                                  </button>
                                </div>
                              </div>

                              <p className=" text-sm text-gray-400 text-left"></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="transition  durintation-200 col-span-1 divide-y divide-gray-200 rounded-lg bg-white  border  flex ">
                        <div className="flex w-full flex-row self-center justify-between">
                          <div className="w-full flex flex-row items-center justify-between  p-6">
                            <div className="flex-1 ">
                              <div className="items-center">
                                <h3 className="truncate text-md font-bold text-gray-900 ">
                                  Safeguarded Roles
                                </h3>
                                <span className=" text-xs font-medium text-gray-600 ">
                                  Anyone who has a <b>Safeguarded Role</b> will
                                  not be effected by moderation actions.
                                </span>
                                {client?.data[0].botModules[0].safeRoles
                                  .length === 0 ? (
                                  <div className="mt-1">
                                    <span className="text-xs font-medium text-gray-400 ">
                                      You have not yet selected any{" "}
                                      <b>Safeguarded Roles</b>.
                                    </span>
                                  </div>
                                ) : (
                                  <div className="grid mt-1 grid-cols-3 lg:grid-cols-4 gap-2">
                                    {truncatedProtected.map((item, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center justify-between rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                                      >
                                        {item}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4 hover:text-red-400 transition-colors duration-200 cursor-pointer"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                          />
                                        </svg>
                                      </span>
                                    ))}
                                  </div>
                                )}

                                <div className="mt-1 flex items-center">
                                  <select
                                    id="safe-roles"
                                    name="type"
                                    className="transition form-select duration-200 block w-full  font-medium rounded-md border-0 py-1.5   px-2 text-gray-900 shadow-sm ring-1 ring-inset mt-1 ring-gray-300 focus:ring-2 focus:ring-inset outline-none focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  >
                                    {guildRoles.data
                                      .filter(
                                        (guild: any) =>
                                          guild.name !== "@everyone"
                                      )
                                      .map((guild: any, index: number) => (
                                        <option
                                          key={index}
                                          defaultValue={guild.name}
                                        >
                                          {guild.name}
                                        </option>
                                      ))}
                                  </select>
                                  <button
                                    type="button"
                                    onClick={() => addRole("safe")}
                                    className="cursor-pointer ml-2 flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-xs whitespace-nowrap font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 mt-1 focus:ring-blue-500 focus:ring-offset-2"
                                  >
                                    Add Role
                                  </button>
                                </div>
                              </div>

                              <p className=" text-sm text-gray-400 text-left"></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="transition durintation-200 col-span-1 divide-y divide-gray-200 rounded-lg bg-white  border  flex ">
                        <div className="flex w-full flex-row self-center justify-between">
                          <div className="w-full flex flex-row items-center justify-between  p-6">
                            <div className="flex-1 ">
                              <div className="items-center">
                                <h3 className=" truncate text-md font-bold text-gray-900 ">
                                  Moderation Logging Channel
                                </h3>
                                <span className=" text-xs font-medium text-gray-600 ">
                                  Your <b>Moderation Logging Channel</b> will
                                  house all of your moderation case logs.
                                </span>

                                <div className="mt-1 flex items-center">
                                  <select
                                    id="mod-channel"
                                    name="type"
                                    onChange={() => addChannel("admin")}
                                    className="transition form-select duration-200 block w-full  font-medium rounded-md border-0 py-1.5   px-2 text-gray-900 shadow-sm ring-1 ring-inset mt-1 ring-gray-300 focus:ring-2 focus:ring-inset outline-none focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  >
                                    {guildChannels?.data.map(
                                      (guild: any, index: number) => (
                                        <option
                                          key={index}
                                          defaultValue={guild.id}
                                          selected={
                                            guild.id ===
                                            client?.data[0].botModules[0]
                                              .modChannel
                                          }
                                        >
                                          {guild.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                              </div>

                              <p className=" text-sm text-gray-400 text-left"></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="transition durintation-200 mr-6 mt-6 ml-6 col-span-1 divide-y divide-gray-200 rounded-lg bg-white  border  flex ">
                      <div className="flex w-full flex-row self-center justify-between">
                        <div className="w-full flex flex-row items-center justify-between  p-6">
                          <div className=" ">
                            <div className="items-center">
                              <h3 className=" truncate text-md font-bold flex items-center text-gray-900 ">
                                Community Incident Reports{" "}
                                {client?.data[0].botConfigs.isEnterprise ===
                                false ? (
                                  <span className="bg-blue-50 0 ml-2 flex items-center text-blue-500 rounded text-xs py-1 px-2 w-fit font-semibold">
                                    <SparklesIcon
                                      className="mr-1 h-3 w-3 flex-shrink-0 text-blue-500"
                                      aria-hidden="true"
                                    />{" "}
                                    ENTERPRISE
                                  </span>
                                ) : null}
                              </h3>
                              <span className=" text-xs font-medium text-gray-600 ">
                                Community Incidents are fully backed by your
                                community, anyone has the ability to file a case
                                report against anyone within your community whom
                                is not protected or an active Staff Member. You
                                can view and manage all of your Community
                                Incident Reports here, we will automatically
                                sync all punishments to your community within
                                the Discord platform.
                              </span>
                              {client?.data[0].botConfigs.isEnterprise ===
                              false ? (
                                <Image
                                  width={15}
                                  height={15}
                                  src={"/static/NoGroups.svg"}
                                  alt={"no groups"}
                                  className="w-full mt-3 object-fit max-w-[225px] mx-auto"
                                />
                              ) : null}
                            </div>

                            <p className=" text-sm text-gray-400 text-left"></p>
                          </div>
                        </div>
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
    <div className="w-full h-screen">
      <MoonLoader
        size={32}
        className={"flex mx-auto my-auto"}
        color={"#6366f1"}
      />
    </div>
  );
}
