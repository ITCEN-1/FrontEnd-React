import { create } from "zustand";
import type { HistoryDTO, InfraDetailResponse } from "../types/dashboard.types";
import { wolseDummy } from "../store/store.dummy";

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

interface InfraLocationsStore {
  infraLocationInfo: InfraDetailResponse | null;
  setInfraLocations: (locations: InfraDetailResponse) => void;
  clearInfraLocations: () => void;
}

export const useInfraLocationStore = create<InfraLocationsStore>((set) => ({
  infraLocationInfo: null,
  setInfraLocations: (locations) => set({ infraLocationInfo: locations }),
  clearInfraLocations: () => set({ infraLocationInfo: null }),
}));
