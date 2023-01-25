import { Card, Column, Container, Row } from "./styles";

// components
import { HoursBalanceChart } from "./components/charts/HoursBalance";
import { OvertimeCard } from "./components/OvertimeCard";


export const Home = () => {
  return (
    <Container>
      <Row>
        <Card></Card>

        <Column>
          <OvertimeCard />

          <Card>
            <HoursBalanceChart />
          </Card>
        </Column>
      </Row>
    </Container>
  );
};
