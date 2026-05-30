import legalDong from "../assets/legal_dong.json" with { type: "json" };
import { Loader } from "react-kakao-maps-sdk";
import type { Coords, Addresses } from "../types/map.types";

export function findLegalDongCoordinates(legal_dong_code: number | string) {
  const { features } = legalDong as any;
  const feature = features.find((f: any) => String(legal_dong_code) === String(f.properties["EMD_CD"] + "00"));

  if (!feature) return [];

  const { type, coordinates } = feature.geometry;
  let result = [];
  if (type === "Polygon") {
    result = [coordinates[0].map((c: number[]) => ({ lat: c[1], lng: c[0] }))];
  } else if (type === "MultiPolygon") {
    result = coordinates.map((polygon: number[][][]) => polygon[0].map((c: number[]) => ({ lat: c[1], lng: c[0] })));
  }

  return result;
}

export function isNumericString(value: string) {
  return typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value));
}

const loader = new Loader({
  appkey: import.meta.env.VITE_KAKAO_JS_KEY,
  libraries: ["services"],
});

let kakaoMapsPromise: ReturnType<typeof loader.load> | null = null;

export function loadKakaoMaps() {
  if (!kakaoMapsPromise) {
    kakaoMapsPromise = loader.load();
  }

  return kakaoMapsPromise;
}

export async function searchCoords(address: string) {
  await loadKakaoMaps();

  try {
    return await addressToCoords(address);
  } catch {
    return await keywordToCoords(address);
  }
}

async function addressToCoords(address: string): Promise<Coords> {
  const geocoder = new kakao.maps.services.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, (result, status) => {
      if (status !== kakao.maps.services.Status.OK) {
        reject(new Error("주소 검색 실패"));
        return;
      }

      resolve({
        lng: Number(result[0].x),
        lat: Number(result[0].y),
      });
    });
  });
}

async function keywordToCoords(keyword: string): Promise<Coords> {
  const place = new kakao.maps.services.Places();

  return new Promise((resolve, reject) => {
    place.keywordSearch(keyword, (result, status) => {
      if (status !== kakao.maps.services.Status.OK) {
        reject(new Error("키워드 기반 위도 경도 검색 실패"));
        return;
      }

      resolve({
        lng: Number(result[0].x),
        lat: Number(result[0].y),
      });
    });
  });
}

export async function coordsToAddress(coords: { lat: number; lng: number }): Promise<Addresses> {
  const geocoder = new kakao.maps.services.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.coord2Address(coords.lng, coords.lat, (result, status) => {
      if (status !== kakao.maps.services.Status.OK) {
        reject(new Error("주소 검색 실패"));
        return;
      }

      resolve({
        address: result[0].address?.address_name ?? null,
        roadAddress: result[0].road_address?.address_name ?? null,
      });
    });
  });
}
