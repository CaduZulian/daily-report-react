import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.textSecondary};
  margin-bottom: 5px;
`;

export const TextArea = styled.textarea<{ hasError: boolean }>`
  width: 100%;
  min-height: 80px;
  padding: 1rem;
  margin-bottom: 16px;

  font-size: 1rem;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 400;

  color: ${({ theme }) => theme.palette.text};
  border: solid 1px ${({ theme, hasError }) =>
    hasError ? theme.palette.status.red : theme.palette.border.light};
  border-radius: 8px;

  resize: vertical;

  :focus-within {
    border: solid 1px #3FCFA9;
  }

  :disabled {
    background: #F3F5F7;
  }

  ::placeholder {
    color: ${({ theme }) => theme.palette.textLight};
  }
`;

export const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.error.main};
`;
