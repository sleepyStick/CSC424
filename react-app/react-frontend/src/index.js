import * as React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import "./index.css";
import App from "./App";
import theme from './theme';
import mountain from './img/mountains.jpeg'

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <GlobalStyles
        styles={{
          body: {
            backgroundImage: `url(${mountain})`
          },
        }}
      />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
);
