import { useState, type Dispatch, type SetStateAction } from "react";

function formattingKoreanVal(n: number): string {
    if (n === 0) return n + "원";
    if (n < 10000) return n + "만원";
    if (n % 10000 === 0) return n / 10000 + "억";
    else return Math.floor(n / 10000) + "억 " + (n % 10000) + "만원";
}

interface BudgetStepProps {
    jeonse: number[] | null;
    setJeonse: Dispatch<SetStateAction<number[] | null>>;
    wolseDep: number[] | null;
    setWolseDep: Dispatch<SetStateAction<number[] | null>>;
    wolseMon: number[] | null;
    setWolseMon: Dispatch<SetStateAction<number[] | null>>;
}

function BudgetStep({ jeonse, setJeonse, wolseDep, setWolseDep, wolseMon, setWolseMon }: BudgetStepProps) {

    const [rentType, setRentType] = useState<string>("jeonseType");

    //(중요) 월세랑 전세 값을 같이 요청하면 안 되므로 다른 쪽 초기화
    const initJeonseSlider = () => {
        setRentType("jeonseType");
        //초기값 세팅
        setJeonse([0, 100000]);
        //다른쪽 초기화
        setWolseDep(null);
        setWolseMon(null);
    };

    const initWolseSlider = () => {
        setRentType("wolseType");
        //초기값 세팅
        setWolseDep([0, 20000]);
        setWolseMon([0, 150]);
        //다른쪽 초기화
        setJeonse(null);
    };

    return (
        <div className={"dp-card"}>
            <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--dp-navy-900)" }}>예산은 어느 정도인가요?</h2>
                <p style={{ marginTop: 6, fontSize: 13, color: "var(--fg-2)" }}>전세 또는 월세 중 하나를 골라 슬라이더로 범위를 정해 주세요.</p>
            </div>
            <div style={{ display: "flex", gap: 8, margin: "8px 0 24px" }}>
                <button className={"dp-pill" + (rentType === "jeonseType" ? " dp-pill--active" : "")} onClick={initJeonseSlider}>
                    <span className={"dp-tag"}>전세</span>
                </button>
                <button className={"dp-pill" + (rentType === "wolseType" ? " dp-pill--active" : "")} onClick={initWolseSlider}>
                    <span className={"dp-tag"}>월세</span>
                </button>
            </div>
            {rentType === "jeonseType" ? (
                <div className="dp-field">
                    <label className="dp-label">전세 범위</label>
                    <RangeSlider min={0} max={100000} step={500} value={jeonse!} onChange={setJeonse} />
                    <div className="dp-hint">0원 ~ 10억까지 선택할 수 있어요.</div>
                </div>
            ) : (
                <div style={{ display: "grid", gap: 22 }}>
                    <div className="dp-field">
                        <label className="dp-label">보증금 범위</label>
                        <RangeSlider min={0} max={20000} step={100} value={wolseDep!} onChange={setWolseDep} />
                        <div className="dp-hint">0원 ~ 2억</div>
                    </div>
                    <div className="dp-field">
                        <label className="dp-label">월세 범위</label>
                        <RangeSlider min={0} max={150} step={1} value={wolseMon!} onChange={setWolseMon} />
                        <div className="dp-hint">0원 ~ 150만원</div>
                    </div>
                </div>
            )}
        </div>
    );
}

interface RangeSliderProps {
    min: number;
    max: number;
    step: number;
    value: number[];
    onChange: Dispatch<SetStateAction<number[] | null>>;
}

function RangeSlider({ min, max, step, value, onChange }: RangeSliderProps) {
    const [a, b] = value;
    const lo = Math.min(a, b), hi = Math.max(a, b);
    //dp-range__fill 을 위한 벨류
    const pctLo = ((lo - min) / (max - min)) * 100;
    const pctHi = ((hi - min) / (max - min)) * 100;

    //슬라이더 바 변화 감지
    const updateMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange([Number(e.target.value), b]);
    };
    //슬라이더 바 변화 감지
    const updateMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange([a, Number(e.target.value)]);
    };

    return (
        <div className="dp-range">
            <div className="dp-range__track">
                <div className="dp-range__fill" style={{ left: `${pctLo}%`, right: `${100 - pctHi}%` }} />
                <input type="range" min={min} max={max} step={step} value={a} onChange={updateMin} />
                <input type="range" min={min} max={max} step={step} value={b} onChange={updateMax} />
            </div>
            <div className="dp-range__values">
                <div className="dp-range__chip">
                    <span>최소</span>
                    <b>{formattingKoreanVal(lo)}</b>
                </div>
                <div className="dp-range__chip">
                    <span>최대</span>
                    <b>{formattingKoreanVal(hi)}</b>
                </div>
            </div>
        </div>
    );
}

export default BudgetStep;