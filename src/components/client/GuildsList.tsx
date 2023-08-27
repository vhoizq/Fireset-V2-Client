import React from "react";
import { PlusIcon, LinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import useSWR from "swr"; // Import the useSWR hook
import { SparklesIcon } from "@heroicons/react/24/outline";

interface Client {
  botName: String;
  id: String;
  botConfigs: {
    guildId: String;
    isEnterprise: Boolean;
    colorScheme: String;
    stripeId: String;
    errMessage: String;
  };
  clientInfo: { clientId: String; botAvatar: String };
}

const fetchClients = async () => {
  try {
    const response = await axios.get("/api/clients");
    const body = response.data;
    if (Array.isArray(body)) {
      return body as Client[];
    }
  } catch (error) {
    throw error;
  }
};

export const ClientsList = (props: { auth: any }) => {
  const {
    data: clients,
    error,
    isValidating,
  } = useSWR("/api/clients", fetchClients);


 


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
    () => props.auth?.sessionToken,
    fetchUserGuilds
  );

  console.log(userGuilds)



  const hasManageGuildPermission = (permissions: any) => {
    const numericPermissions = parseInt(permissions, 10);
    const MANAGE_GUILD = 0x00000020; // Replace with the numeric value of MANAGE_GUILD permission

    return (numericPermissions & MANAGE_GUILD) === MANAGE_GUILD;
  };

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

  return (
    <div className="flex-wrap gap-2 w-full">
      <div className="mr-6 ml-6 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {userGuilds
          .filter((guild: any) => hasManageGuildPermission(guild.permissions))
          .map((guild: any) => (
            <div key={`${guild.id}`}>
              <a
                className="transition hover:bg-gray-100 durintation-200 col-span-1 divide-y divide-gray-200 rounded-lg bg-white  border  flex "
                href={`/client/manage/${guild.id}`}
              >
                <div className="flex w-full flex-row self-center justify-between">
                  <div className="w-full flex flex-row items-center justify-between  p-6">
                    <img
                      className="h-12 w-12 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: `#000000` }}
                      src={`https://cdn.discordapp.com/avatars//.png`}
                      alt=""
                    />
                    <div className="flex-1 ">
                      <div className="items-center">
                        <h3 className="ml-3 truncate text-md flex items-center font-bold text-gray-900 ">
                          {guild.name}
                        </h3>
                       
                      </div>

                      <p className=" text-sm text-gray-400 text-left"></p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ClientsList;
