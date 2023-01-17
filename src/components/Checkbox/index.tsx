import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { CheckBoxContainer } from "./styles";

interface ICheckbox {
  checked: boolean;
  disabled: boolean;
  onClick: (event: boolean) => void;
}

export const Checkbox = ({ checked, disabled, onClick }: ICheckbox) => {
  useEffect(() => {
    if (disabled && checked) {
      onClick(false)
    }
  }, [disabled])

  return (
    <CheckBoxContainer check={checked} disabled={disabled} onClick={() => !disabled && onClick(!checked)}>
      <div className="checkbox">{checked && <FaCheck />}</div>
      <p className="check-text">Fim de expediente?</p>
    </CheckBoxContainer>
  );
};
