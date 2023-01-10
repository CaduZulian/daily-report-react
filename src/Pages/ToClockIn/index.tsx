import { useEffect, useState } from "react";
import { format } from "date-fns";

import { Container, Row } from "./styles";

// components
import { CardForm } from "./components/CardForm";
import { CardDetails } from "./components/CardDetails";

export interface DailyReport {
  currentDate: string;
  entry: Array<{ horary: string }>;
  leaves: Array<{ horary: string }>;
  hoursInDay?: number;
  reportedActivities?: string;
  comments?: string;
}

export const ToClockIn = () => {
  const [reportsInDay, setReportsInDay] = useState<DailyReport | null>(null);
  const [checkIsOfficeHourFinished, setCheckIsOfficeHourFinished] =
    useState(false);

  function getReportsInDay(day: Date) {
    const date = format(day, "dd/MM/yyyy");

    setReportsInDay(
      localStorage.getItem(date)
        ? JSON.parse(localStorage.getItem(date)!)
        : null
    );
  }

  useEffect(() => {
    getReportsInDay(new Date());
  }, []);

  return (
    <Container>
      <Row>
        <CardDetails reportsInDay={reportsInDay} />

        <CardForm
          reportsInDay={reportsInDay}
          getReportsInDay={getReportsInDay}
          checkIsOfficeHourFinished={checkIsOfficeHourFinished}
          setCheckIsOfficeHourFinished={setCheckIsOfficeHourFinished}
        />
      </Row>
    </Container>
  );
};
