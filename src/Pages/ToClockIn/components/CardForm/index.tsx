import { useRef } from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { format } from "date-fns";

import { ButtonsGroup, Card, CheckBoxContainer, Form } from "../../styles";

// components
import { Button } from "../../../../components/Button";
import TextArea from "../../../../components/Form/TextArea";

// types
import { DailyReport } from "../..";

// validators
import validateForm from "../../validators";

interface ICardForm {
  reportsInDay: DailyReport | null;
  getReportsInDay: (params: Date) => void;
  checkIsOfficeHourFinished: boolean;
  setCheckIsOfficeHourFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardForm = ({
  reportsInDay,
  getReportsInDay,
  checkIsOfficeHourFinished,
  setCheckIsOfficeHourFinished,
}: ICardForm) => {
  let formRef = useRef(null);

  function getHoursInDay(
    entry: DailyReport["entry"],
    leaves: DailyReport["leaves"]
  ) {
    let result;

    if (reportsInDay) {
      for (let i = 0; i < leaves.length; i++) {
        let currentEntry = entry[i].horary
          .split(":")
          .map((item) => Number(item));
        let currentLeave = leaves[i].horary
          .split(":")
          .map((item) => Number(item));

        const currentEntryMilliseconds = new Date().setHours(
          currentEntry[0],
          currentEntry[1],
          0,
          0
        );
        const currentLeavesMilliseconds = new Date().setHours(
          currentLeave[0],
          currentLeave[1],
          0,
          0
        );

        result = result
          ? new Date(currentLeavesMilliseconds).getTime() -
            new Date(currentEntryMilliseconds).getTime() +
            result
          : new Date(currentLeavesMilliseconds).getTime() -
            new Date(currentEntryMilliseconds).getTime();
      }
    }

    return result;
  }

  async function handleSubmit(data: { [key: string]: string }) {
    if (
      !(await validateForm(
        formRef,
        data,
        checkIsOfficeHourFinished ? data : {}
      ))
    )
      return;

    let formattedData: DailyReport;

    const date = format(new Date(), "dd/MM/yyyy");
    let entry: DailyReport["entry"] = [];
    let leaves: DailyReport["leaves"] = [];
    let hoursInDay: DailyReport["hoursInDay"];

    if (reportsInDay) {
      if (reportsInDay.entry.length > reportsInDay.leaves.length) {
        entry = reportsInDay.entry;
        leaves = [
          ...reportsInDay?.leaves,
          { horary: format(new Date(), "HH:mm") },
        ];

        hoursInDay = getHoursInDay(entry, leaves);
      } else {
        entry = [
          ...reportsInDay?.entry,
          { horary: format(new Date(), "HH:mm") },
        ];
        leaves = reportsInDay.leaves;

        hoursInDay = reportsInDay.hoursInDay;
      }

      formattedData = {
        ...data,
        currentDate: reportsInDay.currentDate,
        entry,
        leaves,
        hoursInDay,
      };
    } else {
      entry = [{ horary: format(new Date(), "HH:mm") }];

      formattedData = {
        ...data,
        currentDate: date,
        entry,
        leaves,
      };
    }

    localStorage.setItem(date, JSON.stringify(formattedData));
    toast.success(`Relatório ${!reportsInDay ? "Criado" : "Atualizado"}!`);
    getReportsInDay(new Date());
  }

  return (
    <Card>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <TextArea
          label="Atividades do dia"
          name="reportedActivities"
          defaultValue={reportsInDay?.reportedActivities}
          disabled={!checkIsOfficeHourFinished}
        />

        <TextArea
          label="Observações"
          name="comments"
          defaultValue={reportsInDay?.comments}
          disabled={!checkIsOfficeHourFinished}
        />

        <CheckBoxContainer
          check={checkIsOfficeHourFinished}
          onClick={() => setCheckIsOfficeHourFinished((state) => !state)}
        >
          <div className="checkbox">
            {checkIsOfficeHourFinished && <FaCheck />}
          </div>
          <p className="check-text">Fim de expediente?</p>
        </CheckBoxContainer>

        <ButtonsGroup>
          <Button>Enviar</Button>
        </ButtonsGroup>
      </Form>
    </Card>
  );
};
