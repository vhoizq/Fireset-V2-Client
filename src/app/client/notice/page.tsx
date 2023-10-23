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
  if (auth!.user?.isActive === true) {
    router.replace("/client");
  }

  if (auth.user?.isActive === false) {
    toast.error("You have been suspended from Fireset");
  }

  return auth.user?.isActive === false ? (
    <main>
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-6 sm:py-12">
        <img
          src="/img/beams.jpg"
          alt=""
          className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          width="1308"
        />
        <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-200 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="mx-auto max-w-md">
            <div className="divide-y divide-gray-300/50">
              <div className="py-8 text-base leading-7 text-gray-600">
                <p>
                  You have been suspended from Fireset due to violation of our
                  Terms of Service. We are deciated to keeping our services safe
                  and secure from people who attempt to violate our Terms of
                  Service.
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
