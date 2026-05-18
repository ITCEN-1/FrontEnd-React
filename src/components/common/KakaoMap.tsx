import {useEffect, useRef} from "react";

const KakaoMap = () => {
    const kakaoMapRef = useRef(null);

    useEffect(() => {
        const {kakao} = window;
        const container = kakaoMapRef.current;

        if (!kakao) {
            console.log("kakao map load 실패");
            return;
        }

        kakao.maps.load(() => {
            if (!container) return;

            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };

            new kakao.maps.Map(container, options);
        });
    }, [])

    return <>
        <div ref={kakaoMapRef} className={"w-96 h-56"}></div>
    </>;
}

export default KakaoMap;