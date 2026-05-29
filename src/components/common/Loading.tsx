function Loading() {
  return (
    <div className={"flex flex-col w-full h-full items-center justify-center gap-[100px]"}>
      <img src={"duck.gif"} className={"w-[300px] h-[400px]"}></img>
      <h3 className={"text-[30px] font-display text-(--primary)"}>로딩중...</h3>
    </div>
  );
}

export default Loading;
