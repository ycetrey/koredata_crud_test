import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default.ts";
import { GlobalStyle } from "./styles/global.ts";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/Router.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <AuthContextProvider>
          <Router />
          <GlobalStyle />
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
