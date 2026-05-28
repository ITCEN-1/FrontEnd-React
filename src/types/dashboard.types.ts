export type HistoryDTO = {
  surveyDto: SurveyDto;
  rankings: Array<Ranking>;
};

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

export type InfraItemResponse = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  line: string;
};

export type InfraDetailResponse = {
  dongCode: number;
  type: InfraType;
  items: Array<InfraItemResponse>;
};
