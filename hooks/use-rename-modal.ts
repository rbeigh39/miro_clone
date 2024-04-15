import { create } from "zustand";

const default_values = { id: "", title: "" };

interface I_Rename_Model {
  is_open: boolean;
  initial_values: typeof default_values;
  on_open: (id: string, title: string) => void;
  on_close: () => void;
}

export const use_rename_model = create<I_Rename_Model>((set) => ({
  is_open: false,
  on_open: (id, title) => {
    set({
      is_open: true,
      initial_values: { id, title },
    });
  },
  on_close: () => {
    set({
      is_open: false,
      initial_values: default_values,
    });
  },
  initial_values: default_values,
}));
