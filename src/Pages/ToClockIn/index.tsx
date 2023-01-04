import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import {
  ButtonsGroup,
  Card,
  CheckBoxContainer,
  Container,
  Form,
  Row,
} from "./styles";
import { FaCheck } from "react-icons/fa";
import TextArea from "../../components/Form/TextArea";
import { format } from "date-fns";
import { toast } from "react-toastify";
import validateForm from "./validators";

interface DailyReport {
  currentDate: string;
  entry: Array<{ horary: string }>;
  leaves: Array<{ horary: string }>;
  reportedActivities?: string;
  comments?: string;
}

export const ToClockIn = () => {
  let formRef = useRef(null);

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

  async function handleSubmit(data: { [key: string]: string }) {
    if (!(await validateForm(formRef, data, data))) return;

    let formattedData: DailyReport;

    const date = format(new Date(), "dd/MM/yyyy");
    let entry: DailyReport["entry"] = [];
    let leaves: DailyReport["leaves"] = [];

    if (reportsInDay) {
      if (reportsInDay.entry.length > reportsInDay.leaves.length) {
        entry = reportsInDay.entry
        leaves = [
          ...reportsInDay?.leaves,
          { horary: format(new Date(), "HH:mm") },
        ];
      } else {
        entry = [
          ...reportsInDay?.entry,
          { horary: format(new Date(), "HH:mm") },
        ];
        leaves = reportsInDay.leaves
      }

      formattedData = {
        ...data,
        currentDate: reportsInDay.currentDate,
        entry,
        leaves,
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
    <Container>
      <Row>
        <Card>
          <span>{reportsInDay?.currentDate}</span>

          <span>Entradas:</span>
          {reportsInDay?.entry.map(({ horary }, index) => {
            return <span>{index + 1}º entrada: {horary}</span>;
          })}

<span>Saídas:</span>
          {reportsInDay?.leaves.map(({ horary }, index) => {
            return <span>{index + 1}º saída: {horary}</span>;
          })}

          <span>Atividades do dia:</span>
          <span>{reportsInDay?.reportedActivities}</span>

          <span>Observações:</span>
          <span>{reportsInDay?.comments}</span>
        </Card>

        <Card>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <CheckBoxContainer
              check={checkIsOfficeHourFinished}
              onClick={() => setCheckIsOfficeHourFinished((state) => !state)}
            >
              <div className="checkbox">
                {checkIsOfficeHourFinished && <FaCheck />}
              </div>
              <p className="check-text">Fim de expediente?</p>
            </CheckBoxContainer>

            {checkIsOfficeHourFinished && (
              <>
                <TextArea
                  label="Atividades do dia"
                  name="reportedActivities"
                  defaultValue={reportsInDay?.reportedActivities}
                />

                <TextArea
                  label="Observações"
                  name="comments"
                  defaultValue={reportsInDay?.comments}
                />
              </>
            )}

            <ButtonsGroup>
              <Button>Enviar</Button>
            </ButtonsGroup>
          </Form>
        </Card>
      </Row>
    </Container>
  );
};
