import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

type TimerProps = {
  time: number;
  onTimeUp: () => void;
  onChange?: (time: number) => void;
};

const Timer = ({ time, onTimeUp, onChange }: TimerProps) => {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: new Date(Date.now() + time),
    onExpire: () => onTimeUp(),
  });

  const convertToSeconds = (
    days: number,
    hours: number,
    minutes: number,
    seconds: number
  ) => {
    return days * 86400 + hours * 3600 + minutes * 60 + seconds;
  };
  useEffect(() => {
    if (onChange) {
      onChange(convertToSeconds(days, hours, minutes, seconds) * 1000);
    }
  }, [seconds, minutes, hours]);

  return (
    <h1 className="text-center font-bold text-4xl">
      {convertToSeconds(days, hours, minutes, seconds)}
    </h1>
  );
};

export default Timer;
