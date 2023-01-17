import { Container } from "./styles";

// contexts
import { useDownload, useForm } from "@/context";

// components
import { Button } from "@/components";
import Modal from "@/components/Modal";

interface ModalDownloadReportProps {
  open: boolean;
  onClose: () => void;
}

export const ModalDownloadReport = ({
  open,
  onClose,
}: ModalDownloadReportProps) => {
  const { generateTxtFile } = useForm();
  const { downloadOfPeriod } = useDownload();

  return (
    <Modal open={open} onClose={onClose} title="Baixar relatório">
      <Container>
        <Button
          onClick={() => {
            downloadOfPeriod("daily", generateTxtFile);
            onClose();
          }}
        >
          Diário
        </Button>

        <Button
          onClick={() => {
            downloadOfPeriod("weekly", generateTxtFile);
            onClose();
          }}
        >
          Semanal
        </Button>

        <Button
          onClick={() => {
            downloadOfPeriod("monthly", generateTxtFile);
            onClose();
          }}
        >
          Mensal
        </Button>
      </Container>
    </Modal>
  );
};
