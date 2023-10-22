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

export const ClientsList = () => {
  const auth = useAuth();
  const response = useSWR("/api/groups", fetch);
  const [userGroups, setUserGroups] = useState<
    {
      id: Number;
      name: string;
    }[]
  >([]);
  const groupsCache = useSWR(`/api/proxy/groups/${auth.user?.userId}`, fetch);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    if (!groupsCache.isLoading && groupsCache.data) {
      const tryJson = async () => {
        try {
          const body = await groupsCache.data?.json();
          if (body.groups) {
            setUserGroups(body.groups);
          }
        } catch (error) {}
      };

      tryJson();
    }
  }, [groupsCache, auth]);

  useEffect(() => {
    if (response.data && !response.isLoading) {
      const tryJson = async () => {
        try {
          const body = await response.data?.json();

          if (Array.isArray(body)) {
            setGroups(body as Group[]);
          }
        } catch (error) {}
      };

      tryJson();
    }
  }, [response]);

  return (
    <div className="flex-wrap gap-2 w-full">
      {groups.length > 0 ? (
        <div className="mr-6 ml-6 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {groups.map((g) => (
            <div key={`${g.group.id}`}>
              <a
                className="transition hover:bg-gray-100 durintation-500 col-span-1 divide-y divide-gray-200 rounded-lg bg-white  border  flex "
                href={`/client/dashboard/${g.group.id}`}
              >
                <div className="flex w-full flex-row self-center justify-between">
                  <div className="w-full flex flex-row items-center justify-between  p-6">
                    <Logo
                      groupId={`${g.group.groupId}`}
                      onError={() => (
                        <div className="w-12 h-12 rounded-md bg-indigo-100 my-auto" />
                      )}
                      className="w-12 h-12 rounded-md my-auto"
                    />
                    <div className="flex-1 ">
                      <div className="items-center">
                        <h3 className="ml-3 truncate text-md flex items-center font-semibold text-gray-900 ">
                          {g.group.name}
                        </h3>

                        {g.group.verified === true ? (
                          <span className="inline-flex ml-3 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 mr-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                              />
                            </svg>
                            Verified
                          </span>
                        ) : null}
                      </div>

                      <p className=" text-sm text-gray-400 text-left"></p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-20 max-w-lg">
          {response.isLoading ? ( // Show MoonLoader while loading
            <div className="flex justify-center">
              <MoonLoader size={30} color={"#6366f1"} />
            </div>
          ) : (
            <div className="mx-auto mt-20 max-w-lg">
              <div>
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <h2 className="mt-2 text-base font-medium leading-6 text-gray-900">
                    Create a brand new workspace
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven't created any workspaces yet, we recommend you to
                    go ahead and create a new workspace to get the most out of
                    Fireset.
                  </p>
                  <div className="mt-6">
                    <a
                      href="https://apis.roblox.com/oauth/v1/authorize?client_id=6559552435031738282&redirect_uri=https://fireset.xyz/auth/redirect&scope=openid+profile&response_type=Code&prompts=login+consent&nonce=12345&state=6789"
                      className="transition duration-200 inline-flex rounded-full border border-transparent bg-blue-500 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 hover:to-emerald-800"
                    >
                      Get started for Free
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientsList;
