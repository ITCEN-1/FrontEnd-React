import { useEffect, useRef } from "react";
import type { Dispatch, SetStateAction } from 'react';
import * as d3 from "d3";
import styles from "./SeoulMap.module.css";
import seoulDistrictsRaw from "../../../seoulDistricts.json";
import type {
  SeoulDistrictsGeoJSON,
  SeoulDistrictProperties,
} from "../../../types/district.types";

export interface DistrictStepProps { // SeoulMap 컴포넌트의 prop 타입 정의
  districts: string[];
  setDistricts: Dispatch<SetStateAction<string[]>>
}

export default function DistrictStep({ districts, setDistricts }:DistrictStepProps) {
  const max = 5;
  const toggle = (selectedName:string) => {
    if (districts.some((d) => (d === selectedName))) {//districts배열에 d 중 하나라도 selectedName가 같은게 있으면
      setDistricts(districts.filter((d) => (d !== selectedName)));//filter 조건에 맞는 새 배열
    }
    else if (districts.length < max){
      setDistricts([...districts, selectedName]);//새로운 selectedName 추가
    } 
  };
  return (
    <div className={"dp-card"}>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--dp-navy-900)" }}>관심 있는 구를 골라주세요</h2>
        <p style={{ marginTop: 6, fontSize: 13, color: "var(--fg-2)" }}>
          서울시 25개 자치구 중 <b style={{ color: "var(--primary)" }}>5개</b>를 선택하면 그 안에서 동을 추려드려요.
        </p>
      </div>
      <SeoulMap padding={15} />
      <div style={{ marginTop: 14, padding: "10px 14px", background: "var(--bg-tint-info)", borderRadius: 8, fontSize: 12, color: "var(--dp-navy-700)" }}>
        ⓘ 서울 열린데이터광장의 자치구 경계 GeoJSON을 기반으로 한 실제 행정구역 지도예요.
      </div>
    </div>
  );
}

// JSON 임포트를 명시적으로 타입 단언
const geoData = seoulDistrictsRaw as unknown as SeoulDistrictsGeoJSON;

//DistrictFeature에서 
type DistrictFeature = SeoulDistrictsGeoJSON["features"][number];

export interface SeoulMapProps { // SeoulMap 컴포넌트의 prop 타입 정의
  padding?: number;
  onDistrictHover?: (props: SeoulDistrictProperties | null) => void;
}

function SeoulMap({padding = 15, onDistrictHover}:SeoulMapProps){
  //DOM 객체에 직접 접근해야 하므로 useRef 사용
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  //지도 객체는 컴포넌트 로드 시 딱 한번만 만든다 : useEffect 사용
  useEffect(()=>{
    const containerDom = containerRef.current;//컨테이너 돔 객체
    const svgDom = svgRef.current; //맵을 넣을 돔 객체

    if (!containerDom || !svgDom) return; //로드 안된거 있으면 밑 코드 실행안함

    // 세 단계로 나뉩니다
    // 1. 자치구 조각 정의
    // 2. 자치구 조각 이름표 정의
    // 3. 현재 컴포넌트 크기 확인 후 지도 그리기, 라벨 그리기

    const svg = d3.select(svgDom); //맵을 넣을 태그 선택
    const path = d3.geoPath(); //좌표 to SVG 메서드 정의
    const projectionOption = d3.geoMercator();
    path.projection(projectionOption);

    //자치구 조각 정의
    const paths = svg
      .selectAll<SVGPathElement, DistrictFeature>("path.district-path")
      .data(geoData.features)//각 자치구 정보를 데이터로 가져온다
      .join("path")//데이터 개수만큼 추가될 새로운 <path> 태그의 이름을 path 로 지정한다
      .attr("class", "district-path")//각 <path> class 정의
      .attr("id", (district) => "path-" + district.properties.SIG_CD)//각 <path> id를 데이터의 properties.SIG_CD 로 정의
      //각 자치구 위에 호버 이벤트 정의
      .on("mouseenter",function(_event,district){ // d: 선택된 자치구의 geojson 객체
        //1. 전체 하이라이트 초기화
        svg.selectAll(".district-path").classed("highlighted", false);
        svg.selectAll(".district-label").classed("highlighted", false);
        //2. 현재 자치구 조각 하이라이트
        d3.select(this)
          .classed("highlighted", true)
          .raise();
        //3. 현재 자치구 이름표 하이라이트
        svg
          .select("#label-" + district.properties.SIG_CD)// 마우스가 올라간 자치구 geojson 과 동일한 id의 라벨찾기
          .classed("highlighted", true)
          .raise();
      })
      .on("mouseleave", function () { // 마우스가 떠나면 전체 초기화
        svg.selectAll(".district-path").classed("highlighted", false);
        svg.selectAll(".district-label").classed("highlighted", false);
      });
    
    //자치구 조각 위 이름표 정의
    const labels = svg
      .selectAll<SVGTextElement, DistrictFeature>("text.district-label")
      .data(geoData.features)
      .join("text")
      .attr("class", "district-label")
      .attr("id", (district) => "label-" + district.properties.SIG_CD)
      .text((district) => district.properties.SIG_KOR_NM);

    const drawPathAndLabel = (width: number,height: number)=>{
      svg.attr("viewBox", `0 0 ${width} ${height}`);//각각 path의 크기를 크기에 맞춰 재설정
      projectionOption.fitExtent([[padding,padding],[width-padding,height-padding]],geoData);
      //자치구 조각 정의해둔거 실제로 그린다
      paths.attr("d", (d) => path(d)); //각 <path> 태그의 d 속성에 path 함수 사용해서 그리기
      labels.attr("transform", (d) => {
        const [x, y] = path.centroid(d); //가운데에 배치
        return `translate(${x},${y})`;
      });
    }

    drawPathAndLabel(containerDom.clientWidth, containerDom.clientHeight);
    
    // ResizeObserver 로 컨테이너 크기 변화에 반응
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      drawPathAndLabel(width, height);
    });
    observer.observe(containerDom);

    return () => {
      observer.disconnect();
      // 언마운트 시 D3가 붙인 요소 전부 삭제
      svg.selectAll("*").remove();
    };
  },[padding]);
  return (
    <div className={styles.root}>
      <div ref={containerRef} className={styles.mapContainer}>
        <svg ref={svgRef} className={styles.map} />
      </div>
    </div>
  );
}