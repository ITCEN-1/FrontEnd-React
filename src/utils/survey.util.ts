import type { SurveyDto } from "../types/dashboard.types.js";

export function isWolse(survey: SurveyDto) {
  const { jeonseMin, jeonseMax } = survey;

  return jeonseMin === null && jeonseMax === null;
}
