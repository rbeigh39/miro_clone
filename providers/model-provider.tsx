"use client";

import { useEffect, useState } from "react";
import { Rename_Modal } from "@/components/modals/rename-model";

export const Model_Provider = () => {
  const [is_mounted, set_is_mounted] = useState(false);

  useEffect(() => {
    set_is_mounted(true);
  }, []);

  if (!is_mounted) return null;

  return (
    <>
      <Rename_Modal />
    </>
  );
};
