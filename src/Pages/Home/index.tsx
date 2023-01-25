import { Column, Container, Row } from "./styles";

// components
import { HoursBalanceCard } from "./components/HoursBalanceCard";
import { OvertimeCard } from "./components/OvertimeCard";
import { TableCard } from "./components/TableCard";

export const Home = () => {
  return (
    <Container>
      <Row style={{ paddingBottom: "1.25rem" }}>
        <TableCard />

        <Column>
          <OvertimeCard />

          <HoursBalanceCard />
        </Column>
      </Row>
    </Container>
  );
};
