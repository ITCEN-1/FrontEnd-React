import { useState } from "react";
import DistrictStep from "./DistrictStep";
import InfraStep from "./InfraStep";
import BudgetStep from "./BudgetStep";
import CommuteStep from "./CommuteStep";
import "../../../styles.css";

function SurveyWizard(){
    const [surveyStep,setSurveyStep] = useState<number>(1);
    const [districts,setDistricts] = useState<string[]>([])
    const canAdvanceDistrictStep = districts.length>0;

    const prev=()=>{
      if (surveyStep > 1) setSurveyStep(surveyStep - 1);
    };
    const next=()=>{
      if (!canAdvanceDistrictStep) return;
      if (surveyStep < 4) setSurveyStep(surveyStep + 1);
    };

    return(
        <div className={"dp-onboard-wrap" + (surveyStep === 1 ? " dp-onboard-wrap--wide" : "")}>
            <SurveyProgressBar step={surveyStep}></SurveyProgressBar>
            {surveyStep===1 && <DistrictStep districts={districts} setDistricts={setDistricts}/>}
            {surveyStep===2 && <InfraStep />}
            {surveyStep===3 && <BudgetStep />}
            {surveyStep===4 && <CommuteStep />}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
          <button className={"dp-btn"} onClick={prev}>{surveyStep === 1 ? "← 첫 화면" : "← 이전"}</button>
          <button className={"dp-btn dp-btn--primary"} onClick={next} disabled={!canAdvanceDistrictStep}>
            {surveyStep < 4 ? "다음 단계 →" : "추천 받기"}
          </button>
        </div>
        </div>
    );
}

function SurveyProgressBar({step}: {step: number}){
    const pct=((step)/4)*100;
    return(
    <div className="dp-progress">
      <div className="dp-progress__head">
        <h4>설문 진행 상황</h4>
        <b>{step} / 4 단계</b>
      </div>
      <div className="dp-progress__track">
        <div className="dp-progress__fill" style={{ width: `${pct}%` }}/>
      </div>
    </div>
    )
}

export default SurveyWizard;