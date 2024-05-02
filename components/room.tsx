"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";

interface Room_Props {
  children: ReactNode;
  room_id: string;
  fallback: NonNullable<ReactNode> | null;
}

export const Room = ({ children, room_id, fallback }: Room_Props) => {
  return (
    <RoomProvider id={room_id} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
