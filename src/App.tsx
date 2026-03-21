import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import { Router } from "./application";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={Router} />
    </ThemeProvider>
  );
}

export default App;
