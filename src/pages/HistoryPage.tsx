//@ts-ignore
import { Icon } from "../components/common/primitives.jsx";
import HistoryCard from "../components/common/HistoryCard.js";
import { getHistories } from "../services/history.api.js";
import { useEffect, useState } from "react";
import type { HistoryDTO } from "../types/dashboard.types.js";

function HistoryPage() {
  const [histories, setHistories] = useState<HistoryDTO[]>();

  useEffect(() => {
    async function fetchHistories() {
      try {
        const response = await getHistories();

        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    fetchHistories()
      .then((response) => response.data.content)
      .then((contents) => {
        setHistories(contents);
      });
  }, []);

  return (
    <div className="p-8">
      <header className="flex justify-between items-end mb-6">
        <div>
          <h1 className={"text-h1 font-semibold text-[30px] tracking-tighter"}>설문 히스토리</h1>
          <p className={"text-(--fg-2) mt-1 text-[14px]"}>지금까지 진행한 설문과 추천 결과를 다시 볼 수 있어요.</p>
        </div>
        <button className={`${buttonStyle} bg-(--primary) text-white`}>
          <Icon name={"plus"} /> 새 설문 시작
        </button>
      </header>
      <div className={"flex flex-col gap-3"}>
        {histories &&
          histories.map((history, idx) => {
            console.log(history);
            return <HistoryCard key={history.surveyDto.surveyId} data={history} isFirst={idx === 0} />;
          })}
      </div>
    </div>
  );
}

const buttonStyle =
  "text-[14px] font-semibold py-0 px-4 h-9 rounded-(--r-md) border border-solid cursor-pointer inline-flex items-center justify-center gap-1.5 transition-[background,color,border-color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-out)] whitespace-nowrap";

export default HistoryPage;
