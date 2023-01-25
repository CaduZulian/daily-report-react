import { DailyReport } from "@/context/useForm/models";

export interface IDownloadOfPeriod {
  downloadFunction: (props: DailyReport) => void;
  date?: string;
}

export interface iDownload {
  getDaysOfWeek: () => string[];
  getDaysOfMonth: () => string[];
  downloadOfPeriod: (
    period: "daily" | "weekly" | "monthly",
    { downloadFunction, date }: IDownloadOfPeriod
  ) => void;
}
