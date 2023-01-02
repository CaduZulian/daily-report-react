import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: fit-content;
  background-color: ${({ theme }) => theme.palette.main.blue};

  padding: 1rem;
`;

export const Title = styled.h2`
  display: flex;

  font-weight: 500;
  font-family: sans-serif;

  color: ${({ theme }) => theme.palette.text.light};
`;

export const ButtonsGroup = styled.div`
  display: flex;

  gap: 1rem;
`;
