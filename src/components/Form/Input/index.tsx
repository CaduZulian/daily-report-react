import React, { useEffect, useRef } from 'react';

import { useField } from '@unform/core';

import * as S from './styles';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  value?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  className,
  required,
  autoFocus,
  ...rest
}) => {
  const inputRef: any = useRef(null);

  const { registerField, fieldName, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });

    if (autoFocus) {
      inputRef.current.focus();
    }
  }, [fieldName, registerField, autoFocus]);

  return (
    <S.Container className={className}>
      <S.LabelContainer>
        {label && <S.Label htmlFor={name}>{label}</S.Label>}
        {required && <S.Required>Obrigatório</S.Required>}
      </S.LabelContainer>

      <S.Input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        hasError={!!error}
        {...rest}
      />

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Container>
  );
};

export default Input;
