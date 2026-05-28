import { create } from "zustand";

export type HeaderState = {
  type: "DASHBOARD" | "HISTORY" | "BOARD";
};

interface HeaderStore {
  state: HeaderState;
  setState: (state: HeaderState) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  state: { type: "DASHBOARD" },
  setState: (state) => set({ state: state }),
}));
