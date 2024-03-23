"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";

import { ChangeEvent, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const Search_Input = () => {
  const router = useRouter();
  const [value, set_value] = useState("");
  const [debounced_value, set_debounced_value] = useDebounceValue(value, 500);

  const handle_change = (e: ChangeEvent<HTMLInputElement>) => {
    set_value(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debounced_value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debounced_value, router]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search boards"
        onChange={handle_change}
        value={value}
      />
    </div>
  );
};

export default Search_Input;
