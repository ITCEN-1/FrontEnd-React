import { NavLink, useParams } from "react-router-dom";

function Header() {
  const baseStyle = `text-[14px] px-2 py-3.5 rounded-xl font-semibold cursor-pointer`;
  const selectedStyle = `text-(--primary) bg-(--dp-coral-50)  hover:bg-(--dp-coral-100)`;
  const defaultStyle = `text-(--fg-2) hover:bg-(--dp-coral-50)`;

  return (
    <header
      className={
        "flex px-8 h-16 w-full justify-between align-middle gap-8 z-[300] shadow-(--shadow-xs) border-b border-solid border-(--border-1)"
      }
    >
      <a className={"flex items-center"}>
        <img src={"/images/header-logo.png"} className={"h-9"} />
      </a>
      <div className={"flex gap-1 items-center flex-1"}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${baseStyle} ${isActive ? selectedStyle : defaultStyle}`}
        >
          <button>대시보드</button>
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `${baseStyle} ${isActive ? selectedStyle : defaultStyle}`}>
          <button>히스토리</button>
        </NavLink>
        <button className={`${baseStyle} ${defaultStyle}`}>게시판</button>
      </div>
      <div className={"flex gap-3 items-center"}>
        <a
          className={
            "px-2 py-3.5 rounded-xl text-[12px] text-gray-400 font-semibold cursor-pointer hover:bg-(--dp-coral-50)"
          }
        >
          관리자
        </a>
        <span className={"rounded-xl text-[12px] text-gray-400 font-semibold"}>김영관님</span>
        <div
          className={
            "flex w-8 h-8 rounded-[50%] bg-(--dp-coral-100) text-(--dp-coral-700) items-center justify-center text-[13px] font-[700]"
          }
        >
          김
        </div>
      </div>
    </header>
  );
}

export default Header;
