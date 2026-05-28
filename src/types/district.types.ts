import type { FeatureCollection, Polygon, MultiPolygon } from "geojson";

/** 서울시 자치구 GeoJSON properties 구조 */
export interface SeoulDistrictProperties {
  /** 행정구역 코드 (예: "11320") */
  SIG_CD: string;
  /** 한글 자치구명 (예: "도봉구") */
  SIG_KOR_NM: string;
  /** 영문 자치구명 (예: "Dobong-gu") */
  SIG_ENG_NM: string;
  ESRI_PK: number;
  SHAPE_AREA: number;
  SHAPE_LEN: number;
}

/** 자치구 FeatureCollection 타입 (Polygon / MultiPolygon 혼용 가능) */
export type SeoulDistrictsGeoJSON = FeatureCollection<
  Polygon | MultiPolygon,
  SeoulDistrictProperties
>;
