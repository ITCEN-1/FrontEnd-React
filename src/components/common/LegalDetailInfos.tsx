//@ts-ignore
import { Icon } from "./primitives.jsx";
import type { InfraType, Ranking } from "../../types/dashboard.types.js";
import { useFocusStore, useHoverDongStore } from "../../store/mapfocus.store.js";
import { useDashboardStore } from "../../store/dashboard.store.js";
import { parseMinuteToHourTime } from "../../utils/time.util.js";
import { parsePriceToOutput } from "../../utils/price.util.js";
import { isWolse } from "../../utils/survey.util.js";
// API연동 전 dummy데이터
import { dummyDongDetail } from "../../store/store.dummy.js";

const infra = {
  SUBWAY: {
    svgName: "train-front",
    label: "지하철",
  },
  LARGE_STORE: {
    svgName: "shopping-bag",
    label: "대형점포",
  },
  LIBRARY: {
    svgName: "library-big",
    label: "도서관",
  },
  HOSPITAL: {
    svgName: "hospital",
    label: "병원",
  },
};

function LegalDetailInfos() {
  const { position, clearFocusPosition } = useFocusStore();
  const { clearHoverDongCode } = useHoverDongStore();
  const { data } = useDashboardStore();
  const survey = data?.surveyDto;
  const wolse = survey ? isWolse(survey) : false;
  const dongInfo: Ranking = data?.rankings.find((ranking) => ranking.dongCode === position?.dongCode)!;

  return (
    <div className={"flex flex-col"}>
      <button
        className={
          "flex items-center gap-2 px-4.5 py-3.5 bg-white border-b border-(--border-1) text-[13px] font-semibold text-(--fg-2) cursor-pointer text-left w-full sticky top-0 z-2 transition-colors duration-(--dur-fast) ease-(--ease-out) hover:text-(--primary) hover:bg-(--dp-coral-50)"
        }
        onClick={() => {
          clearFocusPosition();
          clearHoverDongCode();
        }}
      >
        <span className={"text-[16px]"}>←</span>
        이전으로 돌아가기
      </button>
      <div className={"border-b border-(--border-1) px-5 pt-4.5 pb-4.5"}>
        <span
          className={
            "inline-flex items-center gap-1 py-0.75 px-2.5 rounded-(--r-sm) text-[12px] font-semibold bg-(--dp-coral-50) text-(--dp-coral-700)"
          }
        >
          추천 {dongInfo.ranking}위
        </span>
        <h2 className={"text-[26px] font-bold text-(--dp-navy-900) mt-2.5 mb-1 mx-0 font-display mb-2.5"}>
          {dongInfo.districtName} {dongInfo.dongName}
        </h2>
        <p className={"text-[13px] text-(--fg-2)>"}>
          직장까지 약 <b>{parseMinuteToHourTime(dongInfo.commuteTime)}</b> · 매물{" "}
          <b>{wolse ? dummyDongDetail.wolseCount : dummyDongDetail.jeonseCount}건</b>
        </p>
      </div>
      <div className={"pt-4 pb-8 px-5 flex flex-col gap-5.5"}>
        {/* 인프라 갯수 정보 */}
        <section>
          <h3 className={"text-[14px] font-semibold text-(--fg-1) mb-2.5"}>주변 인프라</h3>
          <div className={"grid grid-cols-2 gap-2"}>
            <InfraIcon infraType={"SUBWAY"} number={dummyDongDetail.subwayCount ?? 0} color={"blue"} />
            <InfraIcon infraType={"HOSPITAL"} number={dummyDongDetail.hospitalCount ?? 0} color={"red"} />
            <InfraIcon infraType={"LIBRARY"} number={dummyDongDetail.libraryCount ?? 0} color={"green"} />
            <InfraIcon infraType={"LARGE_STORE"} number={dummyDongDetail.largeStoreCount ?? 0} color={"orange"} />
          </div>
          <p className={"text-[11.5px] text-(--fg-3) mt-2"}>각 항목을 클릭하면 지도에 위치가 표시돼요.</p>
        </section>
        {/* 전/월세 매물 현황 */}
        <section>
          <h3 className={"text-[14px] font-semibold text-(--fg-1) mb-2.5"}>매물 현황</h3>
          <div className={"flex gap-2"}>
            <HousePriceInfo
              title={wolse ? "월세" : "전세"}
              depositMin={wolse ? (survey?.depositMin ?? -1) : (survey?.jeonseMin ?? -1)}
              depositMax={wolse ? (survey?.depositMax ?? -1) : (survey?.jeonseMax ?? -1)}
              monthlyMin={wolse ? (survey?.monthlyMin ?? -1) : undefined}
              monthlyMax={wolse ? (survey?.monthlyMax ?? -1) : undefined}
              number={wolse ? (dummyDongDetail.wolseCount ?? 0) : (dummyDongDetail.jeonseCount ?? 0)}
            />
          </div>
        </section>
        {/* 직장과의 통근 시간 */}
        <section>
          <h3 className={"text-[14px] font-semibold text-(--fg-1) mb-2.5"}>통근 시간</h3>
          <div className={"flex items-center gap-3.5 p-3.5 border border-(--border-1) rounded-(--r-lg)"}>
            <span
              className={
                "w-11 h-11 rounded-[12px] bg-(--bg-tint-info) text-(--dp-navy-700) flex items-center justify-center"
              }
            >
              <Icon name="clock" size={22} />
            </span>
            <div className={"flex flex-col flex-1"}>
              <p className={"font-display text-[28px] font-bold text-(--dp-navy-900) leading-none"}>
                {parseMinuteToHourTime(dongInfo.commuteTime)}
              </p>
              <span className={"text-[10px] text-(--fg-2) mt-1"}>
                <b>{survey?.workPlaceAddress}</b>까지
              </span>
            </div>
          </div>
        </section>
        {/* 게시판 이동 버튼 - 추후에 thymleaf 링크로 변경 필요// */}
        <a className="text-[14px] text-(--primary) font-semibold inline-flex cursor-pointer items-center justify-center gap-1.5 border border-solid border-color py-0 px-4 h-9 w-full rounded-(--r-md) bg-white border-(--dp-coral-200) shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-(--dp-coral-50)">
          <Icon name={"refresh-cw"} size={16}></Icon>
          방배동 게시판 보러가기
        </a>
      </div>
    </div>
  );
}

