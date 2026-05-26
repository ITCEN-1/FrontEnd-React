function Header() {
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
        {/*아래 button들은 나중에 Link로 Routing수행해야 함*/}
        <button
          className={
            "text-[14px] text-(--primary) bg-(--dp-coral-50) px-2 py-3.5 rounded-xl font-semibold cursor-pointer hover:bg-(--dp-coral-100)"
          }
        >
          대시보드
        </button>
        <button
          className={
            "text-[14px] text-(--fg-2) px-2 py-3.5 rounded-xl font-semibold cursor-pointer hover:bg-(--dp-coral-50)"
          }
        >
          히스토리
        </button>
        <button
          className={
            "text-[14px] text-(--fg-2) px-2 py-3.5 rounded-xl font-semibold cursor-pointer hover:bg-(--dp-coral-50)"
          }
        >
          게시판
        </button>
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
