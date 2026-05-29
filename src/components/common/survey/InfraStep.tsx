import type { Dispatch, SetStateAction } from "react";
import type {PreferenceLevel } from "../../../types/dashboard.types";

interface InfraStepProps {
    infraProps: {
        preferenceLargeStore: PreferenceLevel;
        setPreferenceLargeStore: Dispatch<SetStateAction<PreferenceLevel>>;
        preferenceHospital: PreferenceLevel;
        setPreferenceHospital: Dispatch<SetStateAction<PreferenceLevel>>;
        preferenceSubway: PreferenceLevel;
        setPreferenceSubway: Dispatch<SetStateAction<PreferenceLevel>>;
        preferenceLibrary: PreferenceLevel;
        setPreferenceLibrary: Dispatch<SetStateAction<PreferenceLevel>>;
    };
}

function InfraStep({ infraProps }: InfraStepProps){

    return(
        <div className={"dp-card"}>
            <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--dp-navy-900)" }}>인프라, 무엇이 중요한가요?</h2>
                <p style={{ marginTop: 6, fontSize: 13, color: "var(--fg-2)" }}>네 가지 항목의 중요도를 알려주세요. 가중치로 반영돼요.</p>
            </div>
            <Train preferenceSubway={infraProps.preferenceSubway} setPreferenceSubway={infraProps.setPreferenceSubway} />
            <LargeStore preferenceLargeStore={infraProps.preferenceLargeStore} setPreferenceLargeStore={infraProps.setPreferenceLargeStore}/>
            <Library preferenceLibrary={infraProps.preferenceLibrary} setPreferenceLibrary={infraProps.setPreferenceLibrary}/>
            <Hospital preferenceHospital={infraProps.preferenceHospital} setPreferenceHospital={infraProps.setPreferenceHospital}/>
        </div>
    )
}

function Train({preferenceSubway,setPreferenceSubway}){
    return(
        <div className="dp-likert">
            <div className="dp-likert__icon"><Icon svg={trainsvg} size={20}/></div>
            <div className="dp-likert__label"><b>지하철</b><span>역까지의 거리</span></div>
            <div className="dp-likert__opts">
                <button className={"dp-likert__opt" + (preferenceSubway === "LOW" ? " dp-likert__opt--selected" : "") } onClick={()=>setPreferenceSubway("LOW")} >하</button>
                <button className={"dp-likert__opt" + (preferenceSubway === "MIDDLE" ? " dp-likert__opt--selected" : "")} onClick={()=>setPreferenceSubway("MIDDLE")}>중</button>
                <button className={"dp-likert__opt" + (preferenceSubway === "HIGH" ? " dp-likert__opt--selected" : "")} onClick={()=>setPreferenceSubway("HIGH")}>상</button>
            </div>
        </div>
    )
}

function LargeStore({preferenceLargeStore,setPreferenceLargeStore}){
    return(
        <div className="dp-likert">
            <div className="dp-likert__icon"><Icon svg={shoppingsvg} size={20}/></div>
            <div className="dp-likert__label"><b>대형점포</b><span>마트 · 쇼핑몰 · 백화점</span></div>
            <div className="dp-likert__opts">
                <button className={"dp-likert__opt" + (preferenceLargeStore === "LOW" ? " dp-likert__opt--selected" : "") } onClick={()=>setPreferenceLargeStore("LOW")} >하</button>
                <button className={"dp-likert__opt" + (preferenceLargeStore === "MIDDLE" ? " dp-likert__opt--selected" : "")} onClick={()=>setPreferenceLargeStore("MIDDLE")}>중</button>
                <button className={"dp-likert__opt" + (preferenceLargeStore === "HIGH" ? " dp-likert__opt--selected" : "")} onClick={()=>setPreferenceLargeStore("HIGH")}>상</button>
            </div>
        </div>
    )
}

function Library({preferenceLibrary,setPreferenceLibrary}){
    return(
        <div className="dp-likert">
            <div className="dp-likert__icon"><Icon svg={librarysvg} size={20}/></div>
            <div className="dp-likert__label"><b>도서관</b><span>공공도서관 접근성</span></div>
            <div className="dp-likert__opts">
                <button className={"dp-likert__opt" + (preferenceLibrary === "LOW" ? " dp-likert__opt--selected" : "") } onClick={()=>setPreferenceLibrary("LOW")} >하</button>
                <button className={"dp-likert__opt" + (preferenceLibrary === "MIDDLE" ? " dp-likert__opt--selected" : "")} onClick={()=>setPreferenceLibrary("MIDDLE")}>중</button>
                <button className={"dp-likert__opt" + (preferenceLibrary === "HIGH" ? " dp-likert__opt--selected" : "")} onClick={()=>setPreferenceLibrary("HIGH")}>상</button>
            </div>
        </div>
    )
}

function Hospital({preferenceHospital,setPreferenceHospital}){
    return(
        <div className="dp-likert">
            <div className="dp-likert__icon"><Icon svg={hospitalsvg} size={20}/></div>
            <div className="dp-likert__label"><b>병원</b><span>종합·전문 진료시설</span></div>
            <div className="dp-likert__opts">
                <button className={"dp-likert__opt" + (preferenceHospital === "LOW" ? " dp-likert__opt--selected" : "") } onClick={()=>setPreferenceHospital("LOW")} >하</button>
                <button className={"dp-likert__opt" + (preferenceHospital === "MIDDLE" ? " dp-likert__opt--selected" : "")} onClick={()=>setPreferenceHospital("MIDDLE")}>중</button>
                <button className={"dp-likert__opt" + (preferenceHospital === "HIGH" ? " dp-likert__opt--selected" : "")} onClick={()=>setPreferenceHospital("HIGH")}>상</button>
            </div>
        </div>
    )
}

const trainsvg: string='<rect x="6" y="3" width="12" height="15" rx="2"/><path d="M6 11h12"/><circle cx="9" cy="14.5" r=".6" fill="currentColor"/><circle cx="15" cy="14.5" r=".6" fill="currentColor"/><path d="M8 19l-3 2"/><path d="M16 19l3 2"/>';
const shoppingsvg: string='<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>';
const librarysvg: string='<rect x="3" y="6" width="4" height="16" rx="1"/><rect x="9" y="2" width="4" height="20" rx="1"/><path d="M18.5 8.5l3 8-5 2-3-8z"/>';
const hospitalsvg: string='<rect x="2" y="4" width="20" height="18" rx="2"/><path d="M2 8h20"/><path d="M12 11v6"/><path d="M9 14h6"/>';

function Icon({ svg, size = 18}:{svg:string,size:number}) {
  const inner = svg || "";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         style={{ display: "inline-block", verticalAlign: "middle", flex: "none"}}
         dangerouslySetInnerHTML={{ __html: inner }}/>
  );
}

export default InfraStep;