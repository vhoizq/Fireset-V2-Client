"use client";
import { useState, Fragment } from "react";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { BellIcon, BriefcaseIcon, CalendarDaysIcon, CalendarIcon, CheckBadgeIcon, CheckCircleIcon, CheckIcon, CurrencyDollarIcon, HomeIcon, MapPinIcon, PencilIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'

const tabs = [
  { name: 'My Account', href: '#', current: false },
  { name: 'Company', href: '#', current: false },
  { name: 'Team Members', href: '#', current: true },
  { name: 'Billing', href: '#', current: false },
]

import { createClient } from "@supabase/supabase-js";
import { LinkIcon } from "@nextui-org/react";

const supabaseUrl = "https://vfppfrtyvxpuyzwrqxtq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcHBmcnR5dnhwdXl6d3JxeHRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzMyMzQ2MCwiZXhwIjoyMDA4ODk5NDYwfQ.fc3Cmi29xECvvEXmGZW6PPfVLRppnH-MINVuGFJF6bA";

const supabase = createClient(supabaseUrl, supabaseKey);


function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Background color split screen for large screens */}
      <div className="fixed top-0 left-0 h-full w-1/2 bg-white" aria-hidden="true" />
      <div className="fixed top-0 right-0 h-full w-1/2 bg-gray-50" aria-hidden="true" />
      <div className="relative flex min-h-screen flex-col">
        {/* Navbar */}
        <Disclosure as="nav" className="flex-shrink-0 bg-gray-900">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  {/* Logo section */}
                  <div className="flex items-center px-2 lg:px-0 xl:w-64">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                        alt="Your Company"
                      />
                    </div>
                  </div>

                  {/* Search section */}

                  <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3CenterLeftIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  {/* Links section */}
                  <div className="hidden lg:block lg:w-80">
                    <div className="flex items-center justify-end">
                      <div className="flex">
                        <a
                          href="#"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-100 hover:text-white"
                        >
                          Documentation
                        </a>
                        <a
                          href="#"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-100 hover:text-white"
                        >
                          Support
                        </a>
                      </div>
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-4 flex-shrink-0">
                        <div>
                          <Menu.Button className="flex rounded-full bg-indigo-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                              alt=""
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
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-800'
                                  )}
                                >
                                  View Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-800'
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-800'
                                  )}
                                >
                                  Logout
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="px-2 pt-2 pb-3">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block rounded-md bg-indigo-800 px-3 py-2 text-base font-medium text-white"
                  >
                    Dashboard
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-100 hover:bg-gray-900 hover:text-indigo-100"
                  >
                    Support
                  </Disclosure.Button>
                </div>
                <div className="border-t border-indigo-800 pt-4 pb-3">
                  <div className="px-2">
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-100 hover:bg-gray-900 hover:text-indigo-100"
                    >
                      Your Profile
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-100 hover:bg-gray-900 hover:text-indigo-100"
                    >
                      Settings
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-100 hover:bg-gray-900 hover:text-indigo-100"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* 3 column wrapper */}
        <div className="mx-auto w-full max-w-7xl flex-grow lg:flex">
          {/* Left sidebar & main wrapper */}
          <div className="min-w-0 flex-1 bg-white ">
            <div className="border-b border-gray-200 bg-white   ">
              <div className="h-full py-5 pl-4 pr-6 sm:pl-6 lg:pl-8">

                <div className="relative h-full" style={{ minHeight: '1rem' }}>
                  <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-semibold leading- text-gray-900 ">
                        Support Request #294824
                      </h2>
                      <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <PencilSquareIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          Opened by Fluxtev
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <CalendarDaysIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          Created on 11/20/2023
                        </div>


                      </div>
                      <span className="inline-flex mt-2 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Debug ID: <b className="ml-1">339ccdcb-bc5d-4c5a-a09e-c4ac8a9e15ad</b></span>
                      <span className="inline-flex mt-2 ml-2  items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-500/10">Connection Timeout</span>

                    </div>
                    <div className="mt-5 flex lg:ml-4 lg:mt-0">




                      <span className="sm:ml-3">
                        <button
                          type="button"
                          className="transition durintation-500 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <HomeIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          Visit Dashboard
                        </button>
                        <button
                          type="button"
                          className="transition durintation-500 inline-flex ml-2 items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          <CheckCircleIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                          Mark Resolved
                        </button>
                      </span>


                    </div>
                  </div>
                </div>


              </div>
            </div>

            <div className="bg-white lg:min-w-0 lg:flex-1">
  <div className="h-full py-2 px-4 sm:px-6 lg:px-8">
                {/* Start main area*/}
                <div className="relative h-full overflow-y-auto" >
                  <div className="chat chat-end">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src="https://images-ext-2.discordapp.net/external/SF-nXtCVMghw9Z605ymFtxia-tAcNr5OlweX6C69J2c/https/cdn.discordapp.com/avatars/914289232061800459/738257a30e6728d30a80af19cfe80ac9.png" />
                      </div>
                    </div>

                    <div className="chat-bubble bg-orange-100 text-black text-sm font-normal" style={{ maxWidth: '25rem' }}>The user seems to be having issues with getting set up on Fireshit. No idea the primary cause, still trying to get insight.
                    </div>

                  </div>
                  <div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://images-ext-2.discordapp.net/external/SF-nXtCVMghw9Z605ymFtxia-tAcNr5OlweX6C69J2c/https/cdn.discordapp.com/avatars/914289232061800459/738257a30e6728d30a80af19cfe80ac9.png" />
    </div>
  </div>
  
  <div className="chat-bubble bg-orange-100 text-black text-sm font-normal" style={{ maxWidth: '25rem' }}>The user seems to be having issues with getting set up on Fireshit. No idea the primary cause, still trying to get insight.
 </div>
  
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://images-ext-2.discordapp.net/external/SF-nXtCVMghw9Z605ymFtxia-tAcNr5OlweX6C69J2c/https/cdn.discordapp.com/avatars/914289232061800459/738257a30e6728d30a80af19cfe80ac9.png" />
    </div>
  </div>
  
  <div className="chat-bubble bg-orange-100 text-black text-sm font-normal" style={{ maxWidth: '25rem' }}>The user seems to be having issues with getting set up on Fireshit. No idea the primary cause, still trying to get insight.
 </div>
  
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://images-ext-2.discordapp.net/external/SF-nXtCVMghw9Z605ymFtxia-tAcNr5OlweX6C69J2c/https/cdn.discordapp.com/avatars/914289232061800459/738257a30e6728d30a80af19cfe80ac9.png" />
    </div>
  </div>
  
  <div className="chat-bubble bg-orange-100 text-black text-sm font-normal" style={{ maxWidth: '25rem' }}>The user seems to be having issues with getting set up on Fireshit. No idea the primary cause, still trying to get insight.
 </div>
  
