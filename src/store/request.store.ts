import {create} from 'zustand';
import type {SurveyRequest} from "../types/dashboard.types";

interface SurveyRequestStore {
    request: SurveyRequest | null,
    setRequest: (request: SurveyRequest) => void,
    clearRequest: () => void
}

const useSurveyRequestStore = create<SurveyRequestStore>((set) => ({
    request: null, // 초기 상태
    setRequest: (request: SurveyRequest) => {
        set({request});
    },
    clearRequest: () => set({request: null})
}));

export default useSurveyRequestStore;