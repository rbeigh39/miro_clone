"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import Hint from "@/components/hint";

import { cn } from "@/lib/utils";

interface item_Props {
  id: string;
  name: string;
  image_url: string;
}

const Item = ({ id, name, image_url }: item_Props) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const is_active = organization?.id === id;

  const on_click = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" align="center" side_offset={18}>
        <Image
          fill
          src={image_url}
          onClick={on_click}
          alt={name}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            is_active && "opacity-100"
          )}
        />
      </Hint>
    </div>
  );
};

export default Item;
