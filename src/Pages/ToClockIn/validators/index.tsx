import { FormHandles } from "@unform/core";
import * as Yup from "yup";

export default async function validateForm<T>(
  formRef: React.RefObject<FormHandles>,
  data: T,
  fields: { [key: string]: string }
) {
  try {
    formRef.current?.setErrors({});
    const schema = Yup.object().shape({
      reportedActivities: Yup.string()
        .required("O campo Atividades do dia é obrigatório")
        .min(10, "As atividades declaradas são muito curtas"),
      comments: Yup.string(),
    });

    const newSchema = schema.pick(Object.keys(fields));

    await newSchema.validate(data, {
      abortEarly: false,
    });

    return true;
  } catch (err) {
    const validationErrors: any = {};
    if (err instanceof Yup.ValidationError) {
      err.inner.forEach((error) => {
        validationErrors[error.path || ""] = error.message;
      });
      formRef.current?.setErrors(validationErrors);
    }
    return false;
  }
}
