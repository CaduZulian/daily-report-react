import { useRef, useState } from "react";

import { ButtonsGroup, Card, Form } from "../../styles";

// contexts
import { useForm } from "@/context/useForm";

// components
import { TextArea } from "@/components/Form";
import { Checkbox, Button } from "@/components";

// validators
import validateForm from "../../validators";

export const CardForm = () => {
  let formRef = useRef(null);
  const { reportsInDay, uploadData, generateTxtFile } = useForm();

  const [checkIsOfficeHourFinished, setCheckIsOfficeHourFinished] =
    useState(false);

  async function handleSubmit(data: { [key: string]: string }) {
    if (
      !(await validateForm(
        formRef,
        data,
        checkIsOfficeHourFinished ? data : {}
      ))
    )
      return;

    const response = uploadData(data);

    if (response?.reportedActivities && checkIsOfficeHourFinished) {
      generateTxtFile(response);
    }
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

        <Checkbox
          label="Fim de expediente?"
          checked={checkIsOfficeHourFinished}
          disabled={reportsInDay?.entry.length === reportsInDay?.leaves.length}
          onClick={(e) => setCheckIsOfficeHourFinished(e)}
        />

        <ButtonsGroup>
          <Button>Enviar</Button>
        </ButtonsGroup>
      </Form>
    </Card>
  );
};
