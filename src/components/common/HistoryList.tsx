import { useState, useEffect } from "react";
import { getHistories } from "../../services/history.api";
import type { HistoryDTO } from "../../types/dashboard.types";
import HistoryCard from "./HistoryCard";
import Loading from "./Loading";

// const historyPromise = new Promise((resolve) => setTimeout(() => resolve("done"), 10000));

function HistoryList() {
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [histories, setHistories] = useState<HistoryDTO[]>();

  useEffect(() => {
    getHistories()
      .then((response) => setHistories(response.data.content))
      .finally(() => setIsLoaded(true));
  }, []);
  return isLoaded ? (
    <div className={"flex flex-col gap-3"}>
      {histories &&
        histories.map((history: HistoryDTO, idx: number) => {
          return <HistoryCard key={history.surveyDto.surveyId} data={history} isFirst={idx === 0} />;
        })}
    </div>
  ) : (
    <Loading />
  );
}

export default HistoryList;
