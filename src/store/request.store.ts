import {create} from 'zustand';
import type {SurveyRequest} from "../types/dashboard.types";

interface SurveyRequestStore {
    request: Partial<SurveyRequest>;
    setRequest: (request: Partial<SurveyRequest>) => void;
    clearRequest: () => void;
}

const useSurveyRequestStore = create<SurveyRequestStore>((set) => ({
    request: {}, // 빈 객체로 시작
    setRequest: (request) =>
        set((state) => ({ request: { ...state.request, ...request } })),
    clearRequest: () => set({ request: {} }),
}));

export default useSurveyRequestStore;