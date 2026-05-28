export type HistoryDTO = {
  surveyDto: SurveyDto;
  rankings: Array<Ranking>;
};

export type SurveyRequest = {
  workPlaceAddress: string;
  jeonseMin: number;
  jeonseMax: number;
  monthlyMin: number;
  monthlyMax: number;
  depositMin: number;
  depositMax: number;
  preferenceLargeStore: "LOW" | "MIDDLE" | "HIGH";
  preferenceHospital: "LOW" | "MIDDLE" | "HIGH";
  preferenceSubway: "LOW" | "MIDDLE" | "HIGH";
  preferenceLibrary: "LOW" | "MIDDLE" | "HIGH";
  surveySelectedDistrictList: string[];
}

export type PreferenceLevel = "LOW" | "MIDDLE" | "HIGH";

export type PartialSurveyRequest = Partial<SurveyRequest>

export type SurveyDto = {
  surveyId: number;
  workPlaceAddress: string | null;
  jeonseMin: number | null;
  jeonseMax: number | null;
  monthlyMin: number | null;
  monthlyMax: number | null;
  depositMin: number | null;
  depositMax: number | null;
  preferenceLargeStore: "LOW" | "MIDDLE" | "HIGH";
  preferenceHospital: "LOW" | "MIDDLE" | "HIGH";
  preferenceSubway: "LOW" | "MIDDLE" | "HIGH";
  preferenceLibrary: "LOW" | "MIDDLE" | "HIGH";
  surveySelectedDistrictList: Array<District>;
  submittedAt: string;
};

export type District = {
  id: number;
  districtName: string;
};

export type Ranking = {
  ranking: number;
  dongCode: number;
  districtName: string;
  dongName: string;
  latitude: number;
  longitude: number;
  commuteTime: number;
};

export type InfraType = "SUBWAY" | "HOSPITAL" | "LIBRARY" | "LARGE_STORE";

export type DongDetailInfo = {
  surveyId: number;
  dongCode: number;
  dongName: string;
  latitude: number;
  longitude: number;
  commuteTime: number;
  commuteMessage: string;

  hospitalCount: number;
  subwayCount: number;
  libraryCount: number;
  largeStoreCount: number;

  jeonseCount: number | null;
  wolseCount: number | null;
};
