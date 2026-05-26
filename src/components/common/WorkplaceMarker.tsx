import { useEffect, useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { getLatLngFromKeyword } from "../../services/dashboard.api";
//@ts-ignore
import { Icon } from "../common/primitives.jsx";

function WorkplaceMarker({ workPlaceAddress }: { workPlaceAddress: string }) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        if (!workPlaceAddress) return;

        const coords = await getLatLngFromKeyword(workPlaceAddress);
        setPosition(coords);
      } catch (error) {
        console.error("주소 변환 실패:", error);
      }
    };
    fetchCoordinates();
  }, []);

  if (!position) {
    return;
  }

  return (
    <CustomOverlayMap position={position} yAnchor={1}>
      <div className="relative flex items-center justify-center w-10 h-12.5 cursor-pointer">
        <img src="/workplace-pin.svg" alt="workplace" className="absolute top-0 left-0 w-full h-full" />
        <Icon
          name={"briefcase"}
          size={14}
          style={{
            position: "relative",
            zIndex: 10,
            color: "#2d70fc",
            fontWeight: "bold",
            fontSize: "14px",
            marginBottom: "0.625rem",
          }}
        />
      </div>
    </CustomOverlayMap>
  );
}

export default WorkplaceMarker;
