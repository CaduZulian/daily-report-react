import { Button } from "../../../Button";
import Modal from "../../../Modal";
import { Container } from "./styles";

interface ModalDownloadReportProps {
  open: boolean;
  onClose: () => void;
}

export const ModalDownloadReport = ({
  open,
  onClose,
}: ModalDownloadReportProps) => {
  return (
    <Modal open={open} onClose={onClose} title="Baixar relatório">
      <Container>
        <Button>Diário</Button>

        <Button>Semanal</Button>

        <Button>Mensal</Button>
      </Container>
    </Modal>
  );
};
