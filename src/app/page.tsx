"use client";
import { useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ChartBarIcon,
  HeartIcon,
  InboxIcon,
  PencilIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  TrashIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const solutions = [
  {
    name: "Inbox",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: InboxIcon,
  },
  {
    name: "Messaging",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Live Chat",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Knowledge Base",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: QuestionMarkCircleIcon,
  },
];
const features = [
  {
    name: "Unlimited Inboxes",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: InboxIcon,
  },
  {
    name: "Manage Team Members",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: UsersIcon,
  },
  {
    name: "Spam Report",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: TrashIcon,
  },
  {
    name: "Compose in Markdown",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: PencilIcon,
  },
  {
    name: "Team Reporting",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ChartBarIcon,
  },
  {
    name: "Saved Replies",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ChartBarIcon,
  },
  {
    name: "Email Commenting",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ChartBarIcon,
  },
  {
    name: "Connect with Customers",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: HeartIcon,
  },
];
const metrics = [
  { id: 1, stat: "0", emphasis: "Datacenter Regions", rest: "to choose from." },
  { id: 2, stat: "25K+", emphasis: "Custom Discord Bots", rest: "we provide." },
  { id: 3, stat: "98%", emphasis: "Uptime", rest: "within the last 30 days." },
  {
    id: 4,
    stat: "12M+",
    emphasis: "Communities",
    rest: "that utilize our services.",
  },
];
const footerNavigation = {
  solutions: [
    { name: "Staff Management", href: "/client" },
    { name: "Custom Discord Bots", href: "/client" },
  ],
  support: [
    { name: "Contact Us", href: "https://discord.gg/mYEkZBVwZK" },
    { name: "Discord Server", href: "https://discord.gg/mYEkZBVwZK" },
  ],

  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Code of Conduct", href: "/conduct" },
  ],
};

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header>
        <Popover className="relative bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between p-4 md:justify-start ">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-7 w-auto sm:h-8"
                  src="https://media.discordapp.net/attachments/1109372391043375234/1130028056187252767/New_Project_41.png"
                  alt=""
                />
              </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-400">
                <span className="sr-only">Open menu</span>
                <ChartBarIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              <a
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Our Pricing
              </a>
              <a
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Discord Community
              </a>
            </Popover.Group>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <a
                href="https://discord.com/api/oauth2/authorize?client_id=1053864556503519312&redirect_uri=https%3A%2F%2Ffireset.xyz%2Fapi%2Fauth%2Fredirect&response_type=code&scope=identify%20email%20guilds"
                className="transition duration-200 inline-flex rounded-md border border-transparent bg-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-blue-500 hover:to-blue-800"
              >
                Login to Dashboard
              </a>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden"
            >
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://media.discordapp.net/attachments/1109372391043375234/1130028056187252767/New_Project_41.png"
                        alt="Your Company"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400">
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Our Pricing
                    </a>
                    <a
                      href="#"
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Discord Server
                    </a>
                  </div>
                  <div className="mt-6">
                    <a
                      href="https://discord.com/api/oauth2/authorize?client_id=1053864556503519312&redirect_uri=https%3A%2F%2Ffireset.xyz%2Fapi%2Fauth%2Fredirect&response_type=code&scope=identify%20email%20guilds"
                      className="transition duration-200 inline-flex rounded-md border border-transparent bg-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-blue-500 hover:to-blue-800"
                    >
                      Login to Dashboard
                    </a>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </header>

      <main>
        {/* Hero section */}
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
        </div>

        {/* Logo Cloud */}

        {/* Alternating Feature Sections */}
        <div className="relative overflow-hidden pt-16 pb-32">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
          />
          <div className="relative">
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                <div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                      Powerful industry leading Discord Bots
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      Fireset is the industry leader in providing Custom Discord
                      Bots, with our advanced technology you will have the
                      ability to efficentlly manage your Discord Community,
                      whilist also integrating other platforms.
                    </p>
                    <div className="mt-6">
                      <a
                        href="https://discord.com/api/oauth2/authorize?client_id=1053864556503519312&redirect_uri=https://fireset.xyz/auth/redirect&response_type=code&scope=identify%20connections%20email%20guilds"
                        className="transition duration-200 inline-flex rounded-md border border-transparent bg-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-blue-500 hover:to-blue-800"
                      >
                        Get started today
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                  {/* 
<img
className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
src=""
alt="Fireset Dashboard"
/> 
*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8 lg:pt-24">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    Our Services
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.solutions.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-base font-medium text-gray-900">
                    Support
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.support.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="mt-12 md:mt-0">
                  <h3 className="text-base font-medium text-gray-900">Legal</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16">
            <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
              &copy; 2023 Fireset. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
