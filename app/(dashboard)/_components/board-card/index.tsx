"use client";

import Link from "next/link";
import Image from "next/image";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Actions } from "@/components/actions";
import { MoreHorizontal, MoreHorizontalIcon } from "lucide-react";

interface Board_Card_Props {
  id: string;
  title: string;
  author_name: string;
  author_id: string;
  image_url: string;
  created_at: number;
  org_id: string;
  is_favourite: boolean;
}

export const Board_Card = ({
  id,
  title,
  author_name,
  author_id,
  image_url,
  created_at,
  org_id,
  is_favourite,
}: Board_Card_Props) => {
  const { userId } = useAuth();

  const author_label = userId === author_id ? "You" : author_name;
  const created_at_label = formatDistanceToNow(created_at, {
    addSuffix: true,
  });

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={image_url} alt={title} fill className="object-fit" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          is_favourite={is_favourite}
          title={title}
          author_label={author_label}
          created_at_label={created_at_label}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
};

Board_Card.Skeleton = function () {
  return (
    <div className="aspect-[100/127] rounded-lg  overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
