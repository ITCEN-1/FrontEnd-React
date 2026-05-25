import legalDong from "../assets/legal_dong.json" with { type: "json" };

export function findLegalDongCoordinates(legal_dong_code: number | string) {
  const { features } = legalDong as any;
  console.log(`Legal Dong_Code: ${legal_dong_code}`);
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
