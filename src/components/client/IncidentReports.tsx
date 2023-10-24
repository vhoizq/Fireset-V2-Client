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
  botConfigs: any;
  botStatuses: [];
  clientInfo: { clientId: String; botAvatar: String };
}

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);

export const IncidentReports =  async (props: { client: any }) => {
  const { data: clients, err } = await supabase
    .from("IncidentReports")
    .select("*")
    .eq("guildId", `${props.client}`);


  return (
    <div className="flex-wrap gap-2 w-full">
      {clients && clients.length > 0 ? (
        <div className="px-4 w-full">
          <div className="mt-3 flex flex-col">
            <div className="w-full">
              <div className="inline-block min-w-full py-2 align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Reported by
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Reported on
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Manage</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {clients.map((person: any, personIdx: any) => (
                        <tr
                          key={personIdx}
                          className={
                            personIdx % 2 === 0 ? undefined : "bg-gray-50"
                          }
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {person.author}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.createdOn}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.description}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a className="text-purple-500 cursor-pointer ml-3 hover:text-purple-900">
                              Manage Report
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {/* SVG path for "No bots" */}
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            You do not own any Discord Bots
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started with Fireset by creating a new Discord Bot.
          </p>
          <div className="mt-4">
            <Link
              href="/client/create"
              type="button"
              className="inline-flex items-center rounded-md border transition duration-200 border-transparent bg-gray-50 0 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Create Discord Bot
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentReports;
