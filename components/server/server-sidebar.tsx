import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar = ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile;

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  return (
    <>
      <div>ServerSidebaru</div>
    </>
  );
};

export default ServerSidebar;
