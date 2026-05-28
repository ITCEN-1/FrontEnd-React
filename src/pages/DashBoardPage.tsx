import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import DashBoardSideBar from "../components/layout/DashBoardSideBar.tsx";
import { useEffect, useRef } from "react";
import { getSurveyAndRecommendedDong } from "../services/dashboard.api.ts";
import { useFocusStore, useHoverDongStore } from "../store/mapfocus.store.ts";
import { useDashboardStore } from "../store/dashboard.store.ts";
import type { HistoryDTO, Ranking } from "../types/dashboard.types.ts";
import CustomMarker from "../components/common/CustomMarker.tsx";
import { Polygon } from "react-kakao-maps-sdk";
import { findLegalDongCoordinates } from "../utils/map.util.ts";
import WorkplaceMarker from "../components/common/WorkplaceMarker.tsx";
import React from "react";

const DashBoardPage = () => {
  const { position } = useFocusStore();
  const { data } = useDashboardStore();
  const { hoverDongCode, setHoverDongCode, clearHoverDongCode } = useHoverDongStore();
  const rankings = data?.rankings;
  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!position) return;

    const map = mapRef.current;

    const latlng = new kakao.maps.LatLng(position.latitude, position.longitude);

    map.setCenter(latlng);
    map.setLevel(position.level);
  }, [position]);

  // useEffect(() => {
  //   const fetchData = async (): Promise<BaseResponse<HistoryDTO>> => {
  //     try {
  //       const surveyData = await getSurveyAndRecommendedDong(data?.surveyDto.surveyId ?? 8);
  //       // console.log(surveyData);
  //       return surveyData;
  //     } catch (error) {
  //       console.error(error);
  //       throw error;
  //     }
  //   };

  //   fetchData()
  //     .then((response) => {
  //       return response.content;
  //     })
  //     .then((content) => {
  //       useDashboardStore.setState({ data: content });
  //     });
  // }, []);

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
                  {/* 법정동 마커 */}
                  <CustomOverlayMap position={{ lat: ranking.latitude, lng: ranking.longitude }} yAnchor={1}>
                    <CustomMarker rankPinImage="/rank-pin.svg" ranking={ranking} />
                  </CustomOverlayMap>
                  {/* 법정동 영역 표시 */}
                  {findLegalDongCoordinates(ranking.dongCode).map((path: any) => (
                    <Polygon
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
        </Map>
        <DashBoardSideBar />
      </section>
    </div>
  );
};

export default DashBoardPage;
