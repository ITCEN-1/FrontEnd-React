import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import Header from "../../components/layout/Header";
import DashBoardSideBar from "../../components/layout/DashBoardSideBar.tsx";
import { useEffect, useRef } from "react";
import { getSurveyAndRecommendedDong } from "../../services/dashboard.api.ts";
import { useFocusStore } from "../../store/mapfocus.store.ts";
import { useDashboardStore } from "../../store/dashboard.store.ts";
import type { Ranking } from "../../types/dashboard.types.ts";
import CustomMarker from "../../components/common/CustomMarker.tsx";

const DashBoardPage = () => {
  const { position } = useFocusStore();
  const { data } = useDashboardStore();
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
  //     const fetchData = async () => {
  //         try {
  //             const data = await getSurveyAndRecommendedDong(1);
  //             console.log(data);
  //         } catch (error) {
  //             console.error(error);
  //         }
  //     }

  //     fetchData();
  // }, [])

  return (
    <div>
      <Header />
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
          {rankings &&
            rankings.map((ranking: Ranking) => (
              <CustomOverlayMap
                key={ranking.dongCode}
                position={{ lat: ranking.latitude, lng: ranking.longitude }}
                yAnchor={1}
              >
                <CustomMarker rankPinImage="/rank-pin.svg" ranking={ranking} />
              </CustomOverlayMap>
            ))}
        </Map>
        <DashBoardSideBar />
      </section>
    </div>
  );
};

export default DashBoardPage;
