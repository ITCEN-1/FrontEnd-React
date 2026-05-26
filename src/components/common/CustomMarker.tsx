import type { Ranking } from "../../types/dashboard.types";
import { useFocusStore, useHoverDongStore } from "../../store/mapfocus.store.ts";

function CustomMarker({ rankPinImage, ranking }: { rankPinImage: string; ranking: Ranking }) {
  const { position, setFocusPosition } = useFocusStore();
  const { hoverDongCode, setHoverDongCode, clearHoverDongCode } = useHoverDongStore();
  const isHovered = hoverDongCode === ranking.dongCode;

  return (
    <div
      className={`relative flex items-center justify-center w-10 h-12.5 cursor-pointer ${isHovered ? "scale-125 z-50" : "scale-100 z-10"}`}
      onClick={() => {
        setFocusPosition({
          latitude: ranking.latitude,
          longitude: ranking.longitude,
          dongCode: ranking.dongCode,
          level: 4,
        });
        setHoverDongCode(ranking.dongCode);
      }}
      onMouseEnter={() => {
        if (!position) {
          setHoverDongCode(ranking.dongCode);
        }
      }}
      onMouseLeave={() => {
        if (!position) {
          clearHoverDongCode();
        }
      }}
    >
      <img src={rankPinImage} alt="legal_dong" className="absolute top-0 left-0 w-full h-full" />
      <span className="relative z-10 text-(--primary) font-bold text-[14px] mb-2.5">{ranking.ranking}</span>
    </div>
  );
}

export default CustomMarker;
