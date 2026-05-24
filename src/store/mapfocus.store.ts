import { create } from "zustand";
import type { Position } from "../types/map.types";

interface MapFocusStore {
  position: Position | null;
  setFocusPosition: (position: Position | null) => void;
  clearFocusPosition: () => void;
}

export const useFocusStore = create<MapFocusStore>((set) => ({
  position: null,
  setFocusPosition: (position) => set({ position }),
  clearFocusPosition: () => set({ position: null }),
}));
