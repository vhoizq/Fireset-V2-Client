import { useState, useEffect } from "react";
import { PlusIcon, LinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "@/app/client/auth";
import { Toaster, toast } from "react-hot-toast";
import { Modal } from "../form/Modal";
import axios from "axios";
import Circle from "@uiw/react-color-circle";
import { Input, Select, TextArea } from "../form/TextInput";
import { MoonLoader } from "react-spinners";
import useSWR from "swr"; // Import the useSWR hook
import { CheckBadgeIcon, PaperClipIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { HiDotsVertical } from "react-icons/hi";
import { Logo } from "../content/Logo";
import { NewGroup } from "@/util/db/group";

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
  const [hex, setHex] = useState("#F44E3B");
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
  const [newGroup, setNewGroup] = useState<NewGroup>({});
  const [addModal, setAddModal] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const create = async () => {
    if (!creating) {
      setCreating(true);
      try {
        const newGroupResponse = await fetch(`/api/groups`, {
          method: "POST",
          body: JSON.stringify(newGroup),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const body = await newGroupResponse.json();
        setCreating(false);
        if (newGroupResponse.status === 200) {
          if (Array.isArray(body)) {
            setGroups(body as Group[]);
            toast.success(`${newGroup.name} has been successfully created.`);
            setNewGroup({});
            setAddModal(false);
          } else {
            throw Error(
              "Unexpected error while submitting group, please try again."
            );
          }
        } else {
          throw Error(body.error);
        }
      } catch (error) {
        setCreating(false);
        toast.error(`${error}`);
      }
    }
  };

  useEffect(() => {
    if (!groupsCache.isLoading && groupsCache.data) {
      const tryJson = async () => {
        try {
          const body = await groupsCache.data?.json();
          if (body.groups) {
            setUserGroups(body.groups);
          }
        } catch (error) { }
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
        } catch (error) { }
      };

      tryJson();
    }
  }, [response]);

  return (
    <div className="flex-wrap gap-2 w-full ">
      <h1 className="ml-6 mt-6 truncate text-lg flex items-center font-semibold text-gray-900">
        Welcome to your personalized dashboard,{" "}
        <span className="text-purple-700">&nbsp;{auth.user?.username}</span>!
      </h1>

      <div className="ml-6 flex">
        <div className="items-center text-sm  font-medium text-gray-900">
          Here at your <span className="text-purple-700">workspaces</span>, {auth.user?.username}, you have complete control over all your current workspaces.
        </div>
      </div>

      <hr className="mt-4 mr-[25px] ml-[25px]" />
      {groups.length > 0 ? (
        <div className="mr-6 ml-6 mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {groups.map((g) => (
            <div key={`${g.group.id}`}>
              <a
                className="transition hover:bg-gray-100 duration-500 col-span-1 divide-y divide-gray-200 rounded-lg bg-white border flex"
                href={`/client/dashboard/${g.group.id}`}
              >
                <div className="flex w-full flex-row self-center justify-between">
                  <div className="w-full flex flex-row items-center justify-between p-6">
                    <Logo
                      groupId={`${g.group.groupId}`}
                      onError={() => (
                        <div className="w-13 h-13 rounded-md bg-purple-100 my-auto" />
                      )}
                      className="w-12 h-12 rounded-md my-auto"
                    />
                    <div className="flex-1 ">
                      <div className="items-center">
                        <h3 className="ml-3 truncate text-md flex items-center font-semibold text-gray-900">
                          {g.group.name}
                        </h3>
                        <div className="ml-2">
                          {g.group.verified === true ? (
                            <span className="inline-flex items-center ml-1 rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-600 ring-1 ring-inset ring-purple-500/10">
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

                          {g.group.verified === true ? (
                            <span className="inline-flex items-center ml-1 rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-600 ring-1 ring-inset ring-pink-500/10">
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
                                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                                />
                              </svg>
                              Early Stage
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 text-left"></p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
          <div key={`newWorkspace`}>
            <a
              className="transition hover:bg-gray-100 cursor-pointer duration-500 col-span-1 divide-y h-[100px] divide-gray-200 rounded-lg bg-white border border-dashed flex"
              onClick={() => {
                setAddModal(true);
              }}
            >
              <div className="flex w-full flex-row self-center justify-between">
                <div className="w-full flex flex-row items-center justify-between p-6">
                  <LinkIcon className="h-12 " />
                  <div className="flex-1 ">
                    <div className="items-center">
                      <h3 className="ml-3 truncate text-md flex items-center font-semibold text-gray-900">
                        Create a new <span className="text-purple-700">&nbsp;workspace</span>
                      </h3>
                      <div className="ml-3 flex">
                        <div className="items-center text-xs  font-normal text-gray-900">
                         Create a new <span className="text-purple-700 font-medium">Fireset</span> workspace to secure your group and assets
                        </div>
                      </div>

                    </div>
                    <p className="text-sm text-gray-400 text-left"></p>
                  </div>
                </div>
              </div>
            </a>
          </div>
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
                  vector-effect="non-scaling-stroke"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                We couldn't find any workspaces
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You can get started with{" "}
                <span className="text-purple-700 font-medium">Fireset</span> by
                creating a workspace. It's simple, easy, and{" "}
                <span className="underline font-medium">free</span> to get
                started.
              </p>
              <div className="mt-3">
                <button
                  onClick={() => {
                    setAddModal(true);
                  }}
                  type="button"
                  className="transition duration-300 inline-flex items-center rounded-md border border-transparent bg-purple-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Create new workspace
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {
        <Modal
          isOpen={addModal}
          title={"Create a new workspace"}
          desc={
            "Create your brand new workspace on Fireset today to better secure your group"
          }
          body={
            <>
              <div className="grid grid-cols-2 w-full gap-4">
                <Input
                  label={"Workspace Name"}
                  type={"name"}
                  value={newGroup.name || ""}
                  onChange={(event) => {
                    setNewGroup({
                      ...newGroup,
                      name: event.target.value,
                    });
                  }}
                />

                <Input
                  label={"Roblox Group ID"}
                  type={"groupId"}
                  value={newGroup.groupId?.toString() || ""}
                  onChange={(event) => {
                    setNewGroup({
                      ...newGroup,
                      groupId: Number(event.target.value),
                    });
                  }}
                />

                <div className="">
                  <label className="text-purple-950 text-sm mt-2">
                    Choose a workspace theme
                  </label>
                  <Circle
                    colors={[
                      "#fabebe", // Red

                      "#b1fac5", // Lime
                      "#d4fb86", // Green
                      "#9bf2fd", // Blue
                      "#d5bbff", // Purple
                    ]}
                    color={hex}
                    className="mt-2"
                    onChange={(color) => {
                      setHex(color.hex);
                      setNewGroup({
                        ...newGroup,
                        description: color.hex,
                      });
                    }}
                  />
                </div>
              </div>
            </>
          }
          footer={
            <>
              <button
                type="button"
                className="flex flex-col px-4 py-2 text-sm border-0 ring-0 outline-0 rounded-md bg-purple-500 text-purple-50 hover:bg-purple-600 disabled:bg-purple-800 disabled:cursor-default transition duration-200"
                onClick={create}
                disabled={creating}
              >
                Create Workspace
              </button>
              <button
                type="button"
                className="flex flex-col px-4 py-2 text-sm border-0 rounded-md bg-inherit text-purple-950 hover:bg-purple-200 transition duration-200"
                onClick={() => {
                  setAddModal(false);
                  setNewGroup({});
                }}
              >
                Cancel
              </button>
            </>
          }
          onClose={() => {
            setAddModal(false);
          }}
        />
      }
    </div>
  );
};

export default ClientsList;
