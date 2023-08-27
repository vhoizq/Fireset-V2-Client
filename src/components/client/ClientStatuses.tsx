import React, { useState, Fragment } from "react";
import { PlusIcon, LinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
const randomUUID: string = uuidv4();
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import useSWR from "swr"; // Import the useSWR hook

interface Client {
  botName: String;
  id: String;
  botStatuses: [];
  clientInfo: { clientId: String; botAvatar: String };
}

const fetchClients = async () => {
  try {
    const response = await axios.get(`/`);
    const body = response.data;
    if (Array.isArray(body)) {
      return body as Client[];
    }
  } catch (error) {
    throw error;
  }
};

export const ClientsList = (props: { client: any }) => {
  const [open, setOpen] = useState(false);

  const {
    data: clients,
    error,
    isValidating,
  } = useSWR(`/api/clients/info/${props.client}`, fetchClients);

  if (error) {
    return (
      <div className="mt-20">
        <div className="mt-20 text-center">
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            We failed to load your Discord Bots
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            We encountered an error while loading your Discord Bots.
          </p>
        </div>
      </div>
    );
  }

  if (isValidating) {
    return (
      <div className="mt-20">
        <center>
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </center>
      </div>
    );
  }

  const create = async () => {
    toast.loading("We are processing your request...");
    const statusType = document.getElementById(
      "status-type"
    ) as HTMLInputElement;
    const statusText = document.getElementById(
      "status-text"
    ) as HTMLInputElement;

    const data = {
      statusType: `${statusType.value}`,
      statusText: `${statusText.value}`,
      statusId: `${randomUUID}`,
    };

    console.log(statusType.value);

    try {
      const newGroupResponse = await fetch(
        `/api/clients/status/${props.client.id}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const body = await newGroupResponse.json();

      console.log(body);

      if (newGroupResponse.status === 200) {
        setOpen(false);
        if (body.success) {
          toast.dismiss();
          toast.success(
            `Successfully added status to ${props.client.botName}.`
          );

          setOpen(false);
        } else {
          throw Error(
            "Unexpected error while submitting status, please try again."
          );
        }
      } else {
        setOpen(false);
        throw Error(body.error);
      }
    } catch (error) {
      setOpen(false);
      toast.error((error as Error).message);
    }
  };

  async function remove(args: any) {
    console.log(args);

    toast.loading("We are processing your request...");

    const data = {
      statusId: `${args}`,
    };

    try {
      const newGroupResponse = await fetch(
        `/api/clients/status/remove/${props.client.id}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const body = await newGroupResponse.json();

      if (newGroupResponse.status === 200) {
        setOpen(false);
        if (body.success) {
          toast.dismiss();
          toast.success(
            `Successfully removed status from ${props.client.botName}.`
          );
          setOpen(false);
        } else {
          throw Error(
            "Unexpected error while removing status, please try again."
          );
        }
      } else {
        setOpen(false);
        throw Error(body.error);
      }
    } catch (error) {
      setOpen(false);
      toast.error((error as Error).message);
    }
  }

  return (
    <div className="ml-6 mt-3 mr-6 flex-wrap gap-2 w-full">
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
             
                                    className="transition form-select duration-200   block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset mt-1 ring-gray-300 focus:ring-2 focus:ring-inset outline-none focus:ring-blue-600  sm:text-sm sm:leading-6"
                                  >
                                    <option value="PLAYING" selected>
                                      PLAYING
                                    </option>
                                    <option value="LISTENING">LISTENING</option>
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
                          onClick={create}
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

      <div className=" ">
        <dt className="text-sm font-medium text-gray-500">Custom Statuses</dt>

        {props.client && props.client.botStatuses?.length >= 1 ? (
          <div>
            <ul
              role="list"
              className="divide-y  mt-1 divide-gray-200 rounded-md border border-gray-200 mr-10"
            >
              {props.client.botStatuses.map((b: any) => (
                <li
                  className="flex items-center justify-between  py-3 pl-3 pr-4 text-sm w-full"
                  key={b.id}
                >
                  <div className="flex w-0 flex-1 items-center">
                    <span className="ml-2 w-0 flex-1 truncate font-medium text-xs text-gray-400">
                      {b.statusType === "LISTENING" ? (
                        <>
                          LISTENING to{" "}
                          <span className="text-gray-600 text-sm">
                            {b.statusText}
                          </span>
                        </>
                      ) : (
                        <>
                          {b.statusType}{" "}
                          <span className="text-gray-600 text-sm">
                            {b.statusText}
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      onClick={() => remove(`${b.statusId}`)}
                      className="cursor-pointer font-medium text-blue-500 hover:text-blue-600"
                    >
                      Remove
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="submit"
              onClick={() => setOpen(true)}
              className="transition duration-200 mt-2 flex  w-auto justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Add Custom Status
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="mt-2 text-md font-medium text-gray-700">
              You have not set any custom statuses
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You can have a custom status display on your Discord Client for
              free.
            </p>
            <div className="mt-4">
              <button
                type="submit"
                onClick={() => setOpen(true)}
                className="transition duration-200   w-auto justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Add Custom Status
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsList;
