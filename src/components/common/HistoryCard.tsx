// @ts-ignore
import { Icon } from "../common/primitives.jsx";
import type { HistoryDTO } from "../../types/dashboard.types.js";
import { isWolse } from "../../utils/survey.util.js";
import { parsePriceToOutput } from "../../utils/price.util.js";

const LEVEL_TO_STRING = {
  HIGH: "상",
  MIDDLE: "중",
  LOW: "하",
};

function HistoryCard({ data, isFirst }: { data: HistoryDTO; isFirst: boolean }) {
  const { surveyDto, rankings } = data;

  return (
    <div className={"bg-white rounded-(--r-lg) p-5 shadow-[var(--shadow-sm)]"}>
      <div className={"flex gap-4.5 items-center"}>
        <div
          className={
            "w-14 h-14 rounded-xl bg-(--dp-coral-50) text-(--primary) flex items-center justify-center flex-none"
          }
        >
          <Icon name={"map-pinned"}></Icon>
        </div>
        <div className={"flex-1"}>
          <div className={"flex gap-2 items-center mb-1"}>
            <span className={"text-[12px] text-(--fg-3) font-mono"}>{surveyDto.submittedAt}</span>
            {isFirst && (
              <span
                className={
                  "bg-(--bg-tint-success) text-(--dp-mint-700) inline-flex items-center gap-1 py-0.75 px-2.5 rounded-(--r-sm) text-[12px] font-bold"
                }
              >
                <span className={"bg-[#139e66] w-1.5 h-1.5 rounded-[50%]"}></span>최신
              </span>
            )}
          </div>
          <h3 className={"text-[16px] font-bold text-(--dp-navy-900)"}>
            1위 ·{" "}
            <span className={"text-(--primary)"}>
              {rankings[0].districtName} {rankings[0].dongName}
            </span>
          </h3>
          <p className={"text-[13px] text-(--fg-2) mt-1"}>
            지하철 {LEVEL_TO_STRING[surveyDto.preferenceSubway]}, 대형점포{" "}
            {LEVEL_TO_STRING[surveyDto.preferenceLargeStore]}, 병원 {LEVEL_TO_STRING[surveyDto.preferenceHospital]},
            도서관 {LEVEL_TO_STRING[surveyDto.preferenceLibrary]}
          </p>
          <p className={"text-[13px] text-(--fg-2) mt-1"}>
            {isWolse(surveyDto)
              ? `월세금: ${parsePriceToOutput(surveyDto.monthlyMin!)} ~ ${parsePriceToOutput(surveyDto.monthlyMax!)} / 보증금: ${parsePriceToOutput(surveyDto.depositMin!)} ~ ${parsePriceToOutput(surveyDto.depositMin!)}`
              : `전세금: ${parsePriceToOutput(surveyDto.jeonseMin!)} ~ ${parsePriceToOutput(surveyDto.jeonseMax!)}`}
          </p>
        </div>
        <div>
          <div className={"font-display text-[28px] font-semibold text-(--dp-navy-900)"}>
            {rankings.length}
            <small className={"text-[13px] font-semibold text-(--fg-2)"}>곳</small>
          </div>
          <div className={"text-[11px] text-(--fg-3) mt-0.5"}>추천동</div>
        </div>
        <button
          className={`${buttonStyle} bg-white text-[var(--fg-1)] border-[var(--border-2)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]`}
        >
          결과 다시 보기 →
        </button>
      </div>
    </div>
  );
}

const buttonStyle =
  "font-inherit text-[14px] font-semibold px-4 h-9 rounded-[var(--r-md)] border border-transparent cursor-pointer inline-flex items-center justify-center gap-[6px] transition-[background,color,border-color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-out)] whitespace-nowrap";

export default HistoryCard;
