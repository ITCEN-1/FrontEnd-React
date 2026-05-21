import { Map } from "react-kakao-maps-sdk";
import Header from "../../components/layout/Header";
import DashBoardSideBar from "../../components/layout/DashBoardSideBar.tsx";

const DashBoardPage = () => {
  return (
    <div>
      <Header />
      <section className={"grid grid-cols-[1fr_var(--dp-sidebar-w,400px)] h-[calc(100vh-64px)]"}>
        <Map center={{ lat: 33.5563, lng: 126.79581 }} className={"w-full h-full"}></Map>
        <DashBoardSideBar />
      </section>
    </div>
  );
};

export default DashBoardPage;
