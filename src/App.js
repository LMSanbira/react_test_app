import React from "react";
import "./App.scss";
import Nav from "./components/nav";
import GemsDisplay from "./components/gemsDisplay";

function App() {
  return (
    <React.Fragment>
      <Nav />
      <div className="container">
        <GemsDisplay />
      </div>
    </React.Fragment>
  );
}

export default App;
