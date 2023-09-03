"use client";

import useSWR from "swr";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

import { HiX } from "react-icons/hi";
import { useAuth } from "../auth";
import { Toaster, toast } from "react-hot-toast";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Avatar } from "@/components/content/Avatar";
import { MoonLoader } from "react-spinners";
import ClientsList from "@/components/client/ClientsList";
import { CheckIcon } from "@heroicons/react/24/outline";

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

const steps = [
  { id: "01", name: "Bot Information", href: "#", status: "current" },
  { id: "02", name: "Configuration", href: "#", status: "upcoming" },
  { id: "03", name: "Review & Create", href: "#", status: "upcoming" },
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

  const [state, setState] = useState<boolean>(false);
  const cache = useSWR(`/api`, fetch);

  const router = useRouter();
  if (auth!.user?.isBeta === false) {
    router.replace("/client/thanks");
  }

  if (auth!.user?.isActive === false) {
    router.replace("/client/notice");
  }

  const [step, setStep] = useState(1);
  const [groupId, setGroupId] = useState("");
  const [selectedGroupRole, setSelectedGroupRole] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState("user/local");
  const [selectedTheme, setSelectedTheme] = useState("green");

  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [guild, setGuild] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
    setErrorMessage("");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setErrorMessage("");
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
    setErrorMessage("");
  };

  const handleGuildChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGuild(event.target.value);
    setErrorMessage("");
  };

  const handleContinueStep01 = () => {
    // Handle continue for step 1 logic here

    const config = {
      headers: {
        authorization: "Bearer 6j$*@1PwD!2cRx0(56qZf+&^7h8Bm9L-T",
      },
      params: {
        botToken: token,
      },
    };

    async function validateProgram() {
      if (token.trim() === "" || name.trim() === "") {
        toast.error("You must complete all required fields.");
        return;
      }

      console.log("eee");


      axios
        .get(`https://checkerforfireset.seryroblox.repl.co`, config)
        .then((response: any) => {
          if (!response.data) {

           return toast.error(response.code);
          }

          if (response.data === "Success") {
            steps[0].status = "complete";
            steps[1].status = "current";
            setStep(2);

            toast.success("Successfully validated login");
          } else {

            toast.error(response.data);
          }
        })
        .catch((error: any) => {

          toast.error(error);
        });
    }

    validateProgram();
  };

  const handleContinueStep02 = () => {
    steps[1].status = "complete";
    steps[2].status = "current";

    setStep(3);
  };

  const handleCreateWorkspace = () => {
    toast.loading("We are creating your Discord Client...");

    const data = {
      clientToken: `${token}`,
      clientUsername: `${name}`,
      clientColor: `${color}`,
      syncedGuild: `${guild}`,
    };

    async function createNewClient() {
      try {
        const newGroupResponse = await fetch(`/api/clients/create`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const body = await newGroupResponse.json();

        console.log(newGroupResponse);

        if (newGroupResponse.status === 200) {
          if (body.success) {
            toast.dismiss();
            router.replace("/");
          } else {
            throw Error(
              "Unexpected error while removing status, please try again."
            );
          }
        } else {
          throw Error(body.error);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
    createNewClient();
  };

  return auth.user ? (
    <main>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Disclosure as="header" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
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
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
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
                    className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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
                              <Link
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block py-2 px-4 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </Link>
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
                      sessionToken={auth.user!.sessionToken}
                      onError={() => <></>}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {auth.user?.username}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

      <div className="mt-14 mr-6 ml-6">
        <nav aria-label="Progress">
          <ol
            role="list"
            className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
          >
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="relative md:flex md:flex-1">
                {step.status === "complete" ? (
                  <div className="group flex w-full items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 group-hover:bg-blue-600">
                        <CheckIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-900">
                        {step.name}
                      </span>
                    </span>
                  </div>
                ) : step.status === "current" ? (
                  <div
                    className="flex items-center px-6 py-4 text-sm font-medium"
                    aria-current="step"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-500">
                      <span className="text-blue-500">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-blue-500">
                      {step.name}
                    </span>
                  </div>
                ) : (
                  <div className="group flex items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 ">
                        <span className="text-gray-500 ">{step.id}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-500 ">
                        {step.name}
                      </span>
                    </span>
                  </div>
                )}

                {stepIdx !== steps.length - 1 ? (
                  <>
                    {/* Arrow separator for lg screens and up */}
                    <div
                      className="absolute top-0 right-0 hidden h-full w-5 md:block"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>

        <div className="md:grid mt-3  md:gap-6  sm:rounded-lg rounded-lg">
          {step === 1 && (
            <div id="step1">
              <div className=" w-full shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6  bg-gray-50 px-4 py-5 sm:p-6">
                  <div>
                    <p className="block text-lg font-bold mb-3 text-left text-gray-700">
                      We need a bit of Information
                    </p>
                    <label
                      id="groupid-label"
                      htmlFor="groupid-1"
                      className="block text-sm font-medium text-left text-gray-700"
                    >
                      Discord Bot Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="bot-name"
                        id="bot-name"
                        onChange={handleNameChange}
                        placeholder="James from Fireset"
                        className="transition duration-200 block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none sm:text-sm sm:leading-6"
                      />
                    </div>
                    <label
                      id="groupid-label"
                      htmlFor="groupid-1"
                      className="block text-sm font-medium mt-3 text-left text-gray-700"
                    >
                      Discord Bot Token
                    </label>
                    <div className="">
                      <input
                        type="password"
                        onChange={handleTokenChange}
                        placeholder="••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"
                        name="bot-token"
                        id="bot-token"
                        className="mt-1 transition duration-200 block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 outline-none focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div
                      id="continue-groupid"
                      className="px-4 py-3 text-right sm:px-6"
                    >
                      <button
                        onClick={handleContinueStep01}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Continue Creation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div id="step2">
              <div className=" w-full shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6  bg-gray-50 px-4 py-5 sm:p-6">
                  <div>
                    <p className="block text-lg font-bold mb-3 text-left text-gray-700">
                      Configure your Discord Bot
                    </p>
                    <label
                      id="groupid-label"
                      htmlFor="groupid-1"
                      className="block text-sm font-medium text-left text-gray-700"
                    >
                      Choose a color theme for your bot
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="bot-name"
                        id="bot-name"
                        onChange={handleColorChange}
                        placeholder="#c02d2d"
                        className="transition duration-200 py-2 block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none sm:text-sm sm:leading-6"
                      />
                    </div>
                    <label
                      id="groupid-label"
                      htmlFor="groupid-1"
                      className="block text-sm font-medium mt-3 text-left text-gray-700"
                    >
                      Where will you utilize this Discord Bot?
                    </label>
                    <div className="">
                      <select
                        id="country"
                        name="country"
                        onChange={handleGuildChange}
                        className="block w-full rounded-md  py-2.5 px-1.5 border-0  text-gray-900 shadow-sm ring-1 ring-inset mt-1 ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-500  sm:text-sm sm:leading-6"
                      >
                        {userGuilds
                          .filter((guild: any) =>
                            hasManageGuildPermission(guild.permissions)
                          )
                          .map((guild: any) => (
                            <option key={guild.id} value={guild.id}>
                              {guild.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div
                      id="continue-groupid"
                      className="px-4 py-3 text-right sm:px-6"
                    >
                      <button
                        onClick={handleContinueStep02}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Continue Creation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div id="step3">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div id="create-buttons">
                  <div className="mr-6 ml-6 mb-3 mt-3  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
                    <div>
                      <div className="transition  durintation-200 col-span-1 divide-y divide-gray-200 rounded-lg bg-white  border  flex ">
                        <div className="flex w-full flex-row self-center justify-between">
                          <div className="w-full flex flex-row items-center justify-between  p-6">
                            <div className="flex-1 ">
                              <div className="items-center">
                                <h3
                                  className="truncate text-md font-bold text-gray-700 "
                                  id="usernameFinal"
                                >
                                  {name}
                                </h3>
                                <span className=" text-xs font-medium text-gray-400 ">
                                  Client Identifier
                                </span>
                              </div>

                              <p className=" text-sm text-gray-400 text-left"></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="transition   durintation-200 col-span-1 divide-y divide-gray-200 rounded-lg bg-white  border  flex ">
                        <div className="flex w-full flex-row self-center justify-between">
                          <div className="w-full flex flex-row items-center justify-between  p-6">
                            <div className="flex-1 ">
                              <div className="items-center">
                                <h3
                                  className="truncate text-md font-bold text-gray-700 "
                                  id="guildFinal"
                                >
                                  {guild}
                                </h3>
                                <span className=" text-xs font-medium text-gray-400 ">
                                  Synced Community ID
                                </span>
                              </div>

                              <p className=" text-sm text-gray-400 text-left"></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="transition mr-6 ml-6 mb-3 durintation-200 col-span-1 divide-y divide-gray-200 rounded-lg bg-white  border  flex ">
                      <div className="flex w-full flex-row self-center justify-between">
                        <div className="w-full flex flex-row items-center justify-between  p-6">
                          <div className="flex-1 ">
                            <div className="items-center">
                              <h3
                                className="truncate text-md font-bold text-gray-700"
                                id="colorFinal"
                              >
                                {color}
                              </h3>
                              <span className=" text-xs font-medium text-gray-400 ">
                                Color Scheme
                              </span>
                            </div>

                            <p className=" text-sm text-gray-400 text-left"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    id="create-workspace"
                    className="bg-gray-50 px-2 py-3 text-right"
                  >
                    <button
                      onClick={handleCreateWorkspace}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                      Create Discord Client →
                    </button>
                    {/* ... */}
                  </div>
                </div>
              </div>
            </div>
          )}
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
