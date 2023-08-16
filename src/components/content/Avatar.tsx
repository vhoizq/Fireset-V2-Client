"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { MoonLoader } from "react-spinners";

export const Avatar = (props: {
    userId: string,
    sessionToken: string,
    onError: () => JSX.Element,
    className?: string
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [image, setImage] = useState<string>();

    useEffect(() => {
        let cache = window.localStorage.getItem(`avatar-${props.userId}`);
        if (cache) {
            setImage(cache)
            setLoading(false);
        } else {

            const tryJson = async () => {
                try {
                    const discordResponse = await axios.get('https://discord.com/api/v10/users/@me', {
                        headers: {
                            Authorization: `Bearer ${props.sessionToken}`
                        }
                    });


                    const body = discordResponse.data
                    if (body) {
                        setImage(`https://cdn.discordapp.com/avatars/${body.id}/${body.avatar}.png`)
                        setLoading(false);
                        window.localStorage.setItem(`avatar-${body.id}`, body.avatar)
                    }
                } catch (error) {
                    setLoading(false);
                }
            }

            tryJson();


        }
    }, [props])

    return loading
        ? <>
            <MoonLoader
                size={24}
                className={props.className}
                color={"#6366f1"}
            />
        </>
        : <>
            {
                image
                    ? <img
                        src={image}
                        alt={"avatar"}
                        className={props.className}
                    />
                    : <props.onError />
            }
        </>
}