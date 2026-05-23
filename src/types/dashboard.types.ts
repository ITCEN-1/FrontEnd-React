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

// ranking에서는 dongCode만 있는데 구 이름과 법정동명도 포함해야 한다.
export type Ranking = {
  ranking: number;
  dongCode: number;
  districtName: string;
  dongName: string;
  commuteTime: number;
};
