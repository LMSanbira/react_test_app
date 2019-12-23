import React, { Component } from "react";

class Nav extends Component {
  state = {};

  render() {
    return (
      <div className="nav-bar">
        <h1>LOGO</h1>
        <nav>
          <div>Home</div>
          <div>About</div>
        </nav>
      </div>
    );
  }
}

export default Nav;
