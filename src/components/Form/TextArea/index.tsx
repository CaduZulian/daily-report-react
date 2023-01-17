import React, { useEffect, useRef } from 'react';

import { useField } from '@unform/core';

import * as S from './styles';

interface ITextArea extends React.HTMLAttributes<HTMLTextAreaElement> {
  name: string;
  className?: string;
  label?: string;
  autoFocus?: boolean;
  value?: string;
  disabled?: boolean;
}

export const TextArea = ({
  name,
  label,
  className,
  autoFocus,
  ...rest
}: ITextArea) => {
  const textareaRef: any = useRef(null);
  const { registerField, fieldName, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });

    if (autoFocus) {
      textareaRef.current.focus();
    }
  }, [fieldName, registerField, autoFocus]);

  return (
    <S.Container className={className}>
      {label && <S.Label htmlFor={name}>{label}</S.Label>}

      <S.TextArea
        id={fieldName}
        ref={textareaRef}
        defaultValue={defaultValue}
        hasError={!!error}
        {...rest}
      />

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Container>
  );
}
