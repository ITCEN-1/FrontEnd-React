function LegalDongRanking() {
  return (
    <div className={"flex flex-col p-4 gap-2.5"}>
      <div className={"flex justify-between align-baseline mt-1"}>
        <span className={"text-[12px] text-(--fg-2)"}>설문 기반 매칭 점수</span>
      </div>
      <div
        className={
          "flex rounded-(--r-lg) py-3 px-3.5 items-center gap-3 shadow-(--shadow-xs) border border-solid border-(--border-1) cursor-pointer transition-all duration-120 ease-out hover:border-(--dp-coral-200) hover:shadow-(--shadow-md)"
        }
      >
        <div
          className={
            "w-7 h-7 font-extrabold rounded-[50%] bg-(--primary) text-white flex items-center justify-center text-[13px]"
          }
        >
          1
        </div>
        <div className={"flex flex-1 flex-col"}>
          <b className={"font-display text-[17px] font-extrabold font-dp-navy-900 leading-[1.15]"}>서초구 방배동</b>
          {/*<span className={"text-[11.5px] text-(--fg-2)"}>매물 124건 · 지하철 5개 · 통근 18분</span>*/}
        </div>
        <span className={"text-right font-display text-[18px] font-800 text-(--primary)"}>96.2</span>
      </div>
    </div>
  );
}

export default LegalDongRanking;
