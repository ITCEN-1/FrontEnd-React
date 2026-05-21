import LegalDongRanking from "../common/LegalDongRanking.tsx";

function DashBoardSideBar() {
  return (
    <aside className={"overflow-y-auto"}>
      <div className={"flex px-4 border-b border-(--border-1) z-2"}>
        <div
          className={
            "flex-1 py-3.5 px-1 text-[13px] text-center align- text-(--fg-2) font-semibold cursor-pointer border-b-2 border-solid border-b-transparent transition-all duration-120 ease-out"
          }
        >
          설문 요약
        </div>
        <div
          className={
            "flex-1 py-3.5 px-1 text-[13px] text-center align- text-(--fg-2) font-semibold cursor-pointer border-b-2 border-solid border-b-transparent transition-all duration-120 ease-out"
          }
        >
          Top 10 랭킹
        </div>
      </div>
      <div className={"flex flex-col p-4 gap-2.5"}>
        <div className={"flex justify-between align-baseline mt-1"}>
          <span className={"text-[12px] text-(--fg-2)"}>설문 기반 매칭 점수</span>
          {/*<span>실시간</span>*/}
        </div>
        {/*    여기에 컴포넌트 넣기*/}
        <LegalDongRanking />
      </div>
    </aside>
  );
}

export default DashBoardSideBar;
