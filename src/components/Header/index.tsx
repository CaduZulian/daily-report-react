import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ButtonsGroup, HeaderContainer, Logo } from "./styles";

// components
import { Button } from "../Button";
import { ModalDownloadReport } from "./components/ModalDownloadReport";

// icons
import LogoIcon from "../../assets/icons/logo.png";

export const Header = () => {
  const [modalDownloadReportIsOpen, setModalDownloadReportIsOpen] =
    useState(false);

  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <Logo onClick={() => navigate("/home")}>
          <img src={LogoIcon} alt="logo" />
          <span>Relatório diário</span>
        </Logo>

        <ButtonsGroup>
          <Button onClick={() => setModalDownloadReportIsOpen(true)}>
            Baixar relatório
          </Button>

          <Button onClick={() => navigate("/bater-ponto")}>Bater ponto</Button>
        </ButtonsGroup>
      </HeaderContainer>

      <ModalDownloadReport
        open={modalDownloadReportIsOpen}
        onClose={() => setModalDownloadReportIsOpen(false)}
      />
    </>
  );
};
