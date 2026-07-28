"use client";

import { create } from "zustand";

const useSearchStore = create((set) => ({
  search: "",

  setSearch: (value) =>
    set({
      search: value,
    }),

  clearSearch: () =>
    set({
      search: "",
    }),
}));

export default useSearchStore;
