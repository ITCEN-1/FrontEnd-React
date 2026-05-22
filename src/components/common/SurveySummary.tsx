import { Icon } from "./primitives.jsx";

function SurveySummary() {
  return (
    <div className={"p-4 flex flex-col gap-2.5"}>
      <div className={"border border-solid border-(--border-1) bg-white p-5 rounded-(--r-lg) w-full"}>
        <h4 className={"text-[13px] font-bold text-(--dp-navy-900) mb-3"}>인프라 선호도</h4>
        <div className={"grid gap-2.5"}>
          <div className={"flex items-center gap-2.5"}>
            <span className={"w-7 h-7 rounded-lg bg-(--dp-coral-50) text-(--primary) flex items-center justify-center"}>
              <Icon name={"train-front"} size={"16"} />
            </span>
            <span className={"flex flex-1 text-[13px] text-(--fg-1)"}>지하철</span>
            <span className={"text-[12px] font-bold py-0.5 px-2.5 rounded-[50%] bg-(--dp-coral-50) text-(--primary)"}>
              상
            </span>
          </div>
          <div className={"flex items-center gap-2.5"}>
            <span className={"w-7 h-7 rounded-lg bg-(--dp-coral-50) text-(--primary) flex items-center justify-center"}>
              <Icon name={"shopping-bag"} size={"16"} />
            </span>
            <span className={"flex flex-1 text-[13px] text-(--fg-1)"}>대형점포</span>
            <span className={"text-[12px] font-bold py-0.5 px-2.5 rounded-[50%] bg-(--dp-coral-50) text-(--primary)"}>
              상
            </span>
          </div>
          <div className={"flex items-center gap-2.5"}>
            <span className={"w-7 h-7 rounded-lg bg-(--dp-coral-50) text-(--primary) flex items-center justify-center"}>
              <Icon name={"library-big"} size={"16"} />
            </span>
            <span className={"flex flex-1 text-[13px] text-(--fg-1)"}>도서관</span>
            <span className={"text-[12px] font-bold py-0.5 px-2.5 rounded-[50%] bg-(--dp-coral-50) text-(--primary)"}>
              상
            </span>
          </div>
          <div className={"flex items-center gap-2.5"}>
            <span className={"w-7 h-7 rounded-lg bg-(--dp-coral-50) text-(--primary) flex items-center justify-center"}>
              <Icon name={"hospital"} size={"16"} />
            </span>
            <span className={"flex flex-1 text-[13px] text-(--fg-1)"}>병원</span>
            <span className={"text-[12px] font-bold py-0.5 px-2.5 rounded-[50%] bg-(--dp-coral-50) text-(--primary)"}>
              상
            </span>
          </div>
        </div>
      </div>
      <div className={"border border-solid border-(--border-1) bg-white p-5 rounded-(--r-lg) w-full"}>
        <h4 className={"text-[13px] font-bold text-(--dp-navy-900) mb-3"}>예산·전세</h4>
        <div className={"flex items-baseline gap-1.5"}>
          <span className={"font-display text-[22px] font-bold text-(--dp-navy-900)"}>2억</span>
          <span className={"text-(--fg-3)"}>~</span>
          <span className={"font-display text-[22px] font-bold text-(--dp-navy-900)"}>6억</span>
        </div>
        <div className={"text-[12px] text-(--fg-2) mt-1"}>전세 보증금 범위</div>
      </div>
      <div className={"border border-solid border-(--border-1) bg-white p-5 rounded-(--r-lg) w-full"}>
        <h4 className={"text-[13px] font-bold text-(--dp-navy-900) mb-3"}>직장 위치</h4>
        <div className={"flex items-center gap-2"}>
          <Icon name={"briefcase"} size={16}></Icon>
          <span className={"text-[14px] text-(--fg-1) font-semibold"}>강남역</span>
        </div>
        <div className={"text-[12px] text-(--fg-2) mt-1.5"}>대중교통 기준 통근 소요 시간을 점수에 반영합니다.</div>
      </div>
      <button className="text-[14px] font-semibold inline-flex cursor-pointer items-center justify-center gap-1.5 border border-solid border-color py-0 px-4 h-9 w-full rounded-(--r-md) bg-white text-(--fg-1) border-(--border-2) shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <Icon name={"refresh-cw"} size={16}></Icon>
        설문 다시 하기
      </button>
    </div>
  );
}

export default SurveySummary;
