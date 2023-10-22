"use client";
import { useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  Bars2Icon,
  Bars3Icon,
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
import Image from "next/image";

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
    { name: "Login to Dashboard", href: "/client" },
    { name: "Register for Free", href: "/client" },
  ],
  support: [
    { name: "Contact our Team", href: "mailto:hello@fireset.xyz" },
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
                <span className="sr-only">Fireset</span>
                <Image
                  width={146}
                  height={2}
                  className={"object-contain"}
                  src={"/branding/NewLogoFinal.png"}
                  alt="logo"
                />
              </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <a
                href="/pricing"
                className="transition duration-200 inline-flex  px-4 py-2 text-base font-normal text-gray-800  hover:text-gray-600"
              >
                Our Pricing
              </a>
              <a
                href="https://discord.com/api/oauth2/authorize?client_id=1053864556503519312&redirect_uri=http://localhost:3000/auth/redirect&response_type=code&scope=identify%20connections%20email%20guilds"
                className="transition duration-200 inline-flex  px-4 py-2 text-base font-normal text-gray-800  hover:text-gray-600"
              >
                Sign In
              </a>
            </div>

            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <a
                href="/pricing"
                className="transition duration-200 inline-flex  px-4 py-2 text-base font-normal text-gray-800  hover:text-gray-600"
              >
                Our Pricing
              </a>
              <a
                href="https://apis.roblox.com/oauth/v1/authorize?client_id=6559552435031738282&redirect_uri=http://localhost:3000/auth/redirect&scope=openid+profile&response_type=Code&prompts=login+consent&nonce=12345&state=6789"
                className="transition duration-200 inline-flex  px-4 py-2 text-base font-normal text-gray-800  hover:text-gray-600"
              >
                Sign In
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
                  <div className="mt-6">
                    <a
                      href="/pricing"
                      className="transition duration-200 inline-flex  px-4 py-2 text-base font-normal text-gray-800  hover:text-gray-600"
                    >
                      Pricing
                    </a>
                    <a
                      href="https://apis.roblox.com/oauth/v1/authorize?client_id=6559552435031738282&redirect_uri=http://localhost:3000/auth/redirect&scope=openid+profile&response_type=Code&prompts=login+consent&nonce=12345&state=6789"
                      className="transition duration-200 inline-flex  px-4 py-2 text-base font-normal text-gray-800  hover:text-gray-600"
                    >
                      Sign In
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
            className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white"
          />
          <div className="relative">
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                <div>
                  <div className="mt-6">
                    
                    <h3 className="text-4xl font-bold tracking-tight text-gray-900">
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-blue-800">
                        Innovating
                      </span>{" "}
                      the world of group safety & security on Roblox
                    </h3>
                    <p className="mt-4 text-md text-gray-500">
                      Keeping your group safe on Roblox is very important, with
                      Fireset, you can manage all of your moderation needs. All
                      of this, in one easy-to-use dashboard.
                    </p>
                    <div className="mt-6">
                      <a
                        href="https://apis.roblox.com/oauth/v1/authorize?client_id=6559552435031738282&redirect_uri=http://localhost:3000/auth/redirect&scope=openid+profile&response_type=Code&prompts=login+consent&nonce=12345&state=6789"
                        className="transition duration-200 inline-flex rounded-xl border border-transparent bg-purple-500 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-600 hover:to-purple-800"
                      >
                        Join the waitlist
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto  flex max-w-2xl  lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
                <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                 <img src="https://pub-b9da3062b2994df38277c6ff9e81a3fb.r2.dev/New Project (100).png"   width={592}
                  height={442} alt="GUHGUHG" />
               
                 
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
                  <h3 className="text-base font-normal text-gray-900">
                    Our Product
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
                  <h3 className="text-base font-normal text-gray-900">
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
                  <h3 className="text-base font-normal text-gray-900">Legal</h3>
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
