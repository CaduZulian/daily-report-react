import { Button } from "../Button"
import { ButtonsGroup, HeaderContainer, Title } from "./styles"

export const Header = () => {
  return (
    <HeaderContainer>
      <Title>
        Relatório diário
      </Title>

      <ButtonsGroup>
        <Button>
          Baixar relatório diário
        </Button>

        <Button>
          Baixar relatório semanal
        </Button>

        <Button>
          Baixar relatório mensal
        </Button>
      </ButtonsGroup>
    </HeaderContainer>
  )
}