</div>

<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://images-ext-2.discordapp.net/external/SF-nXtCVMghw9Z605ymFtxia-tAcNr5OlweX6C69J2c/https/cdn.discordapp.com/avatars/914289232061800459/738257a30e6728d30a80af19cfe80ac9.png" />
    </div>
  </div>
  
  <div className="chat-bubble bg-orange-100 text-black text-sm font-normal" style={{ maxWidth: '25rem' }}>The user seems to be having issues with getting set up on Fireshit. No idea the primary cause, still trying to get insight.
 </div>
  
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://images-ext-2.discordapp.net/external/SF-nXtCVMghw9Z605ymFtxia-tAcNr5OlweX6C69J2c/https/cdn.discordapp.com/avatars/914289232061800459/738257a30e6728d30a80af19cfe80ac9.png" />
    </div>
  </div>
  
  <div className="chat-bubble bg-orange-100 text-black text-sm font-normal" style={{ maxWidth: '25rem' }}>The user seems to be having issues with getting set up on Fireshit. No idea the primary cause, still trying to get insight.
 </div>
  
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://images-ext-2.discordapp.net/external/SF-nXtCVMghw9Z605ymFtxia-tAcNr5OlweX6C69J2c/https/cdn.discordapp.com/avatars/914289232061800459/738257a30e6728d30a80af19cfe80ac9.png" />
    </div>
  </div>
  
  <div className="chat-bubble bg-orange-100 text-black text-sm font-normal" style={{ maxWidth: '25rem' }}>The user seems to be having issues with getting set up on Fireshit. No idea the primary cause, still trying to get insight.
 </div>
  
</div>
                </div>
                {/* End main area */}
              </div>
            </div>


          </div>

          <div className="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 ">
            <div className="h-full py-6 pl-6 lg:w-80">
              {/* Start right column area */}
              <div className="relative h-full" style={{ minHeight: '16rem' }}>
                <div className="absolute inset-0 rounded-lg border-2 border-dashed border-gray-200" />
              </div>
              {/* End right column area */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
