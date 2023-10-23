import { GroupDetails } from "@/util/db/group";
import { User } from "@/util/db/schemas/schema";
import { useState } from "react";
import { HiDotsVertical, HiChatAlt, HiTrash, HiTicket } from "react-icons/hi";
import { Logo } from "../content/Logo";

export const GroupHeader = (props: { group: GroupDetails }) => {
  const [menu, setMenu] = useState<boolean>(false);
  const [reportModal, setReportModal] = useState<boolean>(false);
  const [ticketModal, setTicketModal] = useState<boolean>(false);

  return (
    <div className="flex flex-row justify-between w-full bg-white-0 shadow-md rounded-md p-8">
      <div className="flex flex-row my-auto gap-8">
        <Logo
          className="w-16 h-16 rounded-lg my-auto"
          groupId={props.group.groupId}
          onError={() => <></>}
        />
        <div className="flex flex-col my-auto">
          <span className="text-indigo-950 text-lg font-bold">
            {props.group.name}
          </span>
          <span className="text-indigo-950 text-sm">
            Created by {props.group.name} on{" "}
            {new Date(props.group.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    
    </div>
  );
};
