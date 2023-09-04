"use client";

import useSWR from "swr";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth";
import { useEffect } from "react";
import IntercomWidget from "@/components/client/Intercom";
import axios from "axios";

interface User {
  username: string;
  sessionToken: string;
  userId: string;
  isActive: boolean;
  isBeta: boolean;
  isStaff: boolean;
  email: string;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();

  const { data, error, isLoading } = useSWR("/api/context", fetch);
  if (error) {
    console.log("Got Error");
    router.replace("/");
  }

  useEffect(() => {
    console.log("yes");
    if (data) {
      console.log("Got Information");
      const tryJson = async () => {
        try {
          const body = await data.json();
          console.log(body.data);
          if (body && body.data && auth.setUser) {
            auth.setUser(body.data as User);
          } else if (body && body.error) {
            router.replace("/");
          }
        } catch (error) {}
      };

      tryJson();
    }
  }, [isLoading, data]);

  useEffect(() => {
    console.log(`Username: ${auth.user?.username}`);
  
    // Check if username is defined before loading Intercom
    if (auth.user?.username) {
      // Intercom settings
      const intercomSettings = {
        api_base: "https://api-iam.intercom.io",
        app_id: "aaljxt5r",
        name: `${auth.user?.username}`,
        email: `${auth.user?.email}`,
        user_id: `${auth.user?.userId}`,
      };
  
      // Load Intercom widget
      const intercomScript = `
        window.intercomSettings = ${JSON.stringify(intercomSettings)};
  
        (function () {
          var w = window;
          var ic = w.Intercom;
          if (typeof ic === "function") {
            ic('reattach_activator');
            ic('update', w.intercomSettings);
          } else {
            var d = document;
            var i = function () {
              i.c(arguments);
            };
            i.q = [];
            i.c = function (args) {
              i.q.push(args);
            };
            w.Intercom = i;
            var l = function () {
              var s = d.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = 'https://widget.intercom.io/widget/aaljxt5r';
              var x = d.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(s, x);
            };
            if (document.readyState === 'complete') {
              l();
            } else if (w.attachEvent) {
              w.attachEvent('onload', l);
            } else {
              w.addEventListener('load', l, false);
            }
          }
        })();
      `;
  
      // Create a div to inject the script
      const scriptContainer = document.createElement("script");
      scriptContainer.innerHTML = intercomScript;
  
      // Append the script to the body
      document.body.appendChild(scriptContainer);
    }
  }, [auth.user]);

  

  return auth.user ? (

    


    <div>
      {pathname.includes("groups") || pathname.includes("apps") ? (
        <>{children}</>
      ) : (
        <>{children}</>
      )}
    </div>
  ) : null;
}
