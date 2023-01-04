import { Navigate, Route, Routes } from "react-router-dom";

import { Main } from "./App.style";

// components
import { Header } from "./components/Header";

// global styles
import GlobalStyles from "./styles/global";

// themes
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

// pages
import { Home } from "./Pages/Home";
import { ToClockIn } from "./Pages/ToClockIn";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />

      <Main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/bater-ponto" element={<ToClockIn />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Main>

      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
