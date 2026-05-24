import type { Ranking } from "../../types/dashboard.types";
import { useFocusStore } from "../../store/mapfocus.store.ts";

function CustomMarker({ rankPinImage, ranking }: { rankPinImage: string; ranking: Ranking }) {
  const { setFocusPosition } = useFocusStore();
  return (
    <div
      className="relative flex items-center justify-center w-10 h-12.5 cursor-pointer"
      onClick={() =>
        setFocusPosition({
          latitude: ranking.latitude,
          longitude: ranking.longitude,
          dongCode: ranking.dongCode,
          level: 4,
        })
      }
    >
      <img src={rankPinImage} alt="pin" className="absolute top-0 left-0 w-full h-full" />
      <span className="relative z-10 text-(--primary) font-bold text-[14px] mb-2.5">{ranking.ranking}</span>
    </div>
  );
}

export default CustomMarker;
