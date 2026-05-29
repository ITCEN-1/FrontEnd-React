//@ts-ignore
import { Icon } from "../components/common/primitives.jsx";
import { Suspense } from "react";
import Loading from "../components/common/Loading.js";
import HistoryList from "../components/common/HistoryList.js";

function HistoryPage() {
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
      <Suspense fallback={<Loading />}>
        <HistoryList />
      </Suspense>
    </div>
  );
}

const buttonStyle =
  "text-[14px] font-semibold py-0 px-4 h-9 rounded-(--r-md) border border-solid cursor-pointer inline-flex items-center justify-center gap-1.5 transition-[background,color,border-color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-out)] whitespace-nowrap";

export default HistoryPage;
