"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Confirm_Model } from "@/components/confirm-model";

import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { use_api_mutation } from "@/hooks/use-api-mutations";
import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";
import { use_rename_model } from "@/hooks/use-rename-modal";

interface Actions_Props {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  side_offset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  side_offset,
  id,
  title,
}: Actions_Props) => {
  const { mutate, pending } = use_api_mutation(api.board.remove);
  const { on_open } = use_rename_model();

  const on_delete = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete board"));
  };

  const on_copy_link = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success("Link copied");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={side_offset}
        className="w-60"
      >
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={on_copy_link}>
          <Link2 className="h-4 w-4 mr-2" /> Copy link
        </DropdownMenuItem>

        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={() => {
            on_open(id, title);
          }}
        >
          <Pencil className="h-4 w-4 mr-2" /> Rename
        </DropdownMenuItem>

        <Confirm_Model
          header="Delete board?"
          description="This will delete the board and all of it's content"
          disabled={pending}
          on_confirm={on_delete}
        >
          <Button
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
            variant={"ghost"}
          >
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
        </Confirm_Model>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
