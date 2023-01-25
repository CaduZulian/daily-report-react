import { createContext, useContext } from "react";
import {
  endOfWeek,
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";

// types
import { iDownload, IDownloadOfPeriod } from "./models";

const DownloadContext = createContext({} as iDownload);

interface DownloadProviderProps {
  children: React.ReactNode;
}

const DownloadProvider = ({ children }: DownloadProviderProps) => {
  function getDaysOfWeek() {
    const currentDate = new Date();

    const startDay = startOfWeek(currentDate, { weekStartsOn: 0 });
    const endDay = endOfWeek(currentDate, { weekStartsOn: 0 });

    let constDaysOfWeek: string[] = [format(startDay, "dd/MM/yyyy")];

    for (let i = startDay.getDate(); i <= endDay.getDate(); i++) {
      if (
        !constDaysOfWeek.includes(format(new Date().setDate(i), "dd/MM/yyyy"))
      ) {
        constDaysOfWeek.push(format(new Date().setDate(i), "dd/MM/yyyy"));
      }
    }

    return constDaysOfWeek;
  }

  function getDaysOfMonth() {
    const currentDate = new Date();

    const startDay = startOfMonth(currentDate);
    const endDay = endOfMonth(currentDate);

    let constDaysOfMonth: any = [format(startDay, "dd/MM/yyyy")];

    for (let i = startDay.getDate(); i <= endDay.getDate(); i++) {
      if (
        !constDaysOfMonth.includes(format(new Date().setDate(i), "dd/MM/yyyy"))
      ) {
        constDaysOfMonth.push(format(new Date().setDate(i), "dd/MM/yyyy"));
      }
    }

    return constDaysOfMonth;
  }

  function downloadOfPeriod(
    period: "daily" | "weekly" | "monthly",
    { downloadFunction, date }: IDownloadOfPeriod
  ) {
    const dates =
      period === "daily"
        ? [date ?? format(new Date(), "dd/MM/yyyy")]
        : period === "weekly"
        ? getDaysOfWeek()
        : period === "monthly"
        ? getDaysOfMonth()
        : "";

    for (let date of dates) {
      if (localStorage.getItem(date)) {
        downloadFunction(JSON.parse(localStorage.getItem(date)!));
      }
    }
  }

  return (
    <DownloadContext.Provider
      value={{
        getDaysOfWeek,
        getDaysOfMonth,
        downloadOfPeriod,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
};

const useDownload = () => {
  return useContext(DownloadContext);
};

export { DownloadProvider, useDownload };
