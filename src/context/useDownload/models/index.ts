import { DailyReport } from "@/context/useForm/models";

export interface iDownload {
  getDaysOfWeek: () => string[];
  getDaysOfMonth: () => string[];
  downloadOfPeriod: (
    period: "daily" | "weekly" | "monthly",
    downloadFunction: (props: DailyReport) => void
  ) => void;
}
