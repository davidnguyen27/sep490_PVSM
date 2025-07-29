import { useState } from "react";

export const useDateNavigation = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const getStartOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const addDays = (date: Date, days: number) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  };

  const startOfCurrentWeek = getStartOfWeek(new Date(currentDate));
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfCurrentWeek, i),
  );

  const handlePreviousPeriod = (viewMode: "week" | "month") => {
    if (viewMode === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() - 1);
      setCurrentDate(newDate);
    }
  };

  const handleNextPeriod = (viewMode: "week" | "month") => {
    if (viewMode === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + 1);
      setCurrentDate(newDate);
    }
  };

  return {
    currentDate,
    weekDays,
    handlePreviousPeriod,
    handleNextPeriod,
  };
};
