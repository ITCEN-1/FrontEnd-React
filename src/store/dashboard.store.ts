import { create } from "zustand";
import type { HistoryDTO } from "../types/dashboard.types";
import { jeonseDummy, wolseDummy } from "../store/store.dummy";

interface DashboardStore {
  data: HistoryDTO | null;
  setData: (data: HistoryDTO) => void;
  clearData: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  data: wolseDummy,
  setData: (newData) => set({ data: newData }),
  clearData: () => set({ data: null }),
}));
