import type { loadKakaoMaps } from "../utils/map.util";

export type Position = {
  latitude: number;
  longitude: number;
  dongCode: number | null;
  level: number;
};

export type Coords = {
  lat: number;
  lng: number;
};

export type Addresses = {
  address: string | null;
  roadAddress: string | null;
};

export type KakaoMaps = Awaited<ReturnType<typeof loadKakaoMaps>>;
