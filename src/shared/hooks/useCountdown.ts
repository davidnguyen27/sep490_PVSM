import { useCallback, useEffect, useState } from "react";

export function useCountdown(initialSeconds: number = 180) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isCounting, setIsCounting] = useState(false);

  const start = useCallback(() => {
    setSecondsLeft(initialSeconds);
    setIsCounting(true);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isCounting || secondsLeft <= 0) {
      setIsCounting(false);
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCounting, secondsLeft]);

  const reset = () => {
    setIsCounting(false);
    setSecondsLeft(0);
  };

  const formatted = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  return {
    secondsLeft,
    isCounting,
    formatted,
    start,
    reset,
  };
}
