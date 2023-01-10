import styled from "styled-components";
import { Form as _Form } from "@unform/web";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 1.25rem;
  gap: 1rem;
`;

export const Row = styled.div`
  display: flex;

  gap: 1rem;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;

  background-color: ${({ theme }) => theme.palette.background.white};
  border-radius: 0.25rem;

  padding: 1.25rem;
  gap: 1rem;
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Form = styled(_Form)`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 1rem;
`;

export const CheckBoxContainer = styled.div<{ check: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  cursor: pointer;

  > div.checkbox {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 16px;
    height: 16px;

    border-radius: 50%;
    background: ${({ theme, check }) =>
      check
        ? theme.palette.background.darkGreen
        : theme.palette.text.lightGray};

    > svg {
      width: 50%;
      color: #ffffff;
    }
  }

  > p.check-text {
    width: calc(100% - 21px);
    margin-left: 0.5rem;

    font-family: sans-serif;
    font-size: 1rem;
    line-height: 140%;

    color: ${({ theme }) => theme.palette.text.dark};
  }
`;

export const ButtonsGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  button {
    width: fit-content;
  }
`;

export const Title = styled.span`
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;

  color: ${({ theme }) => theme.palette.text.dark};
`;

export const LineTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;

  color: ${({ theme }) => theme.palette.text.dark};
`;

export const LineValue = styled.span`
  font-size: 1rem;
  font-weight: 400;

  color: ${({ theme }) => theme.palette.text.dark};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ListItem = styled.li`
  font-size: 1rem;
  font-weight: 400;

  color: ${({ theme }) => theme.palette.text.dark};
`;
