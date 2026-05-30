import { Map } from "react-kakao-maps-sdk";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { coordsToAddress, searchCoords } from "../../../utils/map.util";
import type { Coords } from "../../../types/map.types";
import ToastBox from "../ToastBox";

const DEFAULT_WORKPLACE_LOCATION = { lat: 37.53609444, lng: 126.9675222 };

function CommuteStep() {
  const [workPlaceLocation, setWorkPlaceLocation] = useState<Coords>(DEFAULT_WORKPLACE_LOCATION);
  const [mapLevel, setMapLevel] = useState(9);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // input박스에 Enter입력 시 처리
  const handleSearchKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (!searchRef.current?.value.trim()) return;
    if (e.key === "Enter") {
      // 입력된 주소를 위도, 경도로 변환해주는 api 보내기
      try {
        const coords = await searchCoords(searchRef.current.value);
        const address = await coordsToAddress(coords);
        setWorkPlaceLocation(coords);
        setMapLevel(4);
        searchRef.current.value = address.address ? address.address : address.roadAddress!;
      } catch {
        console.log("검색 결과가 없습니다.");
        setIsToastVisible(true);
      }
    }
  };

  // kakao지도 drag 이벤트 핸들러
  const handleOnDragHandle = async (map: kakao.maps.Map) => {
    const center = map.getCenter();
    const lat = center.getLat();
    const lng = center.getLng();
    try {
      const address = await coordsToAddress({ lat, lng });
      searchRef.current!.value = address.address ? address.address : address.roadAddress!;
    } catch {
      console.log("주소 변환 실패");
    }
    setWorkPlaceLocation({ lat, lng });
  };

  return (
    <>
      {isToastVisible && <ToastBox message={"주소를 정확히 입력해주세요"} time={2000} setVisible={setIsToastVisible} />}
      <div className="dp-card" style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--dp-navy-900)" }}>직장은 어디인가요?</h2>
          <p style={{ marginTop: "6px", fontSize: "13px", color: "var(--fg-2)" }}></p>
        </div>
        <div className="dp-field">
          <div style={{ display: "flex", gap: "6px" }}>
            <span className="dp-label">직장 주소 또는 지하철역</span>
            <span className="dp-hint">(예: 강남역, 광화문, 판교 테크노밸리)</span>
          </div>
          <input
            className="dp-input"
            placeholder="(선택) 직장 위치를 입력해주세요"
            ref={searchRef}
            onKeyDown={handleSearchKeyDown}
          />
          <div style={{ position: "relative", width: "100%", height: "420px" }}>
            <Map
              center={workPlaceLocation}
              level={mapLevel}
              style={{ width: "100%", height: "100%" }}
              onIdle={handleOnDragHandle}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -100%)",
                zIndex: 10,
                pointerEvents: "none",
                width: "40px",
                height: "50px",
                fontSize: 0,
              }}
            >
              <img src="/workplace-pin.svg" alt="" style={{ display: "block", width: "70%", height: "70%" }} />
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "20px",
            padding: "12px 14px",
            background: "var(--bg-tint-info)",
            borderRadius: "8px",
            fontSize: "12.5px",
            color: "var(--dp-navy-700)",
          }}
        >
          ⓘ 대중교통 기준 소요 시간을 점수에 반영해요. <b>목적지가 없다면 점수에 반영되지 않습니다.</b>
        </div>
      </div>
    </>
  );
}

export default CommuteStep;
