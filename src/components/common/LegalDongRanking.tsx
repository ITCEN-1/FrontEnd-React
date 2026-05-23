import { useDashboardStore } from "../../store/dashboard.store.ts";
import type { Ranking } from "../../types/dashboard.types.ts";
import { parseMinuteToHourTime } from "../../utils/time.util.ts";

function LegalDongRanking() {
  const { data } = useDashboardStore();
  const rankings = data?.rankings ?? [];

  return (
    <div className={"flex flex-col p-4 gap-2.5"}>
      <div className={"flex justify-between align-baseline mt-1"}>
        <span className={"text-[12px] text-(--fg-2)"}>설문 기반 매칭 점수</span>
      </div>
      {rankings ? (
        rankings.map((ranking: Ranking) => (
          <div
            className={
              "flex rounded-(--r-lg) py-3 px-3.5 items-center gap-3 shadow-(--shadow-xs) border border-solid border-(--border-1) cursor-pointer transition-all duration-120 ease-out hover:border-(--dp-coral-200) hover:shadow-(--shadow-md)"
            }
          >
            <div
              className={`w-7 h-7 font-extrabold rounded-[50%] flex items-center justify-center text-[13px] ${rankingColorStyle(ranking.ranking)}`}
            >
              {ranking.ranking}
            </div>
            <div className={"flex flex-1 flex-col"}>
              <b className={"font-display text-[17px] font-extrabold font-dp-navy-900 leading-[1.15]"}>
                {ranking.districtName} {ranking.dongName}
              </b>
            </div>
            <div className={"flex flex-col"}>
              <span className={"text-[11.5px] text-(--fg-2) text-right"}>통근 시간</span>
              <span className={"text-right font-display text-[18px] font-800 text-(--primary)"}>
                {parseMinuteToHourTime(ranking.commuteTime)}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div>없음..</div>
      )}
    </div>
  );
}

function rankingColorStyle(ranking: number) {
  if (ranking === 1) {
    return "bg-(--primary) text-white ";
  }
  if (ranking === 2) {
    return "bg-(--dp-coral-400) text-white ";
  }
  if (ranking === 3) {
    return "bg-(--dp-coral-300) text-white ";
  }
  return "bg-(--dp-gray-150) text-(--fg-2)";
}

export default LegalDongRanking;
