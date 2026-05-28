import { useState } from "react";
import DistrictStep from "./DistrictStep";
import InfraStep from "./InfraStep";
import BudgetStep from "./BudgetStep";
import CommuteStep from "./CommuteStep";
import "../../../styles.css";

function SurveyWizard(){
    const [surveyStep,setSurveyStep] = useState<number>(1);
    const [districts,setDistricts] = useState<string[]>([])

    return(
        <div className={"dp-onboard-wrap" + (surveyStep === 1 ? " dp-onboard-wrap--wide" : "")}>
            <SurveyProgressBar step={surveyStep}></SurveyProgressBar>
            {surveyStep===1 && <DistrictStep districts={districts} setDistricts={setDistricts}/>}
            {surveyStep===2 && <InfraStep />}
            {surveyStep===3 && <BudgetStep />}
            {surveyStep===4 && <CommuteStep />}
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