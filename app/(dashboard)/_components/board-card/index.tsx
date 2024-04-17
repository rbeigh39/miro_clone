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

import { use_api_mutation } from "@/hooks/use-api-mutations";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

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

  const { mutate: on_favourite, pending: pending_favourite } = use_api_mutation(
    api.board.favourite
  );

  const { mutate: on_unfavourite, pending: pending_unfavourite } =
    use_api_mutation(api.board.un_favourite);

  const toggle_favourite = () => {
    if (is_favourite) {
      on_unfavourite({ id }).catch(() =>
        toast.error("Failed to unfavourite board")
      );
    } else {
      on_favourite({ id, org_id }).catch(() =>
        toast.error("Failed to favourite board")
      );
    }
  };

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
          onClick={toggle_favourite}
          disabled={pending_favourite || pending_unfavourite}
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
