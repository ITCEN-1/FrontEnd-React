//@ts-ignore
import { Icon } from "./primitives.jsx";
import { useDashboardStore } from "../../store/dashboard.store.js";
import { parsePriceToOutput } from "../../utils/price.util.js";
import { PREFERENCE_LEVEL } from "../../utils/constants.js";
import { isWolse } from "../../utils/survey.util.js";

function SurveySummary() {
  const { data } = useDashboardStore();
  const survey = data?.surveyDto;
  let wolse: boolean = false;
  if (survey) {
    wolse = isWolse(survey);
  }

  return (
    <div className={"p-4 flex flex-col gap-2.5"}>
      {survey ? (
        <>
          {/* 인프라 영역 */}
          <div className={"border border-solid border-(--border-1) bg-white p-5 rounded-(--r-lg) w-full"}>
            <h4 className={"text-[13px] font-bold text-(--dp-navy-900) mb-3"}>인프라 선호도</h4>
            <div className={"grid gap-2.5"}>
              <div className={"flex items-center gap-2.5"}>
                <span
                  className={"w-7 h-7 rounded-lg bg-(--dp-coral-50) text-(--primary) flex items-center justify-center"}
                >
                  <Icon name={"train-front"} size={"16"} />
                </span>
                <span className={"flex flex-1 text-[13px] text-(--fg-1)"}>지하철</span>
                <span
                  className={"text-[12px] font-bold py-0.5 px-2.5 rounded-[50%] bg-(--dp-coral-50) text-(--primary)"}
                >
                  {PREFERENCE_LEVEL[survey.preferenceSubway]}
                </span>
              </div>
              <div className={"flex items-center gap-2.5"}>
                <span
                  className={"w-7 h-7 rounded-lg bg-(--dp-coral-50) text-(--primary) flex items-center justify-center"}
                >
                  <Icon name={"shopping-bag"} size={"16"} />
                </span>
                <span className={"flex flex-1 text-[13px] text-(--fg-1)"}>대형점포</span>
                <span
                  className={"text-[12px] font-bold py-0.5 px-2.5 rounded-[50%] bg-(--dp-coral-50) text-(--primary)"}
                >
                  {PREFERENCE_LEVEL[survey.preferenceLargeStore]}
                </span>
              </div>
              <div className={"flex items-center gap-2.5"}>
                <span
                  className={"w-7 h-7 rounded-lg bg-(--dp-coral-50) text-(--primary) flex items-center justify-center"}
                >
                  <Icon name={"library-big"} size={"16"} />
                </span>
                <span className={"flex flex-1 text-[13px] text-(--fg-1)"}>도서관</span>
                <span
                  className={"text-[12px] font-bold py-0.5 px-2.5 rounded-[50%] bg-(--dp-coral-50) text-(--primary)"}
                >
                  {PREFERENCE_LEVEL[survey.preferenceLibrary]}
                </span>
              </div>
              <div className={"flex items-center gap-2.5"}>
                <span
                  className={"w-7 h-7 rounded-lg bg-(--dp-coral-50) text-(--primary) flex items-center justify-center"}
                >
                  <Icon name={"hospital"} size={"16"} />
                </span>
                <span className={"flex flex-1 text-[13px] text-(--fg-1)"}>병원</span>
                <span
                  className={"text-[12px] font-bold py-0.5 px-2.5 rounded-[50%] bg-(--dp-coral-50) text-(--primary)"}
                >
                  {PREFERENCE_LEVEL[survey.preferenceHospital]}
                </span>
              </div>
            </div>
          </div>
          {/* 전 / 월세 표기 영역 */}
          <div className={"border border-solid border-(--border-1) bg-white p-5 rounded-(--r-lg) w-full"}>
            <h4 className={"text-[13px] font-bold text-(--dp-navy-900) mb-3"}>예산·{wolse ? "월세" : "전세"}</h4>
            <div className={"flex items-baseline gap-1.5"}>
              <span className={"font-display text-[22px] font-bold text-(--dp-navy-900)"}>
                {wolse ? parsePriceToOutput(survey?.depositMin ?? 0) : parsePriceToOutput(survey?.jeonseMin ?? 0)}
              </span>
              <span className={"text-(--fg-3)"}>~</span>
              <span className={"font-display text-[22px] font-bold text-(--dp-navy-900)"}>
                {wolse ? parsePriceToOutput(survey?.depositMax ?? 0) : parsePriceToOutput(survey?.jeonseMax ?? 0)}
              </span>
            </div>
            <div className={"text-[12px] text-(--fg-2) mt-1"}>{wolse ? "월세" : "전세"} 보증금 범위</div>
            {wolse && (
              <>
                <hr className={"my-2 border border-solid border-(--border-1)"}></hr>
                <div className={"flex items-baseline gap-1.5"}>
                  <span className={"font-display text-[22px] font-bold text-(--dp-navy-900)"}>
                    {parsePriceToOutput(survey.monthlyMin ?? 0)}
                  </span>
                  <span className={"text-(--fg-3)"}>~</span>
                  <span className={"font-display text-[22px] font-bold text-(--dp-navy-900)"}>
                    {parsePriceToOutput(survey.monthlyMax ?? 0)}
                  </span>
                </div>
                <div className={"text-[12px] text-(--fg-2) mt-1"}>월세금 범위</div>
              </>
            )}
          </div>
          {/* 직장 위치 영역 */}
          {survey && (
            <div className={"border border-solid border-(--border-1) bg-white p-5 rounded-(--r-lg) w-full"}>
              <h4 className={"text-[13px] font-bold text-(--dp-navy-900) mb-3"}>직장 위치</h4>
              <div className={"flex items-center gap-2"}>
                <Icon name={"briefcase"} size={16}></Icon>
                <span className={"text-[14px] text-(--fg-1) font-semibold"}>
                  {survey.workPlaceAddress ?? "목적지가 없습니다."}
                </span>
              </div>
              <div className={"text-[12px] text-(--fg-2) mt-1.5"}>
                대중교통 기준 통근 소요 시간을 점수에 반영합니다.
              </div>
            </div>
          )}
          <button className="text-[14px] font-semibold inline-flex cursor-pointer items-center justify-center gap-1.5 border border-solid border-color py-0 px-4 h-9 w-full rounded-(--r-md) bg-white text-(--fg-1) border-(--border-2) shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <Icon name={"refresh-cw"} size={16}></Icon>
            설문 다시 하기
          </button>
        </>
      ) : (
        <div>없음</div>
      )}
    </div>
  );
}

export default SurveySummary;
