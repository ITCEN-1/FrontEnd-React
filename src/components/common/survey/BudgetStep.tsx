import { useState, type Dispatch, type SetStateAction } from "react";

interface budgetStepProps {
    budgetProps:{
        jeonse: number[];
        setJeonse: Dispatch<SetStateAction<number[]>>;
        wolseDep: number[];
        setWolseDep: Dispatch<SetStateAction<number[]>>;
        wolseMon: number[];
        setWolseMon: Dispatch<SetStateAction<number[]>>;
    }
}

function BudgetStep(budgetProps: budgetStepProps){

    const [rentType,setRentType]=useState<string>("jeonse");

    return(
        <div className={"dp-card"}>
            <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--dp-navy-900)" }}>예산은 어느 정도인가요?</h2>
                <p style={{ marginTop: 6, fontSize: 13, color: "var(--fg-2)" }}>전세 또는 월세 중 하나를 골라 슬라이더로 범위를 정해 주세요.</p>
            </div>
            <div style={{ display: "flex", gap: 8, margin: "8px 0 24px" }}>
                <button className={"dp-pill" + (rentType === "jeonse" ? " dp-pill--active" : "")} onClick={() => setRentType("jeonse")}>
                    <span className={"dp-tag"}>전세</span>
                </button>;
                <span className={"dp-tag"} data-active={rentType === "jeonse"} onClick={() => setRentType("jeonse")}>전세</span>
                <span className={"dp-tag"} data-active={rentType === "wolse"} onClick={() => setRentType("jeonse")}>월세</span>
            </div>
        </div>

    )
}

export default BudgetStep;