import { Map } from "react-kakao-maps-sdk";
import Header from "../../components/layout/Header";
import DashBoardSideBar from "../../components/layout/DashBoardSideBar.tsx";
import {useEffect} from "react";
import {getSurveyAndRecommendedDong} from "../../services/dashboard.api.ts";

const DashBoardPage = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSurveyAndRecommendedDong(1);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [])

    return (
    <div>
      <Header />
      <section className={"grid grid-cols-[1fr_var(--dp-sidebar-w,400px)] h-[calc(100vh-64px)]"}>
        <Map center={{ lat: 37.4173097, lng: 126.9911816 }} className={"w-full h-full"}></Map>
        <DashBoardSideBar />
      </section>
    </div>
  );
};

export default DashBoardPage;
