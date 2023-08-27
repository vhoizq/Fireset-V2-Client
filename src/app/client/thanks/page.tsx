"use client";

import useSWR from "swr";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";

import { HiX } from "react-icons/hi";
import { useAuth } from "../auth";
import { Toaster, toast } from "react-hot-toast";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Avatar } from "@/components/content/Avatar";
import { MoonLoader } from "react-spinners";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images-ext-1.discordapp.net/external/Gu7KcuWl1IpFcMHL3q_lpyX_qLpb83D1yP5vtJ4N7c0/https/cdn.discordapp.com/avatars/914289232061800459/1c26d51680f735a589b815f803dc3124.png?width=281&height=281",
};
const navigation = [
  { name: "Custom Discord Bots", href: "#", current: true },
  { name: "Member Counters", href: "#", current: false },
];
const userNavigation = [
  { name: "Dashboard", href: "/client" },
  { name: "Settings", href: "/client/settings" },
  { name: "Sign out", href: "/" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ClientPage() {
  const auth = useAuth();

  const [state, setState] = useState<boolean>(false);
  const cache = useSWR(`/api`, fetch);

  const router = useRouter();
  if (auth.user?.isBeta === true) {
    router.replace("/client");
  }

  if (auth!.user?.isActive === false) {
    router.replace("/client/notice");
  }

  return auth.user ? (
    <main>
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="min-h-screen flex flex-col justify-center relative overflow-hidden ">
        <div className="absolute inset-0 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        <div className="relative px-9 pt-3 pb-8 bg-white shadow ring-1 ring-gray-200 sm:max-w-lg sm:mx-auto sm:rounded-lg sm:px-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-300/50 text-gray-600">
              <div className="mt-5 py-4 text-base leading-7 space-y-6 text-gray-600">
                <p>
                  👋 Hi there, <b>{auth!.user.username}</b>! Thanks for joining
                  the waitlist.
                </p>
                <p>
                  <b>Fireset</b> is a platform for you to easily manage your
                  community, and look professional with your very own{" "}
                  <b>Custom Discord Bot.</b> We take the hassle out of coding
                  your own bot, with our simple to use dashboard.
                </p>
                <p>
                  We have some exciting things to bring to the table, so stay
                  tuned for something huge!
                </p>
              </div>
              <div className="mb-3 pt-6 text-base leading-5 font-semibold">
                <p>
                  <a
                    className="font-semibold text-blue-500 hover:text-blue-600"
                    href="https://discord.gg/BYPu8EkbW4"
                  >
                    Community Discord →
                  </a>
                </p>
              </div>
            </div>
          </div>
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
