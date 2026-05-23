const ONE_HOUR_MINUTE = 60;

export function parseMinuteToHourTime(minute: number): string {
  const hour = Math.floor(minute / ONE_HOUR_MINUTE);
  const leftMinute = Number(minute % ONE_HOUR_MINUTE);

  return hour == 0 ? `${leftMinute}분` : `${hour}시간 ${leftMinute}분`;
}
