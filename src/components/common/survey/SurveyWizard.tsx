import { useState } from "react";
import DistrictStep from "./DistrictStep";
import InfraStep from "./InfraStep";
import BudgetStep from "./BudgetStep";
import CommuteStep from "./CommuteStep";
import "../../../styles.css";
import useSurveyRequestStore from "../../../store/request.store";
import type { PreferenceLevel } from "../../../types/dashboard.types";

function SurveyWizard(){
    const [surveyStep,setSurveyStep] = useState<number>(1);
    const [districts,setDistricts] = useState<string[]>([])
    const [preferenceLargeStore,setPreferenceLargeStore] = useState<PreferenceLevel>("LOW");
    const [preferenceHospital,setPreferenceHospital] = useState<PreferenceLevel>("LOW");
    const [preferenceSubway,setPreferenceSubway] = useState<PreferenceLevel>("LOW");
    const [preferenceLibrary,setPreferenceLibrary] = useState<PreferenceLevel>("LOW");
    const [jeonse, setJeonse] = useState<number[]|null>([0, 100000]);          // 만원 단위, 0~100000 (10억)
    const [wolseDep, setWolseDep] = useState<number[]|null>(null);        // 보증금, 0~20000 (2억)
    const [wolseMon, setWolseMon] = useState<number[]|null>(null);             // 월세, 0~150

  const canAdvanceDistrictStep = districts.length > 0;
  // const { request,setRequest } = useSurveyRequestStore();

  const prev = () => {
    if (surveyStep > 1) setSurveyStep(surveyStep - 1);
  };
  const next = () => {
    if (!canAdvanceDistrictStep) return;
    if (surveyStep === 4) {
      //지금까지 state로 설문 저장 api 요청
    }
    if (surveyStep < 4) setSurveyStep(surveyStep + 1);
  };

  return (
    <div className={"dp-onboard-wrap" + (surveyStep === 1 || surveyStep === 4 ? " dp-onboard-wrap--wide" : "")}>
      <SurveyProgressBar step={surveyStep}></SurveyProgressBar>
      {surveyStep === 1 && <DistrictStep districts={districts} setDistricts={setDistricts} />}
      {surveyStep === 2 && (
        <InfraStep
          infraProps={{
            preferenceLargeStore,
            setPreferenceLargeStore,
            preferenceHospital,
            setPreferenceHospital,
            preferenceSubway,
            setPreferenceSubway,
            preferenceLibrary,
            setPreferenceLibrary,
          }}
        />
      )}
      {surveyStep === 3 && <BudgetStep />}
      {surveyStep === 4 && <CommuteStep />}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
        <button className={"dp-btn"} onClick={prev}>
          {surveyStep === 1 ? "← 첫 화면" : "← 이전"}
        </button>
        <button className={"dp-btn dp-btn--primary"} onClick={next} disabled={!canAdvanceDistrictStep}>
          {surveyStep < 4 ? "다음 단계 →" : "추천 받기"}
        </button>
      </div>
    </div>
  );
}

function SurveyProgressBar({ step }: { step: number }) {
  const pct = (step / 4) * 100;
  return (
    <div className="dp-progress">
      <div className="dp-progress__head">
        <h4>설문 진행 상황</h4>
        <b>{step} / 4 단계</b>
      </div>
      <div className="dp-progress__track">
        <div className="dp-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default SurveyWizard;