function InfraIcon({ infraType, number, color }: { infraType: InfraType; number: number; color: string }) {
  return (
    <div
      className={
        "flex items-center gap-2.5 py-2.5 px-3 bg-(--dp-gray-50) rounded-(--r-lg) cursor-pointer transition-all duration-[120ms] ease-out hover:bg-(--dp-coral-50)"
      }
    >
      <span className={"w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0"}>
        <Icon name={infra[infraType].svgName} size={18} style={{ color }} />
      </span>
      <div>
        <span className={"text-[12px] text-(--fg-2) block"}>{infra[infraType]!.label}</span>
        <span className={"text-[15px] font-semibold text-(--fg-1) font-display"}>{number}개</span>
      </div>
    </div>
  );
}

function HousePriceInfo({
  title,
  depositMin,
  depositMax,
  number,
  monthlyMin,
  monthlyMax,
}: {
  title: string;
  depositMin: number;
  depositMax: number;
  number: number;
  monthlyMin?: number;
  monthlyMax?: number;
}) {
  return (
    <div className={"flex gap-2 flex-1"}>
      <div className={"shadow-none border border-(--border-1) rounded-(--r-lg) bg-white p-3.5 flex-1"}>
        <p className={"text-[11px] text-(--fg-2) font-semibold"}>{title}</p>
        <p className={"font-display text-[24px] font-bold text-(--dp-navy-900) mt-0.5"}>
          {number}
          <small className={"text-[12px] font-semibold text-(--fg-2)"}>건</small>
        </p>
        <span className={"text-[11px] text-(--fg-3) mt-0.5"}>
          보증금 {parsePriceToOutput(depositMin)}~{parsePriceToOutput(depositMax)} /
        </span>
        {monthlyMin && monthlyMax && (
          <span className={"text-[11px] text-(--fg-3) mt-0.5"}>
            월세금 {parsePriceToOutput(monthlyMin)}~{parsePriceToOutput(monthlyMax)}
          </span>
        )}
      </div>
    </div>
  );
}

export default LegalDetailInfos;
