import { CustomOverlayMap, Map, MapMarker, MarkerClusterer, Polygon } from "react-kakao-maps-sdk";
import DashBoardSideBar from "../components/layout/DashBoardSideBar.tsx";
import { useEffect, useRef, useState } from "react";
import { useFocusStore, useHoverDongStore } from "../store/mapfocus.store.ts";
import { useDashboardStore, useInfraLocationStore } from "../store/dashboard.store.ts";
import type { Ranking, InfraItemResponse, InfraType } from "../types/dashboard.types.ts";
import CustomMarker from "../components/common/CustomMarker.tsx";
import { findLegalDongCoordinates } from "../utils/map.util.ts";
import WorkplaceMarker from "../components/common/WorkplaceMarker.tsx";
import React from "react";
import { isNumericString } from "../utils/map.util.ts";

const infraTypeLabels: Record<InfraType, string> = {
  SUBWAY: "지하철",
  HOSPITAL: "병원",
  LIBRARY: "도서관",
  LARGE_STORE: "대형마트",
};

const getInfraMarkerKey = (item: InfraItemResponse, idx: number) =>
  `${item.id}-${item.latitude}-${item.longitude}-${idx}`;

const DashBoardPage = () => {
  const { position } = useFocusStore();
  const { data } = useDashboardStore();
  const { hoverDongCode, setHoverDongCode, clearHoverDongCode } = useHoverDongStore();
  const rankings = data?.rankings;
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const { infraLocationInfo } = useInfraLocationStore();
  const items = infraLocationInfo?.items ?? [];
  const [selectedInfraKey, setSelectedInfraKey] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!position) return;

    const map = mapRef.current;
    const latlng = new kakao.maps.LatLng(position.latitude, position.longitude);

    map.setCenter(latlng);
    map.setLevel(position.level);
  }, [position]);

  return (
    <div>
      <section className={"grid grid-cols-[1fr_var(--dp-sidebar-w,400px)] h-[calc(100vh-64px)]"}>
        <Map
          center={{ lat: 37.53609444, lng: 126.9675222 }}
          level={9}
          isPanto={true}
          className={"w-full h-full"}
          onCreate={(map) => {
            mapRef.current = map;
          }}
        >
          {data && data.surveyDto.workPlaceAddress && (
            <WorkplaceMarker workPlaceAddress={data.surveyDto.workPlaceAddress} />
          )}

          {rankings &&
            rankings.map((ranking: Ranking) => {
              const isHovered = ranking.dongCode === hoverDongCode;

              return (
                <React.Fragment key={ranking.dongCode}>
                  <CustomOverlayMap position={{ lat: ranking.latitude, lng: ranking.longitude }} yAnchor={1}>
                    <CustomMarker rankPinImage="/rank-pin.svg" ranking={ranking} />
                  </CustomOverlayMap>

                  {findLegalDongCoordinates(ranking.dongCode).map((path: any, pIdx: number) => (
                    <Polygon
                      key={`poly-${ranking.dongCode}-${pIdx}`}
                      path={path}
                      strokeWeight={isHovered ? 4 : 2}
                      strokeColor={"#ff6b4a"}
                      strokeOpacity={0.4}
                      strokeStyle={"solid"}
                      fillColor={isHovered ? "#ff6b4a" : "#fff1ed"}
                      fillOpacity={0.2}
                      onMouseover={() => {
                        if (!position) {
                          setHoverDongCode(ranking.dongCode);
                        }
                      }}
                      onMouseout={() => {
                        if (!position) {
                          clearHoverDongCode();
                        }
                      }}
                    />
                  ))}
                </React.Fragment>
              );
            })}

          {infraLocationInfo && items.length > 0 && (
            <MarkerClusterer averageCenter={true} minLevel={3}>
              {items.map((item: InfraItemResponse, idx: number) => (
                <MapMarker
                  key={getInfraMarkerKey(item, idx)}
                  position={{ lat: item.latitude, lng: item.longitude }}
                  title={item.name}
                  onClick={() => {
                    setSelectedInfraKey(getInfraMarkerKey(item, idx));
                  }}
                  image={{
                    src: `/poi-${infraLocationInfo.type.toLowerCase()}.svg`,
                    size: { width: 40, height: 40 },
                    options: {
                      offset: { x: 20, y: 40 },
                    },
                  }}
                >
                  {selectedInfraKey === getInfraMarkerKey(item, idx) && (
                    <div className="min-w-[150px] max-w-[220px] rounded-[8px] border border-[#f0d8cf] bg-white px-3 py-2 text-left shadow-[0_8px_24px_rgba(42,32,28,0.16)]">
                      <div className="flex items-start justify-between gap-2">
                        <span className="rounded-full bg-[#fff1ed] px-2 py-0.5 text-[11px] font-semibold text-[#ff6b4a]">
                          {infraTypeLabels[infraLocationInfo.type]}
                        </span>
                        <button
                          type="button"
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[14px] leading-none text-[#8a756d] hover:bg-[#f6eee9]"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedInfraKey(null);
                          }}
                          aria-label="인프라 정보 닫기"
                        >
                          ×
                        </button>
                      </div>
                      <strong className="mt-1.5 block text-[13px] font-semibold leading-snug text-[#2f2825]">
                        {item.name}
                      </strong>
                      {item.line && (
                        <span className="mt-1 block text-[11px] leading-tight text-[#8a756d]">
                          {isNumericString(item.line) ? `${item.line}호선` : item.line}
                        </span>
                      )}
                    </div>
                  )}
                </MapMarker>
              ))}
            </MarkerClusterer>
          )}
        </Map>
        <DashBoardSideBar />
      </section>
    </div>
  );
};

export default DashBoardPage;
