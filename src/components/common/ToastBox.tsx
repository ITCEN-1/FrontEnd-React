import { useEffect } from "react";

function ToastBox({
  message,
  time,
  setVisible,
}: {
  message: string;
  time: number;
  setVisible: (flag: boolean) => void;
}) {
  useEffect(() => {
    const timerId = setTimeout(() => {
      setVisible(false);
    }, time);

    return () => clearTimeout(timerId);
  }, [setVisible, time]);

  return (
    <div className="dp-toast-region">
      <div className="dp-toast dp-toast--error" role="alert">
        {/* <Icon size={20} className="dp-toast__icon" />/ */}
        <div className="dp-toast__body">
          <div className="dp-toast__title">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default ToastBox;
