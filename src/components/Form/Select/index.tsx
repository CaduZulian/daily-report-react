import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import * as S from './styles';

interface SelectProps {
  name: string;
  options: Array<{ label: string; value: string }>;
  onChange?: (option: any) => void;
  value?: { label: string; value: string };
  isLoading?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  isMulti?: boolean;
  searchable?: boolean;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  name,
  className,
  label,
  required,
  placeholder,
  isMulti,
  searchable,
  ...rest
}) => {
  const selectRef: any = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField<any>({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (isMulti) {
          if (!ref.state.selectValue) {
            return [];
          }
          return ref.state.selectValue.map((option: any) => option.value);
        }

        if (!ref.state.selectValue[0]) {
          return undefined;
        }

        return ref.state.selectValue[0].value;
      },
    });
  }, [fieldName, registerField, isMulti]);

  return (
    <S.Container className={className}>
      <S.LabelContainer>
        {label && <S.Label htmlFor={name}>{label}</S.Label>}
        {required && <S.Required>Obrigatório</S.Required>}
      </S.LabelContainer>

      <S.SelectInput
        defaultValue={
          defaultValue ? defaultValue.value ?? defaultValue : defaultValue
        }
        ref={selectRef}
        classNamePrefix="react-select"
        placeholder={placeholder}
        isMulti={isMulti}
        isSearchable={searchable}
        noOptionsMessage={() => 'Nenhuma opção disponível'}
        {...rest}
        hasError={!!error}
      />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Container>
  );
};

export default Select;
