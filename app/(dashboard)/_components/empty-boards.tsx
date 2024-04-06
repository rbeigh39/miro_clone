"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

import { use_api_mutation } from "@/hooks/use-api-mutations";

const Empty_Boards = () => {
  const { organization } = useOrganization();

  // const create = useMutation(api.board.create);
  const { mutate, pending } = use_api_mutation(api.board.create);

  const on_click = () => {
    if (!organization) return;

    mutate({
      title: "untitled",
      org_id: organization.id,
    })
      .then((id) => {
        toast.success("Board Created");
      })
      .catch((err) => {
        toast.error("Failed to create board");
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={"/note.svg"} alt="Empty" width={110} height={110} />
      <h2 className="text-2xl font-semibold mt-6 ">Create your first board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button size={"lg"} onClick={on_click} disabled={pending}>
          Create board
        </Button>
      </div>
    </div>
  );
};

export default Empty_Boards;
