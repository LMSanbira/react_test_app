import React from "react";
import "./App.scss";
import Nav from "./components/nav";
import GemsDisplay from "./components/gemsDisplay";
import { ThemeProvider } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: purple,
      secondary: green
    },
    status: {
      danger: "orange"
    }
  });
  theme.spacing(2);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Nav />
        <Container maxWidth="xl">
          <GemsDisplay />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
