import { useState } from "react";
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

export const ToClockIn = () => {
  const [checkIsOfficeHourFinished, setCheckIsOfficeHourFinished] =
    useState(false);

  function handleSubmit(data: { [key: string]: string }) {
    
  }

  return (
    <Container>
      <Row>
        <Card></Card>

        <Card>
          <Form onSubmit={handleSubmit}>
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
      </Row>
    </Container>
  );
};
