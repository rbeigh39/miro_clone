"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { use_api_mutation } from "@/hooks/use-api-mutations";
import { toast } from "sonner";

interface New_Board_Button_Props {
  org_id: string;
  disabled?: boolean;
}

export const New_Board_Button = ({
  org_id,
  disabled,
}: New_Board_Button_Props) => {
  const { mutate, pending } = use_api_mutation(api.board.create);

  const on_click = () => {
    mutate({
      org_id,
      title: "untitled",
    })
      .then((id) => {
        toast.success("Board created");
        // TODO: Redirect to /board/id
      })
      .catch((err) => {
        toast.error("Failed to create board");
      });
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={on_click}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (pending || disabled) &&
          "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div className="">&nbsp;</div>
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New Board</p>
    </button>
  );
};
