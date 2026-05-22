import LegalDongRanking from "../common/LegalDongRanking.tsx";
import { useState } from "react";
import SurveySummary from "../common/SurveySummary.tsx";

function DashBoardSideBar() {
  const [selectedTab, setSelectedTab] = useState<"SURVEY_SUMMARY" | "TOP_10_RANKING">("SURVEY_SUMMARY");

  return (
    <aside className={"overflow-y-auto"}>
      <div className={"flex px-4 border-b border-(--border-1) z-2"}>
        <div
          className={`flex-1 py-3.5 px-1 text-[13px] text-center align- text-(--fg-2) font-semibold cursor-pointer border-b-2 border-solid transition-all duration-120 ease-out ${selectedTab === "SURVEY_SUMMARY" ? "text-(--primary) border-b-[--primary]" : "border-b-transparent"}`}
          onClick={() => setSelectedTab("SURVEY_SUMMARY")}
        >
          설문 요약
        </div>
        <div
          className={`flex-1 py-3.5 px-1 text-[13px] text-center align- text-(--fg-2) font-semibold cursor-pointer border-b-2 border-solid transition-all duration-120 ease-out ${selectedTab === "TOP_10_RANKING" ? "text-(--primary) border-b-[--primary]" : "border-b-transparent"}`}
          onClick={() => setSelectedTab("TOP_10_RANKING")}
        >
          Top 10 랭킹
        </div>
      </div>
      {selectedTab === "TOP_10_RANKING" && <LegalDongRanking />}
      {selectedTab === "SURVEY_SUMMARY" && <SurveySummary />}
    </aside>
  );
}

export default DashBoardSideBar;
