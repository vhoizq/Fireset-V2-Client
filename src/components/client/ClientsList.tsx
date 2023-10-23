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
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                We couldn't find any workspaces
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You are not in any workspaces or you have not created any
                workspaces yet. Get started by creating a new workspace.
              </p>
              <div className="mt-3">
                <a
                  href="/client/workspaces/"
                  className="cursor-pointer inline-flex items-center rounded-md bg-purple-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-pruple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  <PlusIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Create new workspace
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientsList;
