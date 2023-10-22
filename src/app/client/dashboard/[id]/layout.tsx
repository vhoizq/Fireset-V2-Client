"use client";

import useSWR from "swr";
import { useState, useEffect } from "react";

import { useGroup } from "../group"
import { usePathname } from "next/navigation";

import { GroupDetails } from "@/util/db/group";
import { User } from "@/util/db/schemas/schema";
import toast from "react-hot-toast";

export default function GroupLayout({ children }: {
    children: React.ReactNode
}) {
    const group = useGroup();
    const path = usePathname();

    const response = useSWR(`/api/groups/${path.split("/")[3]}`, fetch);

    useEffect(() => {
        if (
            !response.isLoading
            && response.data
        ) {
            const tryJson = async () => {
                try {
                    const body = await response.data?.json();
                    if (body.group && group.setGroup) {
                        group.setGroup(body.group as GroupDetails);
                    }

                 

                    if (body.user && group.setUser) {
                        group.setUser(body.user);
                    }
                } catch (error) {

                }
            }

            tryJson();
        } else if (response.error) {
            toast.error("Error loading group data");
        }
    }, [response]);

    return (
        <div>{children}</div>
    )
}