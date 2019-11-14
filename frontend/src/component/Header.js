import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header>
        <Navbar bg="dark" expand="sm" variant="dark">
          <Link to="/" className="navbar-brand">
            BugTracker
          </Link>
        </Navbar>
      </header>
    );
  }
}

export default Header;
