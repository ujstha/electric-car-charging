import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";
import routes from "./routes";
import axios from "axios";

axios.defaults.baseURL = "https://electric-car-charging.herokuapp.com";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
  },
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Raleway", "sans-serif"].join(","),
  },
});
class App extends Component {
  componentDidMount() {
    localStorage.removeItem("totalCostOfCharging");
    localStorage.removeItem("stopTime");
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Header />
            <div
              style={{ paddingTop: "80px", paddingBottom: "60px" }}
              className="container-fluid"
            >
              {routes}
            </div>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
