import { addHours, format } from "date-fns";

import {
  Card,
  CardItem,
  LineTitle,
  LineValue,
  List,
  ListItem,
  Title,
} from "../../styles";

// contexts
import { useForm } from "@/context/useForm";

export const CardDetails = () => {
  const { reportsInDay } = useForm();

  return (
    <Card>
      <Title>
        {reportsInDay?.currentDate ?? format(new Date(), "dd/MM/yyyy")}
      </Title>

      {reportsInDay ? (
        <>
          <CardItem>
            <LineTitle>Entradas:</LineTitle>
            <List>
              {reportsInDay?.entry.map(({ horary }, index) => {
                return (
                  <ListItem key={horary + "entry" + index}>
                    {index + 1}º entrada: {horary}
                  </ListItem>
                );
              })}
            </List>
          </CardItem>

          <CardItem>
            <LineTitle>Saídas:</LineTitle>
            <List>
              {reportsInDay?.leaves.map(({ horary }, index) => {
                return (
                  <ListItem key={horary + "leaves" + index}>
                    {index + 1}º saída: {horary}
                  </ListItem>
                );
              })}
            </List>
          </CardItem>

          {reportsInDay.hoursInDay && (
            <CardItem>
              <LineTitle>Horas do dia:</LineTitle>
              <LineValue>
                {format(
                  addHours(
                    new Date(reportsInDay?.hoursInDay),
                    new Date().getTimezoneOffset() / 60
                  ),
                  "HH:mm"
                )}
              </LineValue>
            </CardItem>
          )}

          {reportsInDay?.reportedActivities && (
            <CardItem>
              <LineTitle>Atividades do dia:</LineTitle>
              <List>
                {reportsInDay?.reportedActivities?.split("\n").map((item) => {
                  return <ListItem key={item}>{item}</ListItem>;
                })}
              </List>
            </CardItem>
          )}

          {reportsInDay?.comments && (
            <CardItem>
              <LineTitle>Observações:</LineTitle>
              <LineValue>{reportsInDay?.comments}</LineValue>
            </CardItem>
          )}
        </>
      ) : (
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <LineValue>Nenhuma atividade foi registrada nesse dia</LineValue>
        </div>
      )}
    </Card>
  );
};
