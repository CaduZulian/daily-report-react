import { ThemeProvider } from "styled-components";
import { Header } from "./components/Header";
import theme from "./styles/theme";

// Global styles
import GlobalStyles from "./styles/global";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
