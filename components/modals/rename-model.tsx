"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { use_rename_model } from "@/hooks/use-rename-modal";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { use_api_mutation } from "@/hooks/use-api-mutations";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const Rename_Modal = () => {
  const { is_open, on_close, initial_values } = use_rename_model();
  const [title, set_title] = useState(initial_values.title);

  const { mutate, pending } = use_api_mutation(api.board.update);

  useEffect(() => {
    set_title(initial_values.title);
  }, [initial_values.title]);

  const on_submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate({ id: initial_values.id, title })
      .then(() => {
        toast.success("Board renamed");
        on_close();
      })
      .catch(() => toast.error("Failed to rename board"));
  };

  return (
    <Dialog open={is_open} onOpenChange={on_close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
          <DialogDescription>
            Enter a new title for this board
          </DialogDescription>

          <form onSubmit={on_submit} className="space-y-4">
            <Input
              disabled={pending}
              required
              maxLength={60}
              value={title}
              onChange={(e) => set_title(e.target.value)}
              placeholder="Board title"
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"} type="button">
                  Cancel
                </Button>
              </DialogClose>

              <Button disabled={pending} type="submit">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